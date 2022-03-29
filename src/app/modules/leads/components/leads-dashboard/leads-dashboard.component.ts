import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-leads-dashboard',
  templateUrl: './leads-dashboard.component.html',
  styleUrls: ['./leads-dashboard.component.css']
})
export class LeadsDashboardComponent {
  /* --------------------------- Bar chart for leads -------------------------- */
  LeadsDataLineChart: any;
  CplDataChart: any;
  cplData: any = [
    {
      cost: 30,
      lead: 20,
      cname: 'Campaign1'
    },
    {
      cost: 80,
      lead: 24,
      cname: 'Campaign2'
    },
    {
      cost: 50,
      lead: 18,
      cname: 'Campaign3'
    },
    {
      cost: 20,
      lead: 50,
      cname: 'Campaign4'
    },
    {
      cost: 42,
      lead: 40,
      cname: 'Campaign5'
    }
  ];
  CplChartData = [
    {
      data: [30, 80, 50, 20, 42],
      label: 'Cost per Campaign'
    },
    {
      data: [20, 24, 18, 50, 40],
      label: 'Leads Per Month'
    }
  ];
  CplChartLabel = [
    'Campaign1',
    'Campaign2',
    'Campaign3',
    'Campaign4',
    'Campaign5'
  ];
  public lineChartData: Array<any> = [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40],
      label: 'Leads per month'
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90, 48, 40, 19, 86, 27, 90],
      label: 'Ads spend per Month in Dollar'
    }
  ];

  public lineChartLabels: Array<any> = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  barChartPlugins = [];
  public lineChartOptions: any = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    responsive: true,
    cornerRadius: 100,
    plugins: {
      labels: {
        render: 'value'
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'black',
        boxWidth: 20,
        padding: 20,
        fontFamily: 'Poppins',
        fontSize: 13
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: '#b68969',
      borderColor: '#b68969',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      borderWidth: 3
    },
    {
      // grey
      backgroundColor: '#D3D3D3',
      borderColor: '#D3D3D3',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      borderWidth: 3
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: ChartType = 'bar';
  /* ------------------------- bar chart for lead ends ------------------------ */

  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    plugins: {
      labels: {
        render: 'value',
        fontColor: ['black', 'black', 'black']
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'black',
        boxWidth: 20,
        padding: 20,
        fontFamily: 'Poppins ',
        fontSize: 12
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  pieChartLabels: Label[] = ['label1', 'label2', 'label3'];
  pieChartData: SingleDataSet = [1, 2, 3];
  pieChartType: ChartType = 'doughnut';
  pieChartLegend: any = true;
  pieChartPlugins = [];
  pieChartColors = [
    {
      backgroundColor: [
        'rgb(63, 128, 234)',
        'rgb(229, 165, 75)',
        'rgb(217, 83, 79)',
        'rgb(41, 48, 66)',
        '#f0b961',
        'black'
      ]
    }
  ];
  MaximumLeadPieChart: any;
  leadsData: any;
  constructor() {
    this.LeadsDataLineChart = {
      lineChartColors: this.lineChartColors,
      lineChartType: this.lineChartType,
      lineChartLegend: this.lineChartLegend,
      lineChartOptions: this.lineChartOptions,
      lineChartLabels: this.lineChartLabels,
      lineChartData: this.lineChartData
    };

    this.CplDataChart = {
      lineChartColors: {},
      lineChartType: 'line',
      lineChartLegend: this.lineChartLegend,
      lineChartOptions: this.lineChartOptions,
      lineChartLabels: this.CplChartLabel,
      lineChartData: this.CplChartData
    };
    this.MaximumLeadPieChart = {
      pieChartOptions: this.pieChartOptions,
      pieChartLabels: this.pieChartLabels,
      pieChartData: this.pieChartData,
      pieChartType: this.pieChartType,
      pieChartLegend: this.pieChartLegend,
      pieChartPlugins: this.pieChartPlugins,
      pieChartColors: this.pieChartColors
    };
  }
}
