module.exports = {
    path: {
        /* Caminhos do ambiente de Desenvolvimento. */
        source: {
            root: "source",
            html: "source/html",
            js: {
                app: "source/assets/js/application",
                libs: "source/assets/js/libs",
                utils: "source/assets/js/utils"
            },
            sass: "source/assets/sass"
        },
        /* Caminhos do ambiente de HML. Aqui é pra onde vai os arquivos que foram compilados. */
        public: {
            root: "public",
            html: "public/*.html",
            assets: "public/assets",
            css: "public/assets/css",
            fonts: "public/assets/fonts",
            img: "public/assets/img",
            js: {
                app: "public/assets/js",
                libs: "public/assets/js/libs",
                utils: "public/assets/js/utils"
            }
        },
        /* Caminhos do ambiente de Distribuição */
        dist: {
            root: "dist",
            assets: "dist/assets",
            css: "dist/assets/css",
            fonts: "dist/assets/fonts",
            img: "dist/assets/img",
            js: {
                app: "dist/assets/js",
                libs: "dist/assets/js/libs"
            }
        }
    },
    /* Configurações do Browser Sync */
    browserSync: {
        dev: {
            browser: "chrome",
            logPrefix : "DEV", 
            notify: true,
            open: true,
            port: 3000,
            server: {
                baseDir: "public",
                index: "index.html"
            }
        },
        prod: {
            browser: "chrome",
            logPrefix : "PROD",
            notify: true,
            open: true,
            port: 9000,
            server: {
                baseDir: "dist",
                index: "index.html"
            }
        }
    }
};
