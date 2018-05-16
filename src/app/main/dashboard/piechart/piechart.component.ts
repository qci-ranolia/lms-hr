import { Component, Input, OnInit } from '@angular/core';
import { LmsService } from '../../../services/lms.service';
// import { GooglePieChartService } from '../../../services/google-pie-chart.service';
// import { PieChartConfig } from '../../../Models/PieChartConfig';

declare var google: any;


@Component({
  selector: 'pie-chart',
  templateUrl: './piechart.component.html'
})
export class PiechartComponent implements OnInit {
    //pageLoaded : boolean = false
    
    // @Input() data: any[];
    // @Input() config: PieChartConfig;
    // @Input() elementId: String;

    constructor( private lms : LmsService ) {
        this.lms.emitgetEmployees.subscribe(
            el => console.log(el)
        )
    }

    ngOnInit() : void {
      // Load Charts and the corechart package.
      google.charts.load( 'current', { 'packages' : ['corechart']} )
      // Load Charts and the corechart and barchart packages.
      google.charts.load( 'current', { 'packages' : ['corechart']} )

      // Draw the pie chart and bar chart when Charts is loaded.
      google.charts.setOnLoadCallback(drawChart)

      function drawChart() {
        var data = new google.visualization.DataTable()
        data.addColumn( 'string', 'Topping' )
        data.addColumn( 'number', 'Number of employee' )
        data.addRows([
          [ 'QCI' , 10 ],
          [ 'NABET' , 20 ],
          [ 'NABH' , 40 ],
          [ 'NBQP' , 100 ],
          [ 'NABCB' , 60 ]
        ])

        var piechart_options = {
            is3D : true,
            width : '100%',
            height : '100%'
        }
        var piechart = new google.visualization.PieChart( document.getElementById('pie') )
        piechart.draw( data, piechart_options )

        /* var pieO = {
            is3D : true,
            width : '100%',
            height : '100%'
        }
        var pie = new google.visualization.PieChart( document.getElementById('pies') )
        pie.draw( data, pieO ) */

        var barchart_options = {
            width : '100%',
            height : '100%'
        }
        var barchart = new google.visualization.BarChart( document.getElementById('bar') )
        barchart.draw( data, barchart_options )
      
        }
    }
}