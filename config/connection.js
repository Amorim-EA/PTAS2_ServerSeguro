const { Sequelize } = require('sequelize');
const config = require('../config/config');
const pg = require('pg');
require('dotenv').config();

const cdev = config.development;
const localBd = `${cdev.dialect}://${cdev.username}:${cdev.password}@${cdev.host}:${cdev.port}/${cdev.database}`;

//const cloudBd = config.development.url;

const sequelize = new Sequelize(localBd ,{
  define: {
    timetamps: true,
    underscored: true,
  },
  dialectModule: pg
});

  try {
    sequelize.authenticate();
    console.log('Conectado com o ElephantSQL!');
  } catch (error) {
    console.error('Atenção, a conexão falhou!:', error);
  }

module.exports={Sequelize,sequelize};