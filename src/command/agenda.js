import { createLog } from '../modules/Notification/notificationRepository';

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

agenda.define('audit_log', async job => {
  const { content, staff } = job.attrs.data;
  await createLog(content, staff);
});

agenda.start().then(r => console.log(r));

module.exports = agenda;
