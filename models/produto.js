// models/produto.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Produto = db.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

// Nota: A sincronização no arquivo do Model é para fins de teste.
// Idealmente, deve estar no arquivo de inicialização do app (index.js).
db.sync({ force: false })
  .then(() => console.log('Tabela Produtos criada com sucesso!'))
  .catch(err => console.error('Erro ao criar tabela Produtos:', err));

export default Produto;