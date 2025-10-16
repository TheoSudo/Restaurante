import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Mensagem = sequelize.define('Mensagem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mensagem: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync({ force: false })
  .then(() => console.log('Tabela Mensagem criada com sucesso!'))
  .catch(err => console.error('Erro ao criar tabela Mensagem:', err));

export default Mensagem;
