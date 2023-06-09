const express = require('express')
const router = express.Router()
const mongoose = require('mongoose').default
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/posts', (req, res) => {
    res.send('Posts Page')
})

router.get('/categorias', (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias')
        res.redirect('/admin')
    })
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategoria')
})

router.post("/categorias/nova", (req, res) => {

    const erros = []

    if (!req.body.nome){
        erros.push({texto: 'Nome inválido'})
    }

    if (!req.body.slug) {
        erros.push({texto: 'Slug inválido'})
    }

    if (req.body.nome.length < 2) {
        erros.push({texto: 'Nome da categoria muito pequeno'})
    }

    if (erros.length > 0) {
        res.render('admin/addcategorias', {erros: erros})
    } else {
        const novaCategoria = ({
            nome: req.body.nome,
            slug: req.body.slug,
        })
        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso!')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao salvar categoria.')
            res.redirect('/admin')
        })
    }
})

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
        res.render('admin/editcategorias', {categoria: categoria})
    }).catch((err) => {
        req.flash('error_msg', 'essa categoria nao existe')
        res.redirect('/admin/categorias')
    })
})

router.post('/categorias/edit', (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash('success_msg', 'categoria editada com sucesso.')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'houve um erro ao salvar edicao a categoria')
            res.redirect('/admin/categorias')
        })
    }).catch((err) => {
        req.flash('error_msg', 'houve um erro ao editar a categoria')
        res.redirect('/admin/categorias')
    })
})


router.post('/categorias/deletar', (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'categoria editada com sucesso.')
        res.redirect('/admin/categorias'
        )}).catch((err) => {
        req.flash('error_msg', 'houve um erro ao deletar a categoria')
        res.redirect('/admin/categorias')
    })
})

module.exports = router