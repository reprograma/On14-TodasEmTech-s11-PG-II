const models = require("../models/estabelecimento.json");
const fs = require("fs");

const write = (request, response) => {
  fs.writeFile(
    "./src/models/estabelecimento.json",
    JSON.stringify(models),
    "utf8",
    function (err) {
      if (err) {
        return response.status(500).json([
          {
            message: "Erro.",
          },
        ]);
      }
    }
  );
};
const getAll = (request, response) => {
  const { pagamento, bairro, delivery } = request.query;

  let filtrados = models;

  if (pagamento) {
    filtrados = filtrados.filter((estab) => {
      return estab.pagamento.includes(pagamento);
    });
  }

  if (bairro) {
    filtrados = filtrados.filter((estab) => {
      return estab.bairro.includes(bairro);
    });
  }

  if (delivery) {
    filtrados = filtrados.filter((estab) => {
      return estab.delivery == (delivery == "true" ? true : false);
    });
  }

  response.status(200).send(filtrados);
};

const getById = (request, response) => {
  const idRequest = request.params.id;
  let estabelecimentoFound = models.find((estab) => estab.id == idRequest);

  if (estabelecimentoFound == undefined) {
    response.status(404).json([
      {
        message: "Estabelecimento não encontrado.",
      },
    ]);
  }

  response.status(200).send(estabelecimentoFound);
};

const like = (req, res) => {
  const { id } = req.params;
  const found = models.find((estab) => estab.id == id);

  if (found == undefined) {
    res.status(404).send([{ message: "Estabelecimento não encontrado" }]);
  }

  found.likes += 1;
  write();
  res.status(200).send(found);
};

const deslike = (req, res) => {
  const { id } = req.params;
  const found = models.find((estab) => estab.id == id);

  if (found == undefined) {
    res.status(404).send([{ message: "Estabelecimento não encontrado" }]);
  }

  found.deslikes += 1;
  write();
  res.status(200).send(found);
};

const remover = (req, res) => {
  const { id } = req.params;
  const found = models.find((estab) => estab.id == id);
  console.log(found);
  if (found == undefined) {
    res.status(404).send([{ message: "Estabelecimento não encontrado" }]);
  } else {
    const index = models.indexOf(found);
    models.splice(index, 1);
  }

  write();
  res.status(200).send([{ message: "Estabelecimento deletado com sucesso" }]);
};

const atualizar = (req, res) => {
  const { id } = req.params;
  const found = models.find((estab) => estab.id == id);
  let body = req.body;
  if (found == undefined) {
    res.status(404).send([{ message: "Estabelecimento não encontrado" }]);
  }

  body.id = id;
  Object.keys(found).forEach((keys) => {
    if (!body[keys]) {
      found[keys] = found[keys];
    } else {
      found[keys] = body[keys];
    }
  });

  res.status(200).send([{ message: "Estabelecimento atualizado com sucesso" }]);

  write();
};

const create = (request, response) => {
  const bodyReq = request.body;
  let estab = {
    id: models.length + 1,
    likes: bodyReq.likes,
    deslikes: bodyReq.deslikes,
    nome: bodyReq.nome,
    categoria: bodyReq.categoria,
    endereço: bodyReq.endereço,
    bairro: bodyReq.bairro,
    cidade: bodyReq.cidade,
    telefone: bodyReq.telefone,
    pagamento: bodyReq.pagamento,
    delivery: bodyReq.delivery,
  };

  if (
    !bodyReq.likes ||
    !bodyReq.deslikes ||
    !bodyReq.nome ||
    !bodyReq.endereço ||
    !bodyReq.bairro ||
    !bodyReq.cidade ||
    bodyReq.pagamento.length === 0 ||
    bodyReq.delivery === ""
  ) {
    response.status(201).json([
      {
        message: `É obrigatório infomar quantidades dos likes, o nome, o endereço, o bairro, cidade, pagamento e delivery.`,
      },
    ]);
  } else if (
    bodyReq.cidade === "Duque de Caxias" &&
    bodyReq.telefone.length == 14 &&
    bodyReq.nome.length <= 15
  ) {
    models.push(estab);

    response.status(201).json([
      {
        message: "O estabelecimento foi criado com sucesso.",
        models,
      },
    ]);
  } else {
    response.status(201).json([
      {
        message:
          "Só podem ser cadastrados os estabelecimentos com nomes menores que 15 caracteres, o establecimento deverá ser de Duque de Caxias. Exemplo telefone: (xx) xxxx-xxxx",
      },
    ]);
  }

  write();
};

module.exports = {
  getAll,
  getById,
  create,
  like,
  deslike,
  remover,
  atualizar,
};
