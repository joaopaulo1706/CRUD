const Tanque = require('../models/tanqueModel');
const Categoria = require('../models/categoriaModel');

const tanqueController = {
    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) return res.status(500).json({ error: err });
            res.render('tanques/create', { categorias });
        });
    },

    createTanque: (req, res) => {
        const novoTanque = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Tanque.create(novoTanque, (err, id) => {
            if (err) return res.status(500).json({ error: err });
            res.redirect('/tanques');
        });
    },

    getAllTanques: (req, res) => {
        const categoria = req.query.categoria || null;

        Tanque.getAll(categoria, (err, tanques) => {
            if (err) return res.status(500).json({ error: err });

            Categoria.getAll((err, categorias) => {
                if (err) return res.status(500).json({ error: err });
                res.render('tanques/index', { tanques, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    getTanqueById: (req, res) => {
        const id = req.params.id;

        Tanque.findById(id, (err, tanque) => {
            if (err) return res.status(500).json({ error: err });
            if (!tanque) return res.status(404).json({ message: 'Tanque não encontrado' });
            res.render('tanques/show', { tanque });
        });
    },

    renderEditForm: (req, res) => {
        const id = req.params.id;

        Tanque.findById(id, (err, tanque) => {
            if (err) return res.status(500).json({ error: err });
            if (!tanque) return res.status(404).json({ message: 'Tanque não encontrado' });

            Categoria.getAll((err, categorias) => {
                if (err) return res.status(500).json({ error: err });
                res.render('tanques/edit', { tanque, categorias });
            });
        });
    },

    updateTanque: (req, res) => {
        const id = req.params.id;

        const tanqueAtualizado = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Tanque.update(id, tanqueAtualizado, (err) => {
            if (err) return res.status(500).json({ error: err });
            res.redirect('/tanques');
        });
    },

    deleteTanque: (req, res) => {
        const id = req.params.id;

        Tanque.delete(id, (err) => {
            if (err) return res.status(500).json({ error: err });
            res.redirect('/tanques');
        });
    }
};

module.exports = tanqueController;
