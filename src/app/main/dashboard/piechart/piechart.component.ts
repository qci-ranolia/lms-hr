import { Component, Input, OnInit } from '@angular/core'
import { LmsService } from '../../../services/lms.service'
import { Chart } from 'chart.js'
import * as _ from "lodash"
@Component({
  selector: 'pie-chart',
  templateUrl: './piechart.component.html'
})
export class PiechartComponent implements OnInit {
    bar : any
    polarArea : any
    boards : any = []
    boardEmp : any = []
    gender : any = []
    genderCount : any = []
    constructor( private lms:LmsService ) {
        this.lms.emitgetEmployees.subscribe( el => {
            // console.log(el)
            // create two tmp for two types of charts
            let tmpBoard : any = [], tmpMF : any = []
            // filter from the response with simple array.find
            el.find(it => {
                tmpBoard.push(it.board)
                tmpMF.push(it.gender)
            })
            // Sort tmp array to calculate respective count
            tmpBoard.sort(), tmpMF.sort()
            // create variables
            var bcurrent = null, gcurrent = null, bcnt = 0, gcnt = 0
            // make a for loop to count employee on the basis of boards
            for ( var i = 0; i < tmpBoard.length; i++ ){
                if ( tmpBoard[i] != bcurrent ){
                    if ( bcnt > 0 ) this.boards.push( bcurrent ) && this.boardEmp.push( bcnt )
                    bcurrent = tmpBoard[i], bcnt = 1
                } else bcnt++
            }
            if ( bcnt > 0 ) this.boards.push( bcurrent ) && this.boardEmp.push( bcnt )
            // make a for loop to count employee on the basis of gender
            for ( var i = 0; i < tmpMF.length; i++ ){
                if ( tmpMF[i] != gcurrent ){
                    if ( gcnt > 0 ) this.gender.push( gcurrent ) && this.genderCount.push( gcnt )
                    gcurrent = tmpMF[i] ,gcnt = 1
                } else gcnt++
            }
            if ( gcnt > 0 ) this.gender.push( gcurrent ) && this.genderCount.push( gcnt )
        })
    }
    ngOnInit() : void {
        setTimeout(() => {
            this.bar = new Chart('bar',{
                type: 'bar',
                data: {
                    labels: this.boards,// Number of boards
                    datasets: [{
                        data: this.boardEmp,// Number of respective employee's on the basis of boards
                        backgroundColor: [
                            'rgba(155, 199, 172, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)',
                            'rgba(205, 106, 186, 0.5)'
                        ],
                        borderColor: [
                            'rgba(155,199,172,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                            'rgba(205, 106, 186, 0.5)'
                        ], borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            })
            this.polarArea = new Chart('polarArea',{
                type: 'polarArea',
                data: {
                    labels: this.gender,// gender array
                    datasets: [{
                        data: this.genderCount,// Number of respective MALE, FEMALE and OTHERS(if any) on the basis of total employee.gender count
                        backgroundColor: [
                            'rgba(255, 59, 72, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255,59,72,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'
                        ], borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            })
        }, 450 )// Delay due to subscribe method
    }
}