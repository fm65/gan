require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const routes = require('./routes');

async function bootstrap() {
    await models.sequelize.authenticate();
    await models.sequelize.sync();

    const app = express();
	  
	  // Add headers
  	app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
	routes(app);
    app.listen(process.env.PORT, () => console.log(
    `Listening on http://localhost:${
    process.env.PORT}/ (Press CTRL+C to quit)`));
}

/*function initial() {
  models.Role.create({
    id: 1,
    name: "admin"
  });
 
  models.Role.create({
    id: 2,
    name: "user"
  });
 
  models.Role.create({
    id: 3,
    name: "moderator"
  });
}*/

bootstrap();
