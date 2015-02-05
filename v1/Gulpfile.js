var autoprefixer = require('gulp-autoprefixer'), // Insere prefixos no CSS de acordo com as especificações do W3C.
	browserSync = require('browser-sync'), // Cria um server, fornece uma url local e externa e abre no navegador selecionado nas configurações.
	compass = require('gulp-compass'), // Framework de css, utilizado para criar os sprite das imagens e minificar o css.
	concat = require('gulp-concat'), // Concatena arquivos da mesma extensão. 
	del = require('del'), // Deleta arquivos e pastas.
	gulp = require('gulp'), // Inserção do Gulp para funcionamento das tasks.
	htmlhint = require('gulp-htmlhint'), // Avalia a qualidade do código HTML e aponta os erros de acordo com as configurações estabelecidas.
	htmlmin = require('gulp-htmlmin'), // Minifica arquivos .html.
	imagemin = require('gulp-imagemin'), // Comprime arquivos de imagem .png, .jpg, .gif e .svg.
	jshint = require('gulp-jshint'), // Avalia a qualidade do código JS e aponta os erros de acordo com as configurações setadas no arquivo .jshintrc.
	notify = require('gulp-notify'), // Apresenta notificações de erro, finalização de compilação entre outros.
	reload = browserSync.reload, // Método que assiste as alterações feitas nos arquivos para dar um reload na aplicação.
	uglify = require('gulp-uglify'); // Minifica arquivos .js.

// Caminho dos arquivos de Desenvolvimento.
var pathDev = 'dev',
	pathHtmls = pathDev + '/*.html',
	pathDevAssets = pathDev + '/assets',
	pathSource = pathDevAssets + '/_source',
	pathSourceJs = pathSource + '/js',
	pathSourceJsLibs = pathSourceJs + '/libs',
	pathSourceJsLibsFile = pathSourceJsLibs + '/*.js',
	pathSourceJsApp = pathSourceJs + '/application',
	pathSourceJsAppFile = pathSourceJsApp + '/*.js',
	pathSourceSass = pathSource + '/sass',
	pathSourceSassFile = pathSourceSass + '/**/*.scss',
	// Caminho dos arquivos gerados pela compilação do Gulp.
	pathCss = pathDevAssets + '/css',
	pathCssFile = pathCss + '/*.css',
	pathJs = pathDevAssets + '/js',
	pathJsFile = pathJs + '/*.js',
	pathJsLibs = pathJs + '/libs',
	pathJsLibsFile = pathJsLibs + '/*.js',
	// Caminho dos arquivos adicionais, fontes, imagens, áudio, video e pdfs.
	pathFont = pathDevAssets + '/fonts',
	pathFontFile = pathFont + '/*.{eot,svg,ttf,woff}',
	pathImg = pathDevAssets + '/img',
	pathImgFile = pathImg + '/{**/*.{jpg,png,gif,svg}, *.{jpg,png,gif,svg}}',
	pathMedia = pathDevAssets + '/media',
	pathMediaAudio = pathMedia + '/audios',
	pathMediaAudioFile = pathMediaAudio + '/*.{mp3,wma,aac,ogg,wav}',
	pathMediaVideo = pathMedia + '/videos',
	pathMediaVideoFile = pathMediaVideo + '/*.{avi,mov,mkv,wmv,mp4}',
	pathPdf = pathDevAssets + '/pdf',
	pathPdfFile = pathPdf + '/*.pdf',
	// Caminho dos arquivos de HML / Produção.
	pathProd = 'prod',
	pathProdHtmls = pathProd + '/*.html',
	pathProdAssets = pathProd + '/assets',
	pathProdCss = pathProdAssets + '/css',
	pathProdFont = pathProdAssets + '/fonts',
	pathProdImg = pathProdAssets + '/img',
	pathProdJs = pathProdAssets + '/js',
	pathProdJsLibs = pathProdJs + '/libs',
	pathProdMedia = pathProdAssets + '/media',
	pathProdMediaAudio = pathProdMedia + '/audios',
	pathProdMediaVideo = pathProdMedia + '/videos',
	pathProdPdf = pathProdAssets + '/pdf';

var configBrowserSyncDev = {
	browser: 'chrome', // Browser que será utilizado para visualização da páginas.
	logPrefix : 'Gulp Full', // Altera o prefixo de registro. 
	notify: true, // Notificação de popup no Browser para saber se houve um reload.
	open: true, // Opção para abrir o browser.
	port: 3000, // Porta utlizada para criar o server e mostrar a página no browser configurado.
	server: {
		baseDir: pathDev, // Diretório base para inicialização do server.
		index: 'index.html' // Arquivo que será utilizado na abertura do server.
	}
}

var configBrowserSyncProd = {
	browser: 'chrome', // Browser que será utilizado para visualização da páginas.
	logPrefix : 'Gulp Full', // Altera o prefixo de registro. 
	notify: true, // Notificação de popup no Browser para saber se houve um reload.
	open: true, // Opção para abrir o browser.
	port: 9000, // Porta utlizada para criar o server e mostrar a página no browser configurado.
	server: {
		baseDir: pathProd, // Diretório base para inicialização do server.
		index: 'index.html' // Arquivo que será utilizado na abertura do server.
	}
}

/* ---------- ESTRUTURA DE DEV ---------- */
	// Task do Gulpfile.js que verifica as alterações do arquivo.
	gulp.task('gulpfile', function(){
		return gulp.src('./Gulpfile.js')
			.pipe(reload({stream: true}));
	})

	// Task dos arquivos HTML que aplica regras do HTMLhint e reporta erros.
	gulp.task('htmlsDev', function(){
		return gulp.src(pathHtmls)
			.pipe(htmlhint(
				{
					"tagname-lowercase"		   : true, // O nome da tag deve estar em letras minúsculas;
					"attr-lowercase" 		   : true, // O nome do atributo deve estar em letras minúsculas;
					"attr-value-double-quotes" : true, // Os atributos devem iniciar e fechar com "aspas";
					"attr-value-not-empty" 	   : true, // Os atributos devem ter os valores definidos;
					"attr-no-duplication" 	   : true, // Os atributos não podem ser duplicados no mesmo elemento;
					"doctype-first" 		   : true, // O doctype deve ser o primeiro elemente;
					"tag-pair" 				   : false, // As tags deve ser em pares.
					"tag-self-close" 		   : true, // As tags deve ser fechadas.
					"spec-char-escape" 		   : true, // Caracteres especiais devem ser em ASCII
					"id-unique"				   : true, // IDs devem ser únicos
					"src-not-empty"			   : true, // O atributo src, href ou data devem estar preenchidos.
					"head-script-disabled" 	   : true, // A tag script não pode ser utilizada dentro da Tag Head.
					"img-alt-require" 		   : true // O atributo alt das imagens devem ser preenchidos.
				}
			))
			.pipe(htmlhint.reporter()) // Caso algum erro seja encontrado dentro do HTML ele é reportado.
		    .pipe(htmlhint.failReporter()) // Caso algum erro seja encontrado dentro do HTML ele é reportado e para a aplicação do Gulp.
			.pipe(reload({stream: true}));
	})

	/* 
		Task dos arquivos de SASS, deleta o arquivo CSS gerado pela compilação do Compass e gera um novo arquivo "stylesheet.css" minificado com todos os arquivos .scss,
		com todos os caminhos dos sprites, largura, altura, background-position, retira os comentários, mostra erros de css como fechamento de tag e pontuação erradas.
	*/
	gulp.task('sassDev', function(){
		del(pathCss + '/stylesheet.css', function(error){
			console.log("O arquivo \"stylesheet.css\" foi deletado ou alterado.");
		});
		return gulp.src(pathSourceSassFile)
			// Insere prefixos nas duas ultimas versões de cada um dos navegadores especificados abaixo
			.pipe(compass({
				css: pathCss,
				font: pathDevAssets + '/fonts',
				image: pathImg,
				sass: pathSourceSass,
				comments: true,
				logging: true,
				relative: true,
				style: 'compressed' // Opções de estilo: nested, expanded, compact, or compressed.
			}))
		    .pipe(autoprefixer('last 2 version', 'Chrome 28', 'Safari 7', 'ie9', 'ie11', 'Opera 12.1', 'Firefox 30', 'IOS 7', 'Android 4.3'))
		    .pipe(gulp.dest(pathCss))
			.pipe(reload({stream: true}));
	})

	/* 
		Deleta o arquivo "application.js" verifica as regras configuradas no arquivo ".jshintrc", caso ocorra algum erro a aplicação para de rodar e mostra os erros.
		Pega dos os arquivos js da pasta "dev\assets\_source\js\application" e concatena e gera um único arquivo.
	*/
	gulp.task('appsDev', function(){
		del(pathJs + '/application.js', function(error){
			console.log("O arquivo \"application.js\" foi deletado ou alterado.");
		});
		return gulp.src(pathSourceJsAppFile, {base: pathSourceJsApp})
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('jshint-stylish')) // Estilo externo, para deixar mais explicado o erro que está ocorrendo
			.pipe(jshint.reporter('fail')) // Caso ocorra algum erro em um dos JS, levando em consideração também as configurações setadas no arquivo '.jshintrc', a aplicação aponta o erro e para de rodar.
			.pipe(concat('application.js'))
			.pipe(gulp.dest(pathJs))
			.pipe(reload({stream: true}));
	})

	// Deleta o arquivo "plugins.js" pega dos os arquivos js da pasta "dev\assets\_source\js\libs" e concatena e gera um único arquivo.
	gulp.task('libsDev', function(){
		del(pathJsLibs + '/plugins.js', function(error){
			console.log("O arquivo \"plugins.js\" foi deletado ou alterado.");
		});
		return gulp.src(pathSourceJsLibsFile, {base: pathSourceJsLibs})
			.pipe(concat('plugins.js'))
			.pipe(gulp.dest(pathJsLibs))
			.pipe(reload({stream: true}));
	})

	// Tasks que chama as configurações setadas no objeto "configBrowserSyncDev" após executar as outras tasks dentro do array.
	gulp.task('browserSyncDev', ['libsDev', 'appsDev', 'sassDev', 'htmlsDev'], function(){
		browserSync(configBrowserSyncDev);
	})

	// Task que assiste as alterações realizadas no arquivo Gulpfile.js.
	gulp.task('watchGulpfile', function(){
		gulp.watch('Gulpfile.js', ['gulpfile']);
	})

	// Task que assisti as alterações dos arquivos .html.
	gulp.task('watchHtml', function(){
		gulp.watch(pathHtmls, ['htmlsDev']);
	})

	// Task que assisti as alterações dos arquivos .scss.
	gulp.task('watchSass', function(){
		gulp.watch(pathSourceSassFile, ['sassDev']);
	})

	// Task que assisti as alterações dos plugins da pasta "dev\assets\_source\js\libs".
	gulp.task('watchLibs', function(){
		gulp.watch(pathSourceJsLibsFile, ['libsDev']);
	})

	// Task que assisti as alterações dos arquivos .js da pasta "dev\assets\_source\js\application".
	gulp.task('watchApps', function(){
		gulp.watch(pathSourceJsAppFile, ['appsDev']);
	})

