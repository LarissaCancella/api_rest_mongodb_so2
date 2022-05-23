import express from "express";
import { Person } from '../models/Person.js'
const router = express.Router();

// Create - criacao de dados
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body
    const person = { name, salary, approved }

    // validação de campos obrigatorios
    if(!name || !salary || approved === null || approved === undefined || approved === "") {
        res.status(422).json('Os campos obrigatórios não foram enviados, tente novamente')
    }

    try {
        // criando dados
        await Person.create(person)
        res.status(201).json({
            message: 'Cadastro realizado com sucesso',
            data: person
        })
    } catch(error) {
        res.status(400).json({error: error})
    }
})

// Read - listagem dos dados
router.get('/', async (req, res) => {
    try{
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(400).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const person = await Person.findOne({ _id: id })
        if(!person) res.status(404).json({ message: 'Usuário não encontrado' })
        res.status(200).json(person)
    } catch(error) {
        res.status(400).json({error: error})
    }
})

// UPDATE - atualizacao (put ou patch - atualizacao parcial)
router.patch('/:id', async (req, res) => {
    const { name, salary, approved } = req.body
    const { id } = req.params
    const person = { name, salary, approved }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if(updatedPerson.matchedCount === 0) res.status(404).json({ message: 'Usuário não encontrado' })

        const data = await Person.findOne({ _id: id})

        res.status(200).json({ message: 'Usuário atualizado com sucesso', data: data})
    } catch(error) {
        res.status(400).json({ error: error})
    }
})

// DELETE - remover registro
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    const person = await Person.findOne({ _id: id})
    if(!person) res.status(404).json({ message: 'Usuário não encontrado' })

    try{
        await Person.deleteOne({ _id: id})

        res.status(200).json({ message: 'Usuário removido com sucesso'})
    } catch(error) {
        res.status(400).json({ error: error})
    }
})

export default router