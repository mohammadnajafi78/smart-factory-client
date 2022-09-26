import moment from 'jalali-moment';

export default function MomentEn(date) {
  return moment(date)
    .locale('en')
    .format('YYYY-MM-DD');
}
