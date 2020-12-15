const agenda = require('./agenda');

export async function auditLog(content, staff) {
  await agenda.schedule('in 30 seconds', 'audit_log', {
    content,
    staff,
  });
}
