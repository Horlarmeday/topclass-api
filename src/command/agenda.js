import {
  createGroupNotification,
  createLog,
  createNotification,
} from '../modules/Notification/notificationRepository';
import Constant from '../helpers/constants';

const Agenda = require('agenda');

const agenda = new Agenda({
  db: { address: process.env.DB_MONGO, collection: 'jobs' },
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

agenda
  .on('ready', () => console.log('Agenda started!'))
  .on('error', () => console.log('Agenda connection error!'));

agenda.define(Constant.AUDIT_LOG, async job => {
  const { content, staff } = job.attrs.data;
  await createLog(content, staff);
});

agenda.define(Constant.NOTIFICATION, async job => {
  await createNotification(job.attrs.data);
});

agenda.define(Constant.GROUP_NOTIFICATION, async job => {
  await createGroupNotification(job.attrs.data);
});

agenda.start().then(r => console.log(r));

module.exports = agenda;
