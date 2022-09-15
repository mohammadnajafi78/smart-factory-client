import moment from 'jalali-moment';

export default function MomentTimeFa(date) {
  return moment(date)
    .locale('fa')
    .format('YYYY/MM/DD HH:mm:ss');
}
