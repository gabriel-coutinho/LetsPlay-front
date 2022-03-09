import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export const dateInCalendar = (date) => moment(date).format('L');

export const fullDate = (date) => moment(date).format('llll');
