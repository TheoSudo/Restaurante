import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  pessoas: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

sequelize.sync({ force: false })
  .then(() => console.log('Tabela Reserva criada com sucesso!'))
  .catch(err => console.error('Erro ao criar tabela Reserva:', err));

export default Reserva;
