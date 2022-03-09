import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export const fullDateComment = (date) => moment(date).format('lll');

export const fullDatePost = (date) => moment(date).format('llll');
