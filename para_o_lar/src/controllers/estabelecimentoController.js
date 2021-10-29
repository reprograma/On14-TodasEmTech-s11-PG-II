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
  const { pagamento, bairro, delivery, likes } = request.query;

  let filtered = models;

  if (pagamento) {
    filtered = filtered.filter((estab) => {
      return estab.pagamento.includes(pagamento);
    });
  }

  if (bairro) {
    filtered = filtered.filter((estab) => {
      return estab.bairro.includes(bairro);
    });
  }

  if (delivery) {
    filtered = filtered.filter((estab) => {
      return estab.delivery == (delivery == "true" ? true : false);
    });
  }

  if (likes) {
    filtered = filtered.filter((estab) => {
      return estab.likes == likes;
    });
  }
  response.status(200).send(filtrados);
};

const getById = (request, response) => {
  const idRequest = request.params.id;
  let foundRestaurant = models.find((estab) => estab.id == idRequest);

  if (foundRestaurant == undefined) {
    response.status(404).json([
      {
        message: "Este restaurante não foi encontrado.",
      },
    ]);
  }

  response.status(200).send(foundRestaurant);
};

const like = (req, res) => {
  const { id } = req.params;
  const foundRestaurant = models.find((estab) => estab.id == id);

  if (foundRestaurant == undefined) {
    res.status(404).send([{ message: "Este restaurante não foi encontrado." }]);
  }

  foundRestaurant.likes += 1;
  write();
  res.status(200).json([
    {
      message: `Obrigada pela colaboração, você curtiu o restaurante ${foundRestaurant.nome}.`,
    },
  ]);
};

const deslike = (req, res) => {
  const { id } = req.params;
  const foundRestaurant = models.find((estab) => estab.id == id);

  if (foundRestaurant == undefined) {
    res.status(404).send([{ message: "Este restaurante não foi encontrado." }]);
  }

  foundRestaurant.deslikes += 1;
  write();
  res.status(200).send([
    {
      message: `Poxaa que pena! Você não gostou do restaurante ${foundRestaurant.nome}.`,
    },
  ]);
};

const remover = (req, res) => {
  const { id } = req.params;
  const foundRestaurant = models.find((estab) => estab.id == id);
  if (foundRestaurant == undefined) {
    res.status(404).send([{ message: "Este restaurante não foi encontrado." }]);
  } else {
    const index = models.indexOf(foundRestaurant);
    models.splice(index, 1);
  }

  write();
  res.status(200).send([
    {
      message: `O restaurante ${foundRestaurant.nome} foi removido com sucesso.`,
    },
  ]);
};

const atualizar = (req, res) => {
  const { id } = req.params;
  const foundRestaurant = models.find((estab) => estab.id == id);
  let body = req.body;
  if (foundRestaurant == undefined) {
    res.status(404).send([{ message: "Este restaurante não foi encontrado." }]);
  }

  body.id = id;
  Object.keys(foundRestaurant).forEach((keys) => {
    if (!body[keys]) {
      foundRestaurant[keys] = foundRestaurant[keys];
    } else {
      foundRestaurant[keys] = body[keys];
    }
  });

  res.status(200).send([
    {
      message: `O restaurante ${foundRestaurant.nome} atualizado com sucesso.`,
    },
  ]);

  write();
};

const create = (request, response) => {
  const bodyReq = request.body;
  let estab = {
    id: models.length + 1,
    nome: bodyReq.nome,
    cnpj: bodyReq.cnpj,
    likes: bodyReq.likes,
    deslikes: bodyReq.deslikes,
    categoria: bodyReq.categoria,
    endereço: bodyReq.endereço,
    bairro: bodyReq.bairro,
    cidade: bodyReq.cidade,
    telefone: bodyReq.telefone,
    pagamento: bodyReq.pagamento,
    delivery: bodyReq.delivery,
    comentário_opcional: bodyReq.comentário,
  };

  if (
    !bodyReq.nome ||
    !bodyReq.cnpj ||
    !bodyReq.likes ||
    !bodyReq.deslikes ||
    !bodyReq.endereço ||
    !bodyReq.categoria ||
    !bodyReq.bairro ||
    !bodyReq.cidade ||
    bodyReq.pagamento.length === 0 ||
    bodyReq.delivery === ""
  ) {
    response.status(201).json([
      {
        message:
          "É obrigatório informar os seguintes campos para cadastrar seu restaurante:",
      },
      "* Nome;",
      "* CNPJ;",
      "* Likes;",
      "* Deslikes;",
      "* Endereço;",
      "* Categoria;",
      "* Bairro;",
      "* Cidade;",
      "* Pagamento;",
      "* Delivery.",
    ]);
  } else if (
    bodyReq.cidade === "Duque de Caxias" &&
    bodyReq.categoria === "Restaurante" &&
    bodyReq.telefone.length == 14 &&
    bodyReq.nome.length <= 15 &&
    bodyReq.cnpj.length == 19
  ) {
    models.push(estab);

    response.status(201).json([
      {
        message: `O restaurante ${estab.nome} cadastrado com sucesso.`,
        models,
      },
    ]);
  } else {
    response.status(201).json([
      {
        main_message:
          "É OBRIGATÓRIO SER RESTAURANTES PARA REALIZAR O CADASTRO!",
        message: "OBS: LEIA OS TERMOS ABAIXO COM ATENÇÃO!",
      },
      {
        messaging_rules:
          "É obrigatório realizar as regras abaixo para cadastrar seu restaurante:",
      },
      "*  Seu restaurante deverá estar localizado em Duque de Caxias;",
      "*  O nome do seu restaurante deverá ser menor ou igual à 15 caracteres;",
      {
        example_messages: "Exemplos de como inserir os seguintes campos:",
      },
      "* Comentário: Deixe seu feedback sobre o restaurante.",
      "*  Telefone: (xx) xxxx-xxxx;",
      "*  CNPJ: xx.xxx.xxx/xxxx-xx.",
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
