//setting up our database connectiona
const Sequelize = require('sequelize');

const config = new Sequelize("task_manager", "", "", {dialect: 'mysql'}); 



module.exports = config;