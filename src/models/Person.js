// imports
import mongoose from 'mongoose'

// criando tabela
export const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    approved: Boolean
})
