const models = require("../models/estabelecimentos.json");

const getAll = (request, response) => {

    const {pagamento, bairro} = request.query
    
    let informacoesEstabelecimento = models

    //filtro pagamento
    if (pagamento) {
        informacoesEstabelecimento = informacoesEstabelecimento.filter(estabelecimento => { 
            return estabelecimento.pagamento.includes(pagamento);
        });
    }

    //filtro bairro
    if (bairro) {
        informacoesEstabelecimento = informacoesEstabelecimento.filter(estabelecimento => {
            return estabelecimento.bairro.includes(bairro);
        });
    }
    response.status(200).send(informacoesEstabelecimento);
}

const getById = (request, response) => {

    const idSolicitado = request.params.id
    const idEncontrado = models.find(estabelecimento => estabelecimento.id == idSolicitado)
    
    if (idEncontrado == undefined) {
        response.status(404).send({message: "Estabelecimento não encontrado."});
    }

    response.status(200).send(idEncontrado);
}

const criarEstabelecimento = (request, response) => {
    let body = request.body;

    let novoEstabelecimento = {
        id : (models.length)+1,
        categoria: body.categoria,
        like: body.like,
        deslike: body.deslike,
        nome: body.nome,
        endereco : body.endereco,
        numero : body.numero,
        bairro : body.bairro,
        cidade : body.cidade,
        telefone : body.telefone,
        pagamento : body.pagamento
    }

    if (!body.nome || !body.pagamento || !body.telefone) {
        return response.status(400).send({mensagem: "Cadastro inválido. Tente novamente!"});
    }

    if (body.nome.length >= 30){
        return response.status(400).send({mensagem: "O limite de caracteres permitidos para o nome foi ultrapassado."});
    }

    models.push(novoEstabelecimento);

    response.status(201).json(
        [
            {
                "mensagem" : "Novo estabelecimento cadastrado com sucesso!",
                novoEstabelecimento
            }
        ]
    )
}

const updateLike = (request, response) => {
    const idRequest  = request.params.id;
    const estabelecimentoEncontrado = models.find(estabelecimento => estabelecimento.id == idRequest);

    if (estabelecimentoEncontrado == undefined) {
        response.status(404).send({message: "Estabelecimento não encontrado!"});
    }

    estabelecimentoEncontrado.likes += 1;

    response.status(200).json(
        [
            {
                "mensagem" : "Like atualizado!",
                estabelecimentoEncontrado
            }
        ]
    )
}

const updateDeslike = (request, response) => {
    const idRequest  = request.params.id;
    const estabelecimentoEncontrado = models.find(estabelecimento => estabelecimento.id == idRequest);

    if (estabelecimentoEncontrado == undefined) {
        response.status(404).send({message: "Estabelecimento não encontrado!"});
    }

    estabelecimentoEncontrado.deslikes += 1;

    response.status(200).json(
        [
            {
                "mensagem" : "Deslike atualizado!",
                estabelecimentoEncontrado
            }
        ]
    )
}

const deletarEstabelecimento = (request, response) => {
    const idRequest  = request.params.id;
    const estabelecimentoEncontrado = models.find(estabelecimento => estabelecimento.id == idRequest);

    if (estabelecimentoEncontrado == undefined) {
        response.status(404).send({message: "Estabelecimento não encontrado!"});
    }

    const indexEncontrado = models.indexOf(estabelecimentoEncontrado);

    models.splice(indexEncontrado, 1);

    response.status(200).send({mensagem: "Estabelecimento deletado!"});
}

const atualizarEstabelecimento = (request, response) => {
    const idRequest  = request.params.id;
    const bodyRequest = request.body;
    const estabelecimentoEncontrado = models.find(estabelecimento => estabelecimento.id == idRequest);
   
    if (estabelecimentoEncontrado == undefined) {
        response.status(404).send({message: "Estabelecimento não encontrado!"});
    }

   bodyRequest.id = idRequest;

   Object.keys(estabelecimentoEncontrado).forEach((chave) => {

       if (bodyRequest[chave] == undefined){
        estabelecimentoEncontrado[chave] = estabelecimentoEncontrado[chave]
       } 
       else {
        estabelecimentoEncontrado[chave] = bodyRequest[chave]
       }
   })   

    response.status(200).send(
        [
            {
                mensagem: "Estabelecimento atualizado com sucesso!",
                estabelecimentoEncontrado
            }
        ]
    )    
}

module.exports = {
    getAll,
    getById,
    criarEstabelecimento,
    updateLike,
    updateDeslike,
    deletarEstabelecimento,
    atualizarEstabelecimento
}
