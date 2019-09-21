import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import {Strings} from '../constants';

@Component({
  selector: 'app-score-chart',
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.css']
})
export class ScoreChartComponent implements OnInit {

  dataList = [];
  names = [];

  constructor() { }

  ngOnInit() {
    this.getAll();
  }

  renderList() {
    const data = [];
    this.dataList.forEach(obj => {
      data.push({ ...obj,
        type: 'line',
        axisYtype: 'secondary',
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: '#,###',
        xValueFormatString: 'MMM DD hh:mm tt'
      });
    });
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'All Scores'
      },
      toolTip: {
        shared: true
      },
      axisX: {
        valueFormatString: 'MMM DD YYYY'
      },
      axisY: {
        includeZero: false
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'top',
        horizontalAlign: 'center',
        dockInsidePlotArea: true,
      },
      data,
    });
    chart.render();
  }

  focus($event) {
    const obj = {
      type: 'line',
      axisYtype: 'secondary',
      markerSize: 0,
      yValueFormatString: '#,###',
      xValueFormatString: 'MMM DD hh:mm tt',
      name: '',
      dataPoints: []
    };
    this.dataList.forEach(data => {
      if (data.name === $event.target.value) {
        obj.name = data.name;
        obj.dataPoints = data.dataPoints;
      }
    });
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: $event.target.value + `'s Scores`,
      },
      axisX: {
        valueFormatString: 'MMM DD YYYY'
      },
      axisY: {
        includeZero: false
      },
      toolTip: {
        content: '{x}<br/>score: {y}'
      },
      data: [ obj ],
    });
    chart.render();
  }

  getAll() {
    fetch(Strings.URL + 'charts/all', {mode: 'cors'}).then(res => res.json())
      .then(result => {
        console.log(result);
        result.forEach(set => {
          this.names.push(set.name);
          set.dataPoints.forEach(point => point.x = new Date(point.x));
        });
        this.dataList = result;
        this.renderList();
      });
  }
}
