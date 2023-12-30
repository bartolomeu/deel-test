const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile');
const contractorGetById = require('./contractors/getById');
const contractorGetAll = require('./contractors/getByAll');
const jobsGetUnpaid = require('./jobs/getUnpaid');
const jobsPostPay = require('./jobs/postPay');
const balancePostDeposit = require('./balances/postDeposit');
const adminGetBestProfission = require('./admin/getBestProfission');
const adminGetBestClients = require('./admin/getBestClient');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.get('/contracts/:id',getProfile ,contractorGetById);
app.get('/contracts',getProfile ,contractorGetAll);
app.post('/jobs/:job_id/pay/', getProfile, jobsPostPay);
app.get('/jobs/unpaid', getProfile, jobsGetUnpaid);
app.post('/balances/deposit/:userId', getProfile, balancePostDeposit);
app.get('/admin/best-profession', adminGetBestProfission);
app.get('/admin/best-clients', adminGetBestClients)

module.exports = app;
