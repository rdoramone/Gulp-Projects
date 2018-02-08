var fs = require('fs');
var pathTasks = './config/gulp/tasks/';
var tasksWatch = ['browserSyncDev'];
var tasksDev = [];
var tasksProd = [];
var regExpDev = /(gulp.task\('?"?)([a-zA-Z]+Dev)/;
var regExpProd = /(gulp.task\('?"?)([a-zA-Z]+Prod)/;
var regExpWatch = /(gulp.task\('?"?)(watch[a-zA-Z]+)/;

/* Chamando apenas as task a serem utilizadas, verificando os arquivos que estão na pasta task */
fs.readdirSync(pathTasks).forEach((file) => {
    if (file !== 'compass.js') {
        var contentTasks = fs.readFileSync(pathTasks + file,'utf-8');
        var resultDev = regExpDev.exec(contentTasks);
        var resultProd = regExpProd.exec(contentTasks);
        var resultWatch = regExpWatch.exec(contentTasks);

        if (regExpDev.test(contentTasks)) {
            tasksDev.push(resultDev[2]);
        }

        if (regExpProd.test(contentTasks)) {
            tasksProd.push(resultProd[2]);
        }

        if (regExpWatch.test(contentTasks)) {
            tasksWatch.push(resultWatch[2]);
        }

        return require(pathTasks + file);
    }
});

module.exports = {
    tasks: {
        dev: tasksDev,
        prod: tasksProd,
        watch: tasksWatch,
        browserSync: {
            dev: 'browserSyncDev',
            prod: 'browserSyncProd'
        }
    }
}