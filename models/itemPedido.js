// models/itemPedido.js
import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Pedido from "./pedido.js";
import Produto from "./produto.js"; 

const ItemPedido = db.define("ItemPedido", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  subtotal: { type: DataTypes.FLOAT, allowNull: false },
});

Pedido.hasMany(ItemPedido, { foreignKey: "pedidoId", onDelete: "CASCADE" });
ItemPedido.belongsTo(Pedido, { foreignKey: "pedidoId" });

Produto.hasMany(ItemPedido, { foreignKey: "produtoId" });
ItemPedido.belongsTo(Produto, { foreignKey: "produtoId" });

export default ItemPedido;