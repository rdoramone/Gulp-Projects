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
	plumber = require('gulp-plumber'),
	pngquant = require('imagemin-pngquant'),
	reload = browserSync.reload,
	uglify = require('gulp-uglify');

var path = {
	/* Caminhos do ambiente de Desenvolvimento. */
	source: {
		root: 'source',
		html: 'source/html',
		js: {
			app: 'source/assets/js/application',
			libs: 'source/assets/js/libs',
			utils: 'source/assets/js/utils',
		},
		sass: 'source/assets/sass'
	},
	/* Caminhos do ambiente de HML. Aqui é pra onde vai os arquivos que foram compilados. */
	public: {
		root: 'public',
		html: 'public/*.html',
		assets: 'public/assets',
		css: 'public/assets/css',
		fonts: 'public/assets/fonts',
		img: 'public/assets/img',
		js: {
			app: 'public/assets/js',
			libs: 'public/assets/js/libs',
			utils: 'public/assets/js/utils'
		}
	},
	/* Caminhos do ambiente de Distribuição */
	dist: {
		root: 'dist',
		assets: 'dist/assets',
		css: 'dist/assets/css',
		fonts: 'dist/assets/fonts',
		img: 'dist/assets/img',
		js: {
			app: 'dist/assets/js',
			libs: 'dist/assets/js/libs'
		}
	}
};

var configBrowserSyncDev = {
	browser: 'chrome',
	logPrefix : 'DEV', 
	notify: true,
	open: true,
	port: 3000,
	server: {
		baseDir: path.public.root,
		index: 'index.html'
	}
}

var configBrowserSyncDist = {
	browser: 'chrome',
	logPrefix : 'DIST',
	notify: true,
	open: true,
	port: 9000,
	server: {
		baseDir: path.dist.root,
		index: 'index.html'
	}
}

/* ---------- ESTRUTURA DE DEV ---------- */
	gulp.task('gulpfile', function(){
		return gulp.src('./Gulpfile.js')
			.pipe(reload({stream: true}));
	})

	gulp.task('htmlsDev', function(){
		return gulp.src(path.source.html + '/*.html')
			.pipe(plumber())
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
			.pipe(gulp.dest(path.public.root))
			.pipe(reload({stream: true}));
	})

	gulp.task('sassDev', function(){
		return gulp.src(path.source.sass + '/**/*.scss')
			.pipe(plumber())
			.pipe(compass({
				css: path.public.css,
				font: path.public.fonts,
				image: path.public.img,
				sass: path.source.sass,
				comments: false,
				logging: true,
				relative: true,
				style: 'compressed' // Opções de estilo: nested, expanded, compact, or compressed.
			}))
		    .pipe(gulp.dest(path.public.css))
			.pipe(reload({stream: true}));
	})

	gulp.task('appsDev', function(){
		return gulp.src(path.source.js.app + '/*.js', {base: path.source.js.app})
			.pipe(plumber())
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail'))
			.pipe(concat('application.js'))
			.pipe(gulp.dest(path.public.js.app))
			.pipe(reload({stream: true}));
	})

	gulp.task('libsDev', function(){
		return gulp.src(path.source.js.libs + '/*.js', {base: path.source.js.libs})
			.pipe(plumber())
			.pipe(concat('plugins.js'))
			.pipe(gulp.dest(path.public.js.libs))
			.pipe(reload({stream: true}));
	})

	gulp.task('browserSyncDev', ['libsDev', 'appsDev', 'sassDev', 'htmlsDev'], function(){
		browserSync(configBrowserSyncDev);
	})

	gulp.task('watchGulpfile', function(){
		gulp.watch('Gulpfile.js', ['gulpfile']);
	})

	gulp.task('watchHtml', function(){
		gulp.watch(path.source.html + '/*.html', ['htmlsDev']);
	})

	gulp.task('watchSass', function(){
		gulp.watch(path.source.sass + '/**/*.scss', ['sassDev']);
	})

	gulp.task('watchLibs', function(){
		gulp.watch(path.source.js.libs + '/*.js', ['libsDev']);
	})

	gulp.task('watchApps', function(){
		gulp.watch(path.source.js.app + '/*.js', ['appsDev']);
	})

/* ---------- ESTRUTURA DE DIST ---------- */
	gulp.task('htmlsDist', function(){
		return gulp.src(path.public.html, {base: path.public.root})
			.pipe(plumber())
			.pipe(htmlmin({removeComments : true, collapseWhitespace: true}))
			.pipe(gulp.dest(path.dist.root));
	})

	gulp.task('cssDist', function(){
		return gulp.src(path.public.css + '/*.css', {base: path.public.css})
			.pipe(plumber())
			.pipe(gulp.dest(path.dist.css));
	})

	gulp.task('fontDist', function(){
		return gulp.src(path.public.fonts + '/*.{eot,svg,ttf,woff}', {base: path.public.fonts})
			.pipe(plumber())
			.pipe(gulp.dest(path.dist.fonts));
	})

	gulp.task('imgsDist', function(){
		return gulp.src(path.public.img + '/{**/*.{jpg,png,gif,svg}, *.{jpg,png,gif,svg}}', {base: path.public.img})
			.pipe(plumber())
			.pipe(imagemin({
				interlaced: true,
				optimizationLevel: 7,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant({
					quality: '65-80',
					speed: 1
				})]
			}))
			.pipe(gulp.dest(path.dist.img));
	})

	gulp.task('appsDist', function(){
		return gulp.src(path.public.js.app + '/*.js', {base: path.public.js.app})
			.pipe(plumber())
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
			.pipe(gulp.dest(path.dist.js.app));
	})

	gulp.task('libsDist', function(){
		return gulp.src(path.public.js.libs + '/*.js', {base: path.public.js.libs})
			.pipe(plumber())
			.pipe(uglify({
				preserveComments: false
			}))
			.pipe(gulp.dest(path.dist.js.libs));
	})

	gulp.task('browserSyncDist', ['htmlsDist', 'cssDist', 'fontDist', 'imgsDist', 'appsDist', 'libsDist'], function(){
		browserSync(configBrowserSyncDist);
	})

/* ---------- TASKS DE COMPILAÇÃO ---------- */
	gulp.task('default', ['browserSyncDev', 'watchGulpfile', 'watchHtml', 'watchSass', 'watchLibs', 'watchApps']);
	gulp.task('dist', ['browserSyncDist']); 