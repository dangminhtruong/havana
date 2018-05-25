const cron = require('cron');
const todayReport = require('./excel_report_today');

const job = new cron.CronJob({
  cronTime: '00 55 23 * * 1-7',
  onTick: function() {
    todayReport();
    console.log('Cron jub runing...');
  },
  start: true, // True, chạy job này, false không chạy
  timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng 
});

job.start();