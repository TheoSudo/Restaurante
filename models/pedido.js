// models/pedido.js
import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Pedido = db.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Pedido;