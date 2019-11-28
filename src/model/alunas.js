const mongoose = require("mongoose")

//no schema eu coloco caracteristicas que o objeto vai possuir, formato entrada, hora, campos obrigatórios, etc
//para obrigatoria coloca  dateOfBirth: { type : String , require = "true"},
   
const AlunasSchema = new mongoose.Schema({
    nome: { type : String },
    dateOfBirth: { type : String },
    nasceuEmSp: { type : String },
    livros:[{
        titulo: String,
        leu: String,
    }]
})
    {
        versionKey: false //tirar o _v do banco de dados
    }

const Alunas = mongoose.model('Alunas', AlunasSchema)
module.exports = Alunas