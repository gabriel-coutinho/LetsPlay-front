import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export const fullDateComment = (date) => moment(date).format('lll');

export const fullDatePost = (date) => moment(date).format('llll');

export const fullDatetime = (date) => moment(date).format('yyyy-MM-DDTHH:mm');

export const fullDatetimeNewPost = (date) =>
  moment(date).add(1, 'hour').startOf('hour').format('yyyy-MM-DDTHH:mm');
