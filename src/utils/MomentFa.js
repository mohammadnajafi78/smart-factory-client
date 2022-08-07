import moment from 'jalali-moment';

export default function MomentFa(date) {
  return moment(date)
    .locale('fa')
    .format('YYYY/MM/DD');
}
