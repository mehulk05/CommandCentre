import * as moment from 'moment-timezone';

export class Filter {
  campaignName: any = '';
  startDate: any = moment().subtract(30, 'days').format('YYYY-MM-DD');
  endDate: any = moment().format('YYYY-MM-DD');
}
