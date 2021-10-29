<img src="./para_o_lar/assets/banner.jpg" width="100%">

#
<h1 style = "color: gold; font-weight: bold" > API - RESTAURANT REGISTERS 🍜 </h1>

<img src="./para_o_lar/assets/banner2.jpg" width="100%">

 <h2 style = "color: gold; font-weight: bold"> 🍕 Descrição 🍕</h2>

<h3> API desenvolvida no Projeto Guiado da semana onze, pela bootcamp da <a href="https://reprograma.com.br/">{Reprograma}.</a> <h3>

> Visto que, o município de Duque de Caxias, não reteriam de nenhum serviço para mostrarem os melhores restaurantes disponíveis nesta área. 
Com propósito de suprir esta necessidade, foi criada esta API para localizar todos os restaurantes cadastrados do município de Duque de Caxias.

> Com o intuito de obterem todas as informações destes restaurantes cadastrados, compartilhar com outras pessoas e transmitir para aqueles que desejam frequentarem um ambiente seguro.                               
Com isso, podemos compartilhar nossas experiências, ajudar com os feedback, verificar quantidades de likes e deslikes dos restaurantes frequentados.

> Dessa forma, os nossos usuários conseguirão visualizar os restaurantes, cria-los, atualiza-los, remove-los, filtrar por forma de pagamento, bairro, verificar se possui delivery e até buscar por quantidades de likes.

 <h2 style = "color: gold; font-weight: bold"> 🍟 Objetivos 🍟</h2>

 - Cadastros de restaurantes por usuários;
 - Busca de restaurantes por forma de pagamento, por bairro, por delivery e likes;
 - Avaliação dos restaurantes através de likes ou deslikes e comentários dos usuários;
 - Simplificar a busca de restaurantes adequados para levar suas famílias e amigos.

 <h2 style = "color: gold; font-weight: bold"> 🥗 Aprendizados 🥗</h2>

 O projeto guiado consiste em uma API fundamentada no <span style = "color: red; font-weight: bold"> CRUD </span>, que são: <span style = "color: OrangeRed; font-weight: bold">CREATE -- criar </span>, <span style = "color: OrangeRed; font-weight: bold">READ -- ler/consultar </span>, <span style = "color: OrangeRed; font-weight: bold"> UPDATE -- atualizar</span> e <span style = "color: OrangeRed; font-weight: bold"> DELETE -- remover/destruir. 


<h2 style = "color: gold; font-weight: bold"> 🍔 Arquitetura 🍔</h2>

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