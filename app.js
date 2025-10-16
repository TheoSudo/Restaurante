import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

import produtoRoutes from './routes/produtoRoutes.js';
import faleConoscoRoutes from './routes/faleConoscoRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import authRoutes from './routes/authRoutes.js';
import pedidoRoutes from "./routes/pedidoRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'), 
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'uma-chave-secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use('/style', express.static(path.join(__dirname, 'style')));

app.get('/', (req, res) => {
  res.render('inicio', { 
    imagemURL: 'https://grandehotelsenac.com.br/wp-content/uploads/2025/03/GHP_Gastronomia_Restaurante_GH_501.jpg'
  });
});

app.use('/produtos', produtoRoutes);
app.use('/faleConosco', faleConoscoRoutes);
app.use('/reserva', reservaRoutes);
app.use('/login', authRoutes);
app.use("/pedidos", pedidoRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
