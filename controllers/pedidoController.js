import Pedido from '../models/pedido.js';
import ItemPedido from '../models/itemPedido.js';
import Produto from '../models/produto.js';

const pedidoController = {
  showCardapio: async (req, res) => {
    try {
      const produtos = await Produto.findAll();
      res.render('pedidos', { produtos: produtos.map(p => p.toJSON()) });
    } catch (error) {
      console.error('Erro ao carregar cardápio:', error);
      res.status(500).send('Erro ao carregar cardápio');
    }
  },

  criarPedido: async (req, res) => {
    try {
      let { produtosSelecionados } = req.body;
      if (!produtosSelecionados) return res.status(400).send('Nenhum produto selecionado.');

      if (!Array.isArray(produtosSelecionados)) produtosSelecionados = [produtosSelecionados];

      const pedido = await Pedido.create({ total: 0 });
      let total = 0;
      const itens = [];

      for (const idProduto of produtosSelecionados) {
        const quantidade = parseInt(req.body[`quantidade_${idProduto}`]) || 1;
        const produto = await Produto.findByPk(idProduto);
        if (!produto) continue;

        const subtotal = produto.preco * quantidade;
        total += subtotal;

        await ItemPedido.create({
          pedidoId: pedido.id,
          produtoId: produto.id,
          quantidade,
          subtotal
        });

        itens.push({ produto, quantidade, subtotal });
      }

      pedido.total = total;
      await pedido.save();

      res.render('pedidoSucesso', { itens, total });

    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).send('Erro ao criar pedido');
    }
  },

  listarPedidos: async (req, res) => {
    try {
      const pedidos = await Pedido.findAll({
        include: {
          model: ItemPedido,
          include: { model: Produto }
        },
        order: [['id', 'ASC']]
      });

      const pedidosData = pedidos.map(p => ({
        id: p.id,
        total: p.total,
        itens: p.ItemPedidos
          .map(item => ({
            nome: item.Produto ? item.Produto.nome : 'Produto não encontrado',
            quantidade: item.quantidade,
            subtotal: item.subtotal
          }))
      }));

      res.render('pedidosAdmin', { pedidos: pedidosData });
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      res.status(500).send('Erro ao listar pedidos');
    }
  },

  deletePedido: async (req, res) => {
    try {
      const { id } = req.params;
      await Pedido.destroy({ where: { id } });
      res.redirect('/pedidos/admin');
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      res.status(500).send('Erro ao excluir pedido');
    }
  }

};

export default pedidoController;
