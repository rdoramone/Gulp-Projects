var pathTasks = './config/gulp/tasks/';

/* Chamando apenas as task a serem utilizadas, uma a uma */
// require(pathTasks + 'app');
// require(pathTasks + 'build');
// require(pathTasks + 'fonts');
// require(pathTasks + 'html');
// require(pathTasks + 'image');
// require(pathTasks + 'libs');
// require(pathTasks + 'sass');
// require(pathTasks + 'utils');

/* Chamando apenas as task a serem utilizadas, verificando os arquivos que estão na pasta task */
require('fs').readdirSync(pathTasks).forEach((file) => {
        if (file !== 'compass.js') 
            return require(pathTasks + file);
});