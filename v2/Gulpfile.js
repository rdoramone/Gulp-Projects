var browserSync = require('browser-sync'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat'),
	del = require('del'),
	gulp = require('gulp'),
	htmlhint = require('gulp-htmlhint'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	jshint = require('gulp-jshint'),
	notify = require('gulp-notify'),
	reload = browserSync.reload,
	uglify = require('gulp-uglify');

/* Caminhos do ambiente de Desenvolvimento. */
var pathSource = 'source',
	pathSourceHtml = pathSource + '/html',
	pathSourceHtmlFiles = pathSourceHtml + '/*.html',
	pathSourceJs = pathSource + '/js',
	pathSourceJsApp = pathSourceJs + '/application',
	pathSourceJsAppFiles = pathSourceJsApp + '/*.js',
	pathSourceJsLibs = pathSourceJs + '/libs',
	pathSourceJsLibsFiles = pathSourceJsLibs + '/*.js',
	pathSourceJsUtils = pathSourceJs + '/utils',
	pathSourceJsUtilsFiles = pathSourceJsUtils + '/*.js',
	pathSourceSass = pathSource + '/sass',
	pathSourceSassFiles = pathSourceSass + '/**/*.scss';

/* Caminhos do ambiente de HML. Aqui é pra onde vai os arquivos que foram compilados. */
var pathPublic = 'public',
	pathPublicHtml = pathPublic + '/*.html',
	pathPublicAssets = pathPublic + '/assets',
	pathPublicCss = pathPublicAssets + '/css'
	pathPublicCssFiles = pathPublicCss + '/*.css'
	pathPublicFonts = pathPublicAssets + '/fonts',
	pathPublicFontsFiles = pathPublicFonts + '/*.{eot,svg,ttf,woff}',
	pathPublicImg = pathPublicAssets + '/img',
	pathPublicImgFiles = pathPublicImg + '/{**/*.{jpg,png,gif,svg}, *.{jpg,png,gif,svg}}',
	pathPublicImgSprites = pathPublicImg + '/sprite',
	pathPublicImgSpritesFiles = pathPublicImgSprites + '/*.{jpg,png,gif,svg}',
	pathPublicJs = pathPublicAssets + '/js',
	pathPublicJsFiles = pathPublicJs + '/*.js',
	pathPublicJsLibs = pathPublicJs + '/libs',
	pathPublicJsLibsFiles = pathPublicJsLibs + '/*.js';

/* Caminhos do ambiente de Produção */
var pathProd = 'prod',
	pathProdAssets = pathProd + '/assets',
	pathProdCss = pathProdAssets + '/css',
	pathProdFonts = pathProdAssets + '/fonts',
	pathProdImg = pathProdAssets + '/img',
	pathProdJs = pathProdAssets + '/js',
	pathProdJsLibs = pathProdJs + '/libs';

var configBrowserSyncDev = {
	browser: 'chrome',
	logPrefix : 'DEV', 
	notify: true,
	open: true,
	port: 3000,
	server: {
		baseDir: pathPublic,
		index: 'index.html'
	}
}

var configBrowserSyncProd = {
	browser: 'chrome',
	logPrefix : 'PROD',
	notify: true,
	open: true,
	port: 9000,
	server: {
		baseDir: pathProd,
		index: 'index.html'
	}
}

/* ---------- ESTRUTURA DE DEV ---------- */
	gulp.task('gulpfile', function(){
		return gulp.src('./Gulpfile.js')
			.pipe(reload({stream: true}));
	})

	gulp.task('htmlsDev', function(){
		return gulp.src(pathSourceHtmlFiles)
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
			.pipe(htmlhint.reporter())
		    .pipe(htmlhint.failReporter())
			.pipe(gulp.dest(pathPublic))
			.pipe(reload({stream: true}));
	})

	gulp.task('sassDev', function(){
		return gulp.src(pathSourceSassFiles)
			.pipe(compass({
				css: pathPublicCss,
				font: pathPublicFonts,
				image: pathPublicImg,
				sass: pathSourceSass,
				comments: false,
				logging: true,
				relative: true,
				style: 'compressed' // Opções de estilo: nested, expanded, compact, or compressed.
			}))
		    .pipe(gulp.dest(pathPublicCss))
			.pipe(reload({stream: true}));
	})

	gulp.task('appsDev', function(){
		return gulp.src(pathSourceJsAppFiles, {base: pathSourceJsApp})
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail'))
			.pipe(concat('application.js'))
			.pipe(gulp.dest(pathPublicJs))
			.pipe(reload({stream: true}));
	})

	gulp.task('libsDev', function(){
		return gulp.src(pathSourceJsLibsFiles, {base: pathSourceJsLibs})
			.pipe(concat('plugins.js'))
			.pipe(gulp.dest(pathPublicJsLibs))
			.pipe(reload({stream: true}));
	})

	gulp.task('browserSyncDev', ['libsDev', 'appsDev', 'sassDev', 'htmlsDev'], function(){
		browserSync(configBrowserSyncDev);
	})

	gulp.task('watchGulpfile', function(){
		gulp.watch('Gulpfile.js', ['gulpfile']);
	})

	gulp.task('watchHtml', function(){
		gulp.watch(pathSourceHtmlFiles, ['htmlsDev']);
	})

	gulp.task('watchSass', function(){
		gulp.watch(pathSourceSassFiles, ['sassDev']);
	})

	gulp.task('watchLibs', function(){
		gulp.watch(pathSourceJsLibsFiles, ['libsDev']);
	})

	gulp.task('watchApps', function(){
		gulp.watch(pathSourceJsAppFiles, ['appsDev']);
	})

/* ---------- ESTRUTURA DE PROD ---------- */
	gulp.task('htmlsProd', function(){
		return gulp.src(pathPublicHtml, {base: pathPublic})
			.pipe(htmlmin({removeComments : true, collapseWhitespace: true}))
			.pipe(gulp.dest(pathProd));
	})

	gulp.task('cssProd', function(){
		return gulp.src(pathPublicCssFiles, {base: pathPublicCss})
			.pipe(gulp.dest(pathProdCss));
	})

	gulp.task('fontProd', function(){
		return gulp.src(pathPublicFontsFiles, {base: pathPublicFonts})
			.pipe(gulp.dest(pathProdFonts));
	})

	gulp.task('imgsProd', function(){
		return gulp.src(pathPublicImgFiles, {base: pathPublicImg})
			.pipe(imagemin({
				progressive: true,
				interlaced: true,
				optimizationLevel: 7,
				svgoPlugins: [{removeViewBox: false}]
			}))
			.pipe(gulp.dest(pathProdImg));
	})

	gulp.task('appsProd', function(){
		return gulp.src(pathPublicJsFiles, {base: pathPublicJs})
			.pipe(uglify({
				mangle: true,
				output: {
					indent_start  : 0,     	// Iniciar recuo em cada linha (somente quando 'beautify')
					indent_level  : 0,     	// Nível de recuo (somente quando 'beautify')
					quote_keys    : false, 	// Citação todas as chaves em literais de objeto?
					space_colon   : false,  // Adiciona um espaço após sinais de ':'?
					ascii_only    : false, 	// Saída ASCII-safe? (codifica caracteres Unicode como ASCII)
					inline_script : false, 	// Escapar "</ script"?
					width         : 100,    // Informativo de largura máxima da linha (para saída embelezada)
					max_line_len  : 32000, 	// Comprimento máximo da linha (para saída de não-embelezado)
					beautify      : false, 	// Embelezar saída?
					source_map    : null,  	// Saída do mapa de origem
					bracketize    : false, 	// Utilizar suportes de cada vez?
					comments      : false, 	// Comentários de saída?
					semicolons    : true,  	// Usar ponto e vírgula para declarações separadas? (caso contrário, novas linhas)
				},
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
					warnings      : true   // Alerta sobre otimizações potencialmente perigosas.
				},
				preserveComments: false
			}))
			.pipe(gulp.dest(pathProdJs));
	})

	gulp.task('libsProd', function(){
		return gulp.src(pathPublicJsLibsFiles, {base: pathPublicJsLibs})
			.pipe(uglify({
				preserveComments: false
			}))
			.pipe(gulp.dest(pathProdJsLibs));
	})

	gulp.task('browserSyncProd', ['htmlsProd', 'cssProd', 'fontProd', 'imgsProd', 'appsProd', 'libsProd'], function(){
		browserSync(configBrowserSyncProd);
	})

/* ---------- TASKS DE COMPILAÇÃO ---------- */
	gulp.task('default',  ['browserSyncDev', 'watchGulpfile', 'watchHtml', 'watchSass', 'watchLibs', 'watchApps']);
	gulp.task('prod',  ['browserSyncProd']); 