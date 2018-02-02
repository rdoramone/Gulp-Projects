var gulp = require('gulp'),
    config = require('../config.js'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plugins = require('gulp-load-plugins')();

gulp.task('appDev', function() {
    return gulp.src(config.path.source.js.app + '/*.js', { base: config.path.source.js.app })
    .pipe(plugins.plumber())
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(config.path.public.js.app))
    .pipe(reload({ stream: true }));
});

gulp.task('appProd', function() {
    return gulp.src(config.path.public.js.app + '/*.js', { base: config.path.public.js.app })
        .pipe(plugins.plumber())
        .pipe(plugins.uglify({
            mangle: true,
            output: {
                indent_start: 0, // Iniciar recuo em cada linha (somente quando 'beautify')
                indent_level: 0, // Nível de recuo (somente quando 'beautify')
                quote_keys: false, // Citação todas as chaves em literais de objeto?
                space_colon: false, // Adiciona um espaço após sinais de ':'?
                ascii_only: false, // Saída ASCII-safe? (codifica caracteres Unicode como ASCII)
                inline_script: false, // Escapar "</ script"?
                width: 100, // Informativo de largura máxima da linha (para saída embelezada)
                max_line_len: 32000, // Comprimento máximo da linha (para saída de não-embelezado)
                beautify: false, // Embelezar saída?
                source_map: null, // Saída do mapa de origem
                bracketize: false, // Utilizar suportes de cada vez?
                comments: false, // Comentários de saída?
                semicolons: true, // Usar ponto e vírgula para declarações separadas? (caso contrário, novas linhas)
            },
            compress: {
                sequences: true, // Junta declarações consecutivas com ",".
                properties: true, // Otimiza propriedades de acesso: a["foo"] → a.foo.
                dead_code: true, // Remove códigos inacessíveis.
                drop_console: true, // Remove as declarações de "console".
                drop_debugger: true, // Remove as declarações de "debugger".
                unsafe: false, // Algumas otimizações inseguras.
                conditionals: true, // Otimiza expressões condicionais if.
                comparisons: true, // Otimiza comparações.
                evaluate: true, // Avalia expressões constantes.
                booleans: true, // Otimiza expressões booleanas.
                loops: true, // Otimiza loops.
                unused: true, // Deleta variáveis e/ou funções não utilizadas.
                hoist_funs: false, // Iça as declarações de funções.
                hoist_vars: false, // Iça as declarações de variáveis.
                if_return: true, // Otimiza condições if seguidas por return e/ou continue.
                join_vars: true, // Junta declarações de variáveis.
                warnings: true // Alerta sobre otimizações potencialmente perigosas.
            },
            preserveComments: false
        }))
        .pipe(gulp.dest(config.path.dist.js.app));
});

gulp.task('watchApp', function() {
    gulp.watch(config.path.source.js.app + '/*.js', ['appDev'])
});