const db = require('../config/db');

const Tanque = {
    create: (tanque, callback) => {
        const query = 'INSERT INTO tanques (nome, descricao, preco, quantidade, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [tanque.nome, tanque.descricao, tanque.preco, tanque.quantidade, tanque.categoria], (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT tanques.*, categorias.nome AS categoria_nome FROM tanques JOIN categorias ON tanques.categoria = categorias.id WHERE tanques.id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getAll: (categoria, callback) => {
        let query = `
            SELECT tanques.id, tanques.nome, tanques.descricao, tanques.preco, tanques.quantidade, categorias.nome AS categoria_nome
            FROM tanques
            JOIN categorias ON tanques.categoria = categorias.id`;

        if (categoria) query += ' WHERE tanques.categoria = ?';

        db.query(query, [categoria], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    update: (id, tanque, callback) => {
        const query = 'UPDATE tanques SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria = ? WHERE id = ?';
        db.query(query, [tanque.nome, tanque.descricao, tanque.preco, tanque.quantidade, tanque.categoria, id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM tanques WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Tanque;
