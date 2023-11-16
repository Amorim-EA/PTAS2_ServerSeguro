const { Sequelize } = require('sequelize');


const sequelize = new Sequelize("postgres://postgres:postgres@127.0.0.1:5432/DB_Gemeos",{
define:{
  timetamps:true,
  underscored:true,
},
});

  try {
    sequelize.authenticate();
    console.log('Conectado com o ElephantSQL!');
  } catch (error) {
    console.error('Atenção, a conexão falhou!:', error);
  }

module.exports={Sequelize,sequelize};