const estabecelimentosJson = require("../models/estabelecimentos.json")
const fs = require("fs")
const { RSA_NO_PADDING } = require("constants")

const write = (req, res) => {fs.writeFile("./src/models/estabelecimentos.json", JSON.stringify(estabecelimentosJson),'utf8', function(err){
    if(err){
        return res.status(500).send({message: err})
    }
})}

//POST - para criar nosso JSON
const createLocal = (req, res) => {
    const body = req.body

    let newLocal = {
        id:(estabecelimentosJson.length) +1,
        likes: body.likes,
        deslikes: body.deslikes,
        avaliacoes: body.avaliacoes,
        nome: body.nome,
        categoria: body.categoria,
        endereco: body.endereco,
        numero: body.numero,
        bairro: body.bairro,
        cidade: body.cidade,
        cep: body.cep,
        telefone: body.telefone,
        pagamento: body.pagamento,
        delivery: body.delivery
    }

    //CAMPOS OBRIATORIOS
    let camposObrigatorios = ["Nome", "Categoria", "Endereço", "Numero", "Bairro", "Cidade", "CEP", "Telefone", "Forma Pagamento", "Delivery"]
    if(!body.nome|| !body.categoria|| !body.endereco|| !body.numero|| !body.bairro|| !body.cidade|| !body.cep|| !body.telefone) {
    return res.status(400).send({message: "Todos os campos abaixo são obrigatórios para conclusão do cadastro: ", camposObrigatorios})
    }

    //RESTRINGINDO CIDADE
    if(body.cidade != "São Paulo") {
        return res.status(406).send({message: "Aceitamos cadastro de novos estabelecimentos apenas na cidade de São Paulo!"})
    }

    //LIMITANDO CARACTERES DE TELEFONE
    if(body.telefone.length > 13 || body.telefone.length < 12 ){
        return res.status(406).send([{message: "Preencher o telefone ou celular corretamente com o cógido DDD.", "Exemplo:": "Telefone fixo: 11 0000-0000 ou Celular: 11 00000-0000"}])
    }

    //LIMITANDO CARACTERES DE CEP
    if(body.cep.length > 9 || body.cep.length <9 ){
        return res.status(400).send({message: "O CEP deverá conter 9 digitos, sendo 3 ultimos separados por hífen."})
    }

    estabecelimentosJson.push(newLocal)
    write()
    res.status(201).json(
        [{
            "messagem":`Estabelecimento ${body.nome} cadastrado com sucesso!`,
            newLocal
        }]
    )
}

//GET para consultar todos estabelecimentos
const getAll = (req, res) => {
    res.status(200).send(estabecelimentosJson)
}

//GET por filtros
const getByFilter = (req, res) => {
    const {nome, categoria, bairro, pagamento, delivery} = req.query
    let localFilter = estabecelimentosJson

    if(nome){
        localFilter = localFilter.filter (estabelecimento => {
            return estabelecimento.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase())
        })
    }

    if(categoria){
        localFilter = localFilter.filter(estabelecimento => {
            return estabelecimento.categoria.toLocaleLowerCase().includes(categoria.toLocaleLowerCase())
        })
    }

    if(bairro){
        localFilter = localFilter.filter(estabelecimento => {
            return estabelecimento.bairro.toLocaleLowerCase().includes(bairro.toLocaleLowerCase())
        })
    }

    if(pagamento){
        localFilter = localFilter.filter(estabelecimento => {
            return estabelecimento.pagamento.toString().toLocaleLowerCase().includes(pagamento.toString().toLocaleLowerCase())
        })
    }

    if(delivery){
        localFilter = localFilter.filter(estabelecimento => {
            return estabelecimento.delivery == (delivery == "true" ? true : false)
        })
    }

    res.status(200).send(localFilter)
}

//GET por ID
const getById = (req, res) => {
    const idRequest = req.params.id
    const localFound = estabecelimentosJson.find(estabelecimento => estabelecimento.id == idRequest)

    if(localFound == undefined){
        res.status(404).send({message: `Estabelecimento ${idRequest} nao encontrado.`})
    }

    res.status(200).send(localFound)
}

//PATCH - Likes
const updateLike = (req, res) => {
    const {id} = req.params
    const localFound = estabecelimentosJson.find(estabelecimento => estabelecimento.id == id)

    if(localFound == undefined){
        res.status(404).send({message:`Estabelecimento ${id} não localizado. `})
    }
    
    localFound.likes += 1
    write()
    res.status(200).send([{message: `Você gostou disso:`, localFound}])
}

//PATCH - Deslike - no caso estou somatizando o deslike para tanto usa-se +=
const updateDeslike = (req, res) => {
    const {id} = req.params
    const localFound = estabecelimentosJson.find(estabelecimento => estabelecimento.id == id)

    if(localFound == undefined){
        res.status(404).send({message:'Estabelecimento não encontrado.'})
    }

    localFound.deslikes += 1
    write()
    res.status(200).send([{message: `Você não gostou disso:`, localFound}])
}

//PUT - alterar qualquer coisa preservando todos os dados existentes
//nao achei necessario fazer o PATCH nessa função e nem tive intenção de substituir dados com PUT, so alterar
const updateAnything = (req, res)=>{
    const {id} = req.params
    const bodyRequest = req.body

    const foundLocal = estabecelimentosJson.find(estabelecimento => estabelecimento.id == id)

    if(foundLocal == undefined){
        res.status(404).send({message: 'Estabelecimento não encontrado'})
    }

    bodyRequest.id == id

    Object.keys(foundLocal).forEach((chave)=>{
        if(bodyRequest[chave] == undefined){
            foundLocal[chave] = foundLocal[chave]
        }else{
            foundLocal[chave] = bodyRequest[chave]
        }
    })

    res.status(200).send([{menssage: "Atualizado com sucesso", foundLocal}])
}

//DELETE
const removeByiD = (req, res) => {
    const {id} = req.params
    const localFound = estabecelimentosJson.find(estabelecimento => estabelecimento.id == id)

    if (localFound == undefined){
        res.status(404).send({message:'Estabelecimento não encontrado.'})
    }

    const index = estabecelimentosJson.indexOf(localFound)
    estabecelimentosJson.splice(index, 1)

    write()

    res.status(200).send([{message:"Estabelecimento removido com sucesso.", localFound}]) //usado 200 para retornar msg
}

module.exports = {
    createLocal,
    getAll,
    getByFilter,
    getById,
    updateLike,
    updateDeslike,
    updateAnything,
    removeByiD
}