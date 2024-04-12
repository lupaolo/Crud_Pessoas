
const express = require('express')

const router = express.Router()

let listaTarefas = [
    {
    id: 1,
    nome: "João",
    idade: 20,
    email: "joão@email.com",
    telefone: "61900010002"
    }
]

// READ -> Buscar todos os produtos
router.get('/tarefas', (req, res) => {
    res.status(200).json(listaTarefas)
})

// READ -> Busca de produto especifico
router.get('/tarefas/:id', (req, res) => {
    const id = req.params.id
    const tarefa = listaTarefas.find(tarefa => tarefa.id == id)
    if (tarefa) {
        res.status(200).json(tarefa)
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrado!" })
    }
})


// CREATE -> Cadastro de um produto
router.post('/tarefas', (req, res) => {
    const dados = req.body

    if (!dados.nome || !dados.idade || !dados.email || !dados.telefone) {
        res.status(400).json({ mensagem: "Nome e idade, email e telefone são obrigatórios" })
    } else {
        const tarefa = {
            id: Math.round(Math.random() * 1000),
            nome: dados.nome,
            idade: dados.idade,
            email: dados.email,
            telefone: dados.telefone
        }

        listaTarefas.push(tarefa)

        res.status(201).json(
            {
                mensagem: "Tarefa cadastrada com sucesso!",
                tarefa
            }
        )
    }
})

// UPDATE -> Alterar um produto
router.put('/tarefas/:id', (req, res) => {
    const id = req.params.id
    const novosDados = req.body

    if (!novosDados.nome || !novosDados.idade || !novosDados.email || !novosDados.telefone) {
        res.status(400).json({ mensagem: "Nome e idade, email e telefone são obrigatórios!" })
    } else {

        const index = listaTarefas.findIndex(tarefa => tarefa.id == id)
        if (index == -1) {
            res.status(404).json({ mensagem: "Tarefa não encotrada!" })
        } else {
            const tarefa = {
                id: Number(id),
                nome: novosDados.nome,
               idade: novosDados.idade,
               email: novosDados.email,
               telefone: novosDados.telefone
            }

            listaTarefas[index] = tarefa

            res.status(200).json(
                {
                    mensagem: "Produto alterado com sucesso!",
                    tarefa
                }
            )
        }
    }
})

// DELETE -> Excluir produto
router.delete('/tarefas/:id', (req, res) => {
    const id = req.params.id
    const index = listaTarefas.findIndex(tarefa => tarefa.id == id)
    if (index == -1) {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" })
    } else {
        listaTarefas.splice(index, 1)
        res.status(200).json({ mensagem: "Tarefa excluida com sucesso!" })
    }



})







module.exports = router
