// const alunas = require("../model/alunas.json")
const Alunas = require('../model/alunas') //chamar o banco
const fs = require('fs');

exports.get = (req, res) => {
  // console.log(req.url)
  Alunas.find(function (error, alunas) {
    if (error) res.status(500).send(error)
    res.status(200).send(alunas)
  })
}

exports.getById = (req, res) => {
  // if (id > 34 || id <= 0) {
    //   res.redirect(301, "https://en.wikipedia.org/wiki/Man-in-the-middle_attack")
    // }
    // res.status(200).send(alunas.find(aluna => aluna.id == id))
    
    const alunaId = req.params.id
    Alunas.findById(alunaId, function(err, aluna){
      if(err)
      return res.status(500).send(err)

      if(!aluna){
        return res.status(200).send({message: `infelizmente a aluna não foi encontrada`})
      }
      res.status(200).send(aluna)
    })
}



exports.getBooks = (req, res) => {
  /*por json

  const alunaid = req.params.id
  const aluna = alunas.find(aluna => aluna.id == id)
  if (!aluna) {
    res.send("Nao encontrei essa garota")
  }
  const livrosAluna = aluna.livros
  const livrosLidos = livrosAluna.filter(livro => livro.leu == "true")
  const tituloLivros = livrosLidos.map(livro => livro.titulo)
  res.send(tituloLivros)*/

  //POR BANCO DE DADOS
  const alunaId = req.params.id
    Alunas.findById(alunaId, function(err, aluna){
      if(err)
      return res.status(500).send(err)

      if(!aluna){
        return res.status(200).send({message: `infelizmente a aluna não foi encontrada`})
      }
      const livrosAluna = aluna.livros
      const livrosLidos = livrosAluna.filter(livro => livro.leu == "true")
      const tituloLivros = livrosLidos.map(livro => livro.titulo)
      res.status(200).send(tituloLivros)
    })

}

exports.getSp = (req, res) => {
  Alunas.find(function(error, alunas) { //conectar com o banco
    if (error) res.status(500).send(error)
    const nasceuSp = alunas.filter(aluna => aluna.nasceuEmSp == "true")
    const meninasSp = nasceuSp.map(aluna => aluna.nome)
    res.status(200).send(meninasSp)
  })

}


exports.getAge = (req, res) => {
  const alunaId = req.params.id
  Alunas.findById(alunaId, function(err, alunas){
    if(err)
    return res.status(500).send(err)

    if(!alunas){
      return res.status(200).send({message: `infelizmente a aluna não foi encontrada`})
    }
    // const aluna = alunas.find(item => item.id == id)
    const dataNasc = alunas.dateOfBirth
    const arrData = dataNasc.split("/")
    const dia = arrData[0]
    const mes = arrData[1]
    const ano = arrData[2]
    const idade = calcularIdade(ano, mes, dia)
    res.status(200).send({ idade })
  })
}

function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
  const now = new Date()
  const anoAtual = now.getFullYear()
  const mesAtual = now.getMonth() + 1
  const hoje = now.getDate()

  let idade = anoAtual - anoDeNasc

  if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
    idade -= 1
  }
  return idade
}


exports.post = (req, res) => {
  const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
  alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros });

  fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
    if (err) {
      return res.status(500).send({ message: err });
    }
    console.log("The file was saved!");
  });

  return res.status(201).send(alunas);
}

exports.postBooks = (req, res) => {
  const id = req.params.id
  const aluna = alunas.find(aluna => aluna.id == id)
  if (!aluna) {
    res.send("Nao encontrei essa garota")
  }
  const { titulo, leu } = req.body;
  alunas[aluna.id - 1].livros.push({ titulo, leu });

  fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
    if (err) {
      return res.status(500).send({ message: err });
    }
    console.log("The file was saved!");
  });

  res.status(201).send(alunas[aluna.id - 1].livros);
}