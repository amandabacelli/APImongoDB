const mongoose = require("mongoose")

//no schema eu coloco caracteristicas que o objeto vai possuir, formato entrada, hora, campos obrigatórios, etc
const AlunasSchema = new mongoose.Schema({
    nome: { type : String },
    dateOfBirth: { type : String },
    nasceuEmSp: { type : String },
    livros:[{
        titulo: String,
        leu: String,
    }]

})

const Alunas = mongoose.model('Alunas', AlunasSchema)
module.exports = Alunas