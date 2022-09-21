import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import * as moment from 'moment-timezone';
import { Label, SingleDataSet } from 'ng2-charts';
import { of } from 'rxjs';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { Filter } from '../../models/filter';
import { LeadServiceService } from '../../services/lead-service.service';

@Component({
  selector: 'app-lead-dashboard1',
  templateUrl: './lead-dashboard1.component.html',
  styleUrls: ['./lead-dashboard1.component.css']
})
export class LeadDashboard1Component implements OnInit {
  /* --------------------------- Bar chart for leads -------------------------- */

  LeadsDataLineChart: any;
  filter: Filter = new Filter();

  filterObs$ = of(this.filter);

  loadTable = false;
  chartData = false;

  leadData: any = [];
  CplDataChart: any;
  CampaignList: any;
  appointments: any[] = [];
  campaignAgg: any[] = [];
  filterCampaignAgg: any[] = [];
  selectedDate: any;

  bsRangeValue: Date[] = [];

  myForm: FormBuilder = new FormBuilder();

  leadCampaignConfig: any = {
    itemsPerPage: 10,
    currentPage: 0,
    id: 1,
    totalItems: 0
  };

  cplData: any = [
    {
      cost: 30,
      lead: 20,
      appointment: 20,
      revenuEarned: 20,
      cname: 'Campaign1'
    }
  ];
  CplChartData = [
    {
      data: [0, 25],
      label: 'Revenu Spent'
    },
    {
      data: [0, 50],
      label: 'Revenue Earned'
    }
  ];
  CplChartLabel = ['Revenu Spent', 'Revenu Earned'];
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
  pieChartLabels: Label[] = ['Leads', 'Appointmnent', 'Revenu Earned'];
  pieChartData: SingleDataSet = [0, 0, 0];
  pieChartType: ChartType = 'bar';
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
  constructor(
    private leadService: LeadServiceService,
    private toastService: ToasTMessageService,
    private router: Router
  ) {
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
  ngOnInit(): void {
   // this.selectedDate = this.filter.startDate+ " - " + this.filter.endDate

   this.bsRangeValue = [new Date(this.filter.startDate), new Date(this.filter.endDate)];

    this.getLeadCampaignCount();
    this.loadCampaignList();
    this.getCampaignAgg(this.leadCampaignConfig);
    this.getChartData();
  }

  loadCampaignList() {
    this.leadService.getCampaignList().then(
      (data: any) => {
        console.log(data);
        this.CampaignList = data?.results;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  onChange(e: any) {
    console.log(e);
    const filterObj = {
      campaignName: e,
      startDate: this.filter.startDate ?? '',
      endDate: this.filter.endDate ?? ''
    };
    this.filter = filterObj;
    this.filterObs$ = of(this.filter);
    this.resetCounters();
    this.getCampaignAgg(this.leadCampaignConfig);
    this.getChartData();
    this.getLeadCampaignCount();
  }

  resetCounters() {
    this.leadCampaignConfig = {
      itemsPerPage: 10,
      currentPage: 0,
      id: 1,
      totalItems: 0
    };
  }

  onDateSelect(e: any) {
    console.log(e);
    this.filter.startDate = moment(e[0]).format('YYYY-MM-DD');
    this.filter.endDate = moment(e[1]).format('YYYY-MM-DD');
    this.filter = { ...this.filter };
    console.log(this.filter);
    this.filterObs$ = of(this.filter);
    this.getLeadCampaignCount();
    this.getCampaignAgg(this.leadCampaignConfig);
    this.getChartData();
  }

  getLeadCampaignCount() {
    const countObj = this.leadService
      .getLeadCampaignCount(this.filter)
      .then((data: any) => {
        this.leadCampaignConfig.totalItems = data?.count;
      });
    console.log('countObj', countObj.count);
  }

  getCampaignAgg(pageConfig: any) {
    this.loadTable = true;
    this.leadService
      .getCampaignAggregation(
        this.filter,
        pageConfig.currentPage,
        pageConfig.itemsPerPage
      )
      .then(
        (data: any) => {
          this.loadTable = false;
          this.campaignAgg = data.results;
          this.filterCampaignAgg = data.results;
        },
        (e) => {
          this.loadTable = false;
          console.log(e);
        }
      );
  }

  pageChangedForLeadCampaign(event: any) {
    this.leadCampaignConfig.currentPage = event;
    const pageConfig: any = { ...this.leadCampaignConfig };
    pageConfig.currentPage = event - 1;
    console.log(pageConfig, this.leadCampaignConfig);
    this.getCampaignAgg(pageConfig);
  }

  onCampaignClick(name: any) {
    this.router.navigate(['leads/campaign'], {
      queryParams: { campaignName: name }
    });
  }

  filterCampagn() {
    if (
      this.filter.campaignName != undefined &&
      this.filter.campaignName != ''
    ) {
      this.filterCampaignAgg = this.campaignAgg.filter(
        (it) => it.campaignName === this.filter.campaignName
      );
    } else {
      this.filterCampaignAgg = this.campaignAgg;
    }
  }

  setPieChartData(data: any) {
    // const revenueSpend = this.filterCampaignAgg.reduce(function (result, item) {
    //   return result + item.revenueSpend;
    // }, 0);
    // const totalLeadCount = this.filterCampaignAgg.reduce(function (
    //   result,
    //   item
    // ) {
    //   return result + item.leadCount;
    // },
    // 0);
    // const appointmentBooked = this.filterCampaignAgg.reduce(function (
    //   result,
    //   item
    // ) {
    //   return result + item.appointmentBooked;
    // },
    // 0);
    this.pieChartData = [
      data.leadCount,
      data.appointmentBooked,
      data.revenueEarned
    ];
    this.MaximumLeadPieChart.pieChartData = this.pieChartData;
  }

  getChartData() {
    this.chartData = true;
    this.leadService.getChartData(this.filter).then(
      (data: any) => {
        this.chartData = false;
        this.setPieChartData(data);
      },
      (e) => {
        this.chartData = false;
        console.log(e);
      }
    );
  }
}
// export class Filter {
//   campaignName: any;
//   startDate: any;
//   endDate: any;
// }
