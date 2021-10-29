<img src="./para_o_lar/assets/banner.jpg" width="100%">

#

# API - RESTAURANT REGISTERS 🍜 

<img src="./para_o_lar/assets/banner2.jpg" width="100%">

 ## 🍕 Descrição 🍕

### API desenvolvida no Projeto Guiado da semana onze, pela bootcamp da <a href="https://reprograma.com.br/">{Reprograma}.</a> 

> Visto que, o município de Duque de Caxias, não reteriam de nenhum serviço para mostrarem os melhores restaurantes disponíveis nesta área. 
Com propósito de suprir esta necessidade, foi criada esta API para localizar todos os restaurantes cadastrados do município de Duque de Caxias.

> Com o intuito de obterem todas as informações destes restaurantes cadastrados, compartilhar com outras pessoas e transmitir para aqueles que desejam frequentarem um ambiente seguro.                               
Com isso, podemos compartilhar nossas experiências, ajudar com os feedback, verificar quantidades de likes e deslikes dos restaurantes frequentados.

> Dessa forma, os nossos usuários conseguirão visualizar os restaurantes, cria-los, atualiza-los, remove-los, filtrar por forma de pagamento, bairro, verificar se possui delivery e até buscar por quantidades de likes.


 ## Sumário
=================
 <!--ts-->
  * [Objetivos](#Objetivos)
  * [Aprendizados](#Aprendizados)
 * [Arquitetura Model View Controller](#-Arquitetura)
 * [Tecnologias](#-Tecnologias)
    * [Instalação](#-Instalação)
      * [Pré-Requisitos](#-Pré-Requisitos)
      * [Executando a API](#-Executando-a-API-(back-end))
      * [Features](#-Features)

 <!--te-->


 ## Objetivos

 - Cadastros de restaurantes por usuários;
 - Busca de restaurantes por forma de pagamento, por bairro, por delivery e likes;
 - Avaliação dos restaurantes através de likes ou deslikes e comentários dos usuários;
 - Simplificar a busca de restaurantes adequados para levar suas famílias e amigos.

 ##  Aprendizados 

 O projeto guiado consiste em uma API fundamentada no <span style = "color: red; font-weight: bold"> CRUD </span>, que são: <span style = "color: OrangeRed; font-weight: bold">CREATE -- criar </span>, <span style = "color: OrangeRed; font-weight: bold">READ -- ler/consultar </span>, <span style = "color: OrangeRed; font-weight: bold"> UPDATE -- atualizar</span> e <span style = "color: OrangeRed; font-weight: bold"> DELETE -- remover/destruir.


##  Arquitetura 

    Arquitetura MVC
        |
        \--📂  para_o_lar
            |      
            |  
            \--📂 node_modules
            \--📂 assets
            \--📂src
                |
                📂---controllers
                |       estabelecimentoController.js
                |       
                |                      
                📂---models
                |       
                |       estabelecimento.json
                |       
                |       
                |
                📂---routes
                |       estabelecimento.js
                |
                |
                |   **app.js**
                |
                |
                |       
                |______  
            |   package-lock.json
            |   package.json 
            |   .gitignore
            |   **server.js** 
            |   README.md 

      
##  Tecnologias 

Para realizar a construção desta API, as seguintes tecnologias foram utilizadas:

- [JavaScript](https://www.javascript.com/)
- [Git/Github](https://github.com/)
- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)
- [Express](https://expressjs.com/pt-br/)
- [cors](https://www.npmjs.com/package/cors)

   
##  Instalação 

* Para realizar download deste projeto, siga as instruções abaixo:

###  Pré-Requisitos 

O usuário precisa ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), o [Postman](https://www.postman.com/downloads/?utm_source=postman-home)
e o editor de código [VSCode](https://code.visualstudio.com/).

##  Executando a API (Back-End) 

```bash
# Abra o git!
# Clone este repositório, desta forma:
$ git clone <https://github.com/letidesi/On14-TodasEmTech-s11-PG-II.git>

# Acesse a pasta da API no terminal/cmd:
$ cd para_o_lar

# Instale as dependências necessárias:
$ npm install

# Execute o servidor:
$ npm start

# O servidor inciará na porta: 6060 - acesse <localhost:6060>.

```

* Utilize o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download/) para chamar e testar a API de Restaurantes.

   
##  Features 

### Funcionalidades da API - Restaurantes:

- [x] Cadastros do Restaurante - POST;
- [x] Like ou deslike - PATCH;
- [x] Busca - GET;
- [x] Busca por bairro, pagamento, delivery e likes - GET;
- [x] Atualizações em todos os campos dos cadastros - PUT;
- [x] Remover - DELETE.
