import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-chart-generator',
  templateUrl: './chart-generator.component.html',
  styleUrls: ['./chart-generator.component.css']
})
export class ChartGeneratorComponent {
  revenueJanuary: number=3000;
  revenueFebruary: number=500;
  revenueMarch: number=200;
  selectedChartType!: string;
  selectedColors: { [key: string]: string } = {
    'January': 'green',
    'February': 'blue',
    'March': 'yellow'
  };
  generateChart() {
    const categories = ['January', 'February', 'March'];
    const dataForBarChart = categories.map((month, index) => ({
      name: `${month}`,
      y: this.getMonthlyRevenue(month),
      color: this.selectedColors[month]
    }));
    const options: Highcharts.Options = {
      chart: {
        type: this.selectedChartType,
        plotShadow: false
      },
      title: {
        text: 'Market Qtr Report',
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: 'Select monthly revenue'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      colors: categories.map(month => this.selectedColors[month]),
      series: [{
        name: 'Colors',
        data: dataForBarChart
      } as any]
    };
    const chartContainer = document.getElementById('chartContainer');
    const chartParent = chartContainer?.parentElement;

    if (chartContainer && chartParent) {
      Highcharts.chart('chartContainer', options);
    }
  }
  private getMonthlyRevenue(month: string): number {
    if (month === 'January') {
      return this.revenueJanuary;
    } else if (month === 'February') {
      return this.revenueFebruary;
    } else if (month === 'March') {
      return this.revenueMarch;
    }
    return 0;
  }
  onChartTypeChange() {
    this.generateChart();
  }
}
