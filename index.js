//Importando express
const express = require('express');
//Importando helmet
const helmet = require('helmet');

const app = express();

//Importando la configuración con las variables de entorno
const { config } = require('./config/index');

//Importando el archivo de las rutas
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');
const authApi = require('./routes/auth');

//Importando middleware de errores
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers.js');

//Importando middleware de error notFound
const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

//Body parser
app.use(express.json());
app.use(helmet());

//Enviamos a la función moviesApi la app de express (rutas)
authApi(app);
moviesApi(app);
userMoviesApi(app);

//Capturando error 404 despues de pasar por todas las rutas
app.use(notFoundHandler);

//Los middlewares manejadores de errores, siempre deben ir al final de las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


//Puerto que escucha el servidor, lo traemos desde el archivo config/index
app.listen(config.port, () => {
    const debug = require('debug')('app:server');
    debug(`Listening http://localhost:${config.port}`);
});