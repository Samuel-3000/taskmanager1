const Sequelize = require('sequelize');
const config = require('./../config');

const Task = config.define('Task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    task_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priority_level: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue:"low"
    },
    progress_level: {
        type: Sequelize.ENUM('pending', 'started', 'completed'),
        allowNull: false,
        defaultValue:"pending"
    }
}, {timestamps: false});


module.exports = Task;