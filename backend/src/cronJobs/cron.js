const cron = require('node-cron')
const { deleteExpiredUsers } = require('../cronJobs/deleteExpiredUsers');

cron.schedule('0 0 * * *', () => {
    deleteExpiredUsers();
});