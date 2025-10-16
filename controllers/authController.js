import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const getRegister = (req, res) => {
    res.render('register');
};

export const postRegister = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            username,
            password: hashedPassword,
            isAdmin: req.body.isAdmin === 'on'
        });

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.render('register', { error: 'Username já existe ou ocorreu um problema' });
    }
};

export const getLogin = (req, res) => {
    res.render('login');
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.render('login', { error: 'Usuário ou senha inválidos' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Usuário ou senha inválidos' });
        }

        req.session.isLoggedIn = true;
        req.session.user = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        };

        return req.session.save(err => {
            if (err) console.error('Erro ao salvar sessão:', err);

            if (user.isAdmin) {
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });

    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Ocorreu um erro ao fazer login' });
    }
};

export const getAdminDashboard = (req, res) => {
    if (req.session.isLoggedIn && req.session.user?.isAdmin) {
        res.render('inicio', { username: req.session.user.username });
    } else {
        res.redirect('/login');
    }
};

export const getUserDashboard = (req, res) => {
    if (req.session.isLoggedIn && req.session.user && !req.session.user.isAdmin) {
        res.render('inicio', { username: req.session.user.username });
    } else {
        res.redirect('/login');
    }
};

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.error(err);
        res.redirect('/login');
    });
};