/* ---------- ESTRUTURA DE PROD ---------- */
	// Limpa os diretórios de Prod.
	gulp.task('clean', function(cb){
		del([pathProdHtmls, pathProdImg, pathProdCss, pathProdJs], cb)
	})

	// Essa task limpa primeiro os diretórios e depois minifica os htmls, remove os comentários, retira os espaços em branco e manda os htmls para a pasta de "prod".
	gulp.task('htmlsProd', ['clean'], function(){
		return gulp.src(pathHtmls, {base: pathDev})
			.pipe(htmlmin({removeComments : true, collapseWhitespace: true}))
			.pipe(gulp.dest(pathProd));
	})

	// Essa task limpa primeiro os diretórios e depois cópia o css de "dev" para "prod".
	gulp.task('cssProd', ['clean'], function(){
		return gulp.src(pathCssFile, {base: pathCss})
			.pipe(gulp.dest(pathProdCss));
	})

	// Essa task limpa primeiro os diretórios e depois cópia as fontes de "dev" para "prod".
	gulp.task('fontProd', ['clean'], function(){
		return gulp.src(pathFontFile, {base: pathFont})
			.pipe(gulp.dest(pathProdFont));
	})

	// Essa task limpa primeiro os diretórios e depois cópia as imagens de "dev" para "prod".
	gulp.task('imgsProd', ['clean'], function(){
		return gulp.src(pathImgFile, {base: pathImg})
			.pipe(gulp.dest(pathProdImg));
	})

	// Essa task limpa primeiro os diretórios e depois cópia e comprimi as imagens de "dev" para "prod".
	gulp.task('optImgsProd', ['clean'], function(){
		return gulp.src(pathImgFile, {base: pathImg})
			.pipe(imagemin({
				progressive: true,
				interlaced: true,
				optimizationLevel: 7,
				svgoPlugins: [{removeViewBox: false}]
			}))
			.pipe(gulp.dest(pathProdImg));
	})

	// Essa task limpa primeiro os diretórios, depois minifica o js e cópia os arquivos .js da pasta "dev\assets\js" de "dev" para "prod".
	gulp.task('appsProd', ['clean'], function(){
		return gulp.src(pathJsFile, {base: pathJs})
			.pipe(uglify({
				compress:{
					sequences     : true,  // Junta declarações consecutivas com ",".
					properties    : true,  // Otimiza propriedades de acesso: a["foo"] → a.foo.
					dead_code     : true,  // Remove códigos inacessíveis.
					drop_console  : true,  // Remove as declarações de "console".
					drop_debugger : true,  // Remove as declarações de "debugger".
					unsafe        : false, // Algumas otimizações inseguras.
					conditionals  : true,  // Otimiza expressões condicionais if.
					comparisons   : true,  // Otimiza comparações.
					evaluate      : true,  // Avalia expressões constantes.
					booleans      : true,  // Otimiza expressões booleanas.
					loops         : true,  // Otimiza loops.
					unused        : true,  // Deleta variáveis e/ou funções não utilizadas.
					hoist_funs    : false, // Iça as declarações de funções.
					hoist_vars    : false, // Iça as declarações de variáveis.
					if_return     : true,  // Otimiza condições if seguidas por return e/ou continue.
					join_vars     : true,  // Junta declarações de variáveis.
					warnings      : true   // Alerta sobre otiizações potencialmente perigosas.
				}
			}))
			.pipe(gulp.dest(pathProdJs));
	})

	// Essa task limpa primeiro os diretórios, depois minifica, preserva os comentários e cópia os arquivos .js da pasta "dev\assets\js\libs" de "dev" para "prod".
	gulp.task('libsProd', ['clean'], function(){
		return gulp.src(pathJsLibsFile, {base: pathJsLibs})
			.pipe(uglify({preserveComments: 'all'}))
			.pipe(gulp.dest(pathProdJsLibs));
	})

	// Essa task limpa primeiro os diretórios, depois cópia os arquivos de audio de "dev" para "prod".
	gulp.task('mediaAudioProd', ['clean'], function(){
		return gulp.src(pathMediaAudioFile, {base: pathMediaAudio})
			.pipe(gulp.dest(pathProdMediaAudio));
	})

	// Essa task limpa primeiro os diretórios, depois cópia os arquivos de video de "dev" para "prod".
	gulp.task('mediaVideoProd', ['clean'], function(){
		return gulp.src(pathMediaVideoFile, {base: pathMediaVideo})
			.pipe(gulp.dest(pathProdMediaVideo));
	})

	// Essa task limpa primeiro os diretórios, depois cópia os pdfs de "dev" para "prod".
	gulp.task('pdfProd', ['clean'], function(){
		return gulp.src(pathPdfFile, {base: pathPdf})
			.pipe(gulp.dest(pathProdPdf));
	})

	// Tasks que chama as configurações setadas no objeto "configBrowserSyncProd" após executar as outras tasks dentro do array.
	gulp.task('browserSyncProd', ['htmlsProd', 'cssProd', 'fontProd', 'imgsProd', 'appsProd', 'libsProd', 'mediaAudioProd', 'mediaVideoProd', 'pdfProd'], function(){
		browserSync(configBrowserSyncProd);
	})

/* ---------- TASKS DE COMPILAÇÃO ---------- */
	gulp.task('default',  ['browserSyncDev', 'watchGulpfile', 'watchHtml', 'watchSass', 'watchLibs', 'watchApps']);
	gulp.task('prod',  ['browserSyncProd']); 