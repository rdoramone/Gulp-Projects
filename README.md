#Gulp Projects

Modelo de projeto Gulp para projetos web. 

#Modelos para projetos web.
Esse projeto foi criado com intuito inicial de estudar um novo otimizador de tarefas, no caso uma alteranativa ao Grunt. 

Escolhi o Gulp, pois achei mais rápido e mais eficiente. Abaixo descrevi um passo a passo de como utilizar o projeto que criei e como instalar os pré-requisitos para utilizar o Gulp. Caso você já tenha o NodeJs, Ruby Installer e o Compass instalados na sua máquina, pule o passo 1, 2 e 3.

##1) Instalação do Node.js.
Para instalar o NodeJS vá no site official do <a href="http://nodejs.org/" target="_blank">Node JS</a> e baixe o instalador. Depois de instalado precisamos instalar o Ruby Installer.

##2) Instalação do Ruby Installer.
Agora precisamos instalar o Ruby Installer, baixe <a href="http://rubyinstaller.org/" target="_blank">aqui</a> e inicie a instalação. Ao iniciar a instalação do Ruby Installer, escolha o idioma e aceite os termos da licença para dar continuidade. Agora escolha o local de instalação, selecione todas as opções e clique em Install.

##3) Instalando o Compass.
Para quem não sabe o Compass é um framework de CSS, que utilizaremos em conjunto com o Sass para utilizar algumas de suas funcionailidades. Para instalar o Compass, abra o prompt de comando do <b>Ruby Installer</b> que foi instalado e coloque o comando abaixo.

```js
gem install compass 
```

##4) Instalando o Gulp.
Após a instalação do NodeJS e do Ruby Installer vamos instalar o Gulp. Abra o prompt de comando e digite o comando abaixo.

```js 
npm install -global gulp
```

##5) Inicializando o projeto no Gulp.
Após a instalação do Gulp em escopo global, vamos iniciar a utilização do Gulp. Baixe o projeto <a href="https://github.com/rdoramone/Gulp-Projects/archive/master.zip" target="_blank">clicando aqui</a>. Dentro do zip temos dois projetos com estruturas diferentes, o primeiro é o <b>v1</b>, que está com a versão antiga do projeto, o <b>v2</b> é uma nova versão, que eu julgo uma versão melhor para se trabalhar. Escolha uma das duas versões e salve o projeto na pasta que desejar. Abra o prompt de comando e coloque o caminho de onde o projeto foi salvo.

Dentro do projeto existe um arquivo chamado <b>package.json</b>, dentro dele existem algumas informações relacionadas ao projeto e a suas tarefas, como nome do projeto, descrição do projeto, versão, autor, módulos utilizados no projeto e etc.

Caso queira fazer redefinições no nome do projeto, descrição, autor entre outras coisas basta executar o comando abaixo ou altere diretamento no arquivo <b>package.json</b>.

```js
npm init
```

Lembrando que isso serve para a criação de um novo arquivo <b>package.json</b> ou para um arquivo existente, como o que estamos utilizando no projeto baixado. 
<b>Obs.:</b> A utilização desse comando para um projeto que já tenha o arquivo <b>package.json</b> não irá apagar a declaração dos módulos que estão sendo utilizadas no projeto.

Para iniciar a instalação dos módulos no diretório do seu projeto. Ainda com o prompt de comando aberto, certifique-se de que o caminho mostado no seu prompt de comando seja o mesmo caminho onde seu projeto está e digite o comando abaixo.

```js
npm install
/* Após executar esse comando o package.json será acessado para verificar os módulos que existem nesse
projeto e instala-lós dentro da pasta node_modules na raiz do seu projeto. */
```

Caso precise instalar algum outro módulo utilize o seguinte comando.

```js
npm install nome_do_modulo --save-dev
```

<b>Importante:</b> Ao instalar qualquer módulo no seu projeto utilize os parâmetros <b>--save-dev</b>, conforme exemplo assim, pois caso você instale o seu módulo sem esses parâmentros (você utilizará ele normalmente) o módulo não aparecerá como uma das dependências do projeto dentro do arquivo <b>package.json</b>, com isso se outro usuário pegar o projeto e instalar os módulos que estão como dependências do projeto, ele não instalará esse módulo que foi instalado sem os parâmetros. Portanto fique atento. 

##6) Rodando o projeto com o Gulp.
Após ter executado a instalação dos módulos execute a task <b>gulp</b> no prompt de comando e ele executará as tasks configuradas no <b>Gulpfile.js<b> e mostrará o index.html no Browser configurado como padrão, no caso o Google Chrome.

##7) Gerando o projeto final com Gulp.
Depois de desenvolver todo o seu projeto, para gerar uma versão final para subir em HML/Produção, basta executar no prompt de comando a task <b>gulp prod</b> e todos os arquivos necessário estarão dentro da pasta <b>prod</b>.

Espero ter ajudado a todos com essa explicação. Qualquer coisa entrem em contato comigo deixando perguntas ou relatando possíveis problemas nas <b>Issues</b>.

Obrigado.
