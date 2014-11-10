#Gulp Projects

Modelo de estrutura do Gulp, montada para utilização em projetos web. 

#Modelos para projetos web.
Esse projeto foi criado com intuito inicial de estudar um novo otimizador de tarefas, no caso uma alteranativa ao Grunt. Escolhi o Gulp, pois achei mais rápido e mais eficiente. Abaixo descrevi um passo a passo de como utilizar o projeto que criei e como instalar os pré-requisitos para utilizar o Gulp. Caso você já tenha o NodeJs, Ruby Installer e o Compass instalados na sua máquina, pule o passo 1, 2 e 3.

##1º) Instalação do Node.js.
Para instalar o NodeJS vá no <a href="http://nodejs.org/" target="_blank">site official do Node JS</a>) e baixe o instalador. Depois de instalado precisamos instalar o Ruby Installer.

##2º) Instalação do Ruby Installer.
Agora precisamos instalar o Ruby Installer, baixe <a href="http://rubyinstaller.org/" target="_blank">aqui</a> e inicie a instalação. Ao iniciar a instalação do Ruby Installer, escolha o idioma e aceite os termos da licença para dar continuidade. Agora escolha o local de instalação, selecione todas as opções e clique em Install.

##3º) Instalando o Compass.
Para quem não sabe o Compass é um framework de CSS, que utilizaremos em conjunto com o Sass para utilizar algumas de suas funcionailidades. Para instalar o Compass, abra o prompt de comando do <b>Ruby Installer</b> que foi instalado agora pouco e coloque o comando abaixo.

```js
gem install compass 
```

##4º) Instalando o Gulp.
Após a instalação do NodeJS e do Ruby Installer vamos instalar o Gulp. Abra o prompt de comando e digite o comando abaixo.

```js 
npm install -global gulp
```

##5º) Inicializando o projeto no Gulp.
Após a instalação do Gulp em escopo global, vamos iniciar a utilização do Gulp. Baixe o projeto que criei <a href="https://github.com/rdoramone/Gulp-Projects/archive/master.zip" target="_blank">clicando aqui</a>. Salve o projeto na pasta que desejar. Abra o prompt de comando e coloque o caminho de onde o projeto foi salvo.

Dentro do projeto existe um arquivo chamado "package.json", dentro dele existem algumas informações relacionadas ao projeto e a suas tarefas, como nome do projeto, descrição do projeto, versão, autor, módulos utilizados no projeto e etc.

Caso queira fazer redefinições no nome do projeto, descrição, autor entre outras coisas basta executar o comando abaixo.

```js
npm init
```

Lembrando que isso serve para a criação de um novo arquivo para um projeto 'x' ou para um já existem, como o que estamos utilizando como exemplo. A utilização desse comando para um projeto que já tenha o arquivo "package.json" não irá apagar a declaração dos módulos que estão sendo utilizadas no projeto.

Para iniciar a instalação dos módulos no diretório do seu projeto. Ainda com o prompt aberto, certifique-se de que o caminho mostado no seu prompt de comando seja o mesmo caminho onde seu projeto está e digite o comando abaixo.

```js
npm install
// Após executar esse comando o package.json será acessado para verificar os módulos que existem nesse projeto, para porder instalar os mesmos no seu projeto. dentro da pasta node_modules.
```

Caso precise instalar algum outro módulo utilize o seguinte comando.

```js
npm install nome_do_modulo --save-dev
```

<b>Importante:</b> A utilização dos parâmetros "--save-dev", pois caso você instale o seu módulo sem esses parâmentros você utilizará ele normalmente, mas no arquivo "package.json" não irá constar que ele está presente no desenvolvimento do seu projeto, caso outro usuário pegue o projeto e instale os módulos, ele não instalará esse módulo que foi instalado sem os parâmetros. Portanto fique atento. 

##6º) Rodando o projeto com o Gulp.
Após ter executado a instalação dos módulos execute o comando "gulp" no prompt de comando e ele executará as tasks configuradas no "Gulpfile.js" e mostrará o index.html no Browser configurado como padrão, no caso o Google Chrome.

##7º) Gerando o projeto final com Gulp.
Depois de desenvolver todo o seu projeto, para gerar uma versão final para subir em HML/Produção, basta executar no prompt de comando a task "gulp prod" e todos os arquivos necessário estarão dentro da pasta "prod".

Espero ter ajudado a todos com essa explicação. Qualquer coisa entrem em contato comigo deixando perguntas ou relatando possíveis problemas nas "Issues".

Obrigado.