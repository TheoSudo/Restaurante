import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import { sequelize } from './config/db.js';
import produtoRoutes from './routes/produtoRoutes.js';
import faleConoscoRoutes from './routes/faleConoscoRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('inicio', { imagemURL: '/images/restaurante.jpg' });
});
app.use('/produtos', produtoRoutes);
app.use('/faleConosco', faleConoscoRoutes);
app.use('/reserva', reservaRoutes);

sequelize.sync({ alter: true })
  .then(() => console.log('Tabelas sincronizadas com sucesso!'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
