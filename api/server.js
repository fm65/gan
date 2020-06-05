require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const routes = require('./routes');

async function bootstrap() {
    await models.sequelize.authenticate();
    await models.sequelize.sync();

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	routes(app);
    app.listen(process.env.PORT, () => console.log(
    `Listening on http://localhost:${
    process.env.PORT}/ (Press CTRL+C to quit)`));
}

bootstrap();
