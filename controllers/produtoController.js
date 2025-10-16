// controllers/produtoController.js
import Produto from '../models/produto.js'; 

const produtoController = {
    // ALTERAÇÃO AQUI: Usa .map(p => p.toJSON()) para garantir objetos planos
    getProductsData: async () => {
        const produtos = await Produto.findAll({ 
            order: [['createdAt', 'DESC']],
        });
        // Retorna um array de objetos planos, 100% acessível pelo Handlebars
        return produtos.map(p => p.toJSON()); 
    },

    // Rota GET /produtos: Lista todos os produtos (para gestão)
    listAllProducts: async (req, res) => {
        try {
            const produtos = await produtoController.getProductsData();
            res.render('produtos', { 
                produtos: produtos,
                isAdmin: req.session.user ? req.session.user.isAdmin : false
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).send('Erro ao buscar produtos: ' + error.message);
        }
    }, 
    
    // Rota GET /pedidos/novo: Mostra o cardápio para o pedido
    showMenuForOrder: async (req, res) => {
        try {
            const produtos = await produtoController.getProductsData();
            // Renderiza 'pedidos' e envia a variável 'produtos'
            res.render('pedidos', { 
                produtos: produtos, 
                isAdmin: req.session.user ? req.session.user.isAdmin : false
            });
        } catch (error) {
            console.error("Erro ao carregar cardápio:", error);
            res.status(500).render("erro", { mensagem: "Erro ao carregar cardápio." });
        }
    },

    // ... (o restante do CRUD permanece igual, pois ele já usava findByPk e toJSON ou redirect)
    showAddForm: (req, res) => {
        res.render('add_produto');
    },

    addNewProduct: async (req, res) => {
        const { nome, preco } = req.body;
        try {
            await Produto.create({
                nome: nome,
                preco: parseFloat(preco)
            });
            res.redirect('/produtos');
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).send('Erro ao adicionar produto: ' + error.message);
        }
    },

    showEditForm: async (req, res) => {
        try {
            const productId = req.params.id;
            const produto = await Produto.findByPk(productId);
            if (!produto) {
                res.status(404).send('Produto não encontrado.');
                return;
            }
            res.render('edit_produto', { produto: produto.toJSON() });
        } catch (error) {
            console.error("Erro ao buscar produto para edição:", error);
            res.status(500).send('Erro ao buscar produto para edição: ' + error.message);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const { nome, preco } = req.body;
            const [affectedRows] = await Produto.update(
                { nome: nome, preco: parseFloat(preco).toFixed(2) },
                { where: { id: productId } }
            );
            if (affectedRows === 0) {
                res.status(404).send('Produto não encontrado ou nenhum dado alterado.');
            } else {
                res.redirect('/produtos');
            }
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            res.status(500).send('Erro ao atualizar produto: ' + error.message);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const result = await Produto.destroy({ where: { id: productId } });
            if (result === 0) {
                res.status(404).send('Produto não encontrado.');
            } else {
                res.redirect('/produtos');
            }
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            res.status(500).send('Erro ao deletar produto: ' + error.message);
        }
    }
};

export default produtoController;