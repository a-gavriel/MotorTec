const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyparser = require('body-parser');

const app = express();

const customerRoutes = require('./routes/customer');

// configuración, configura modulos necesarios para el programa, como express
app.set('port', process.env.PORT || 3000);


app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(myConnection(mysql, {
	host: 'localhost',
	user: 'root',
	password: '',
	port: 3306,
	database: 'MotorTEC_db',
	multipleStatments: true
}, 'single'));
app.use(express.urlencoded({extended: false}));

// rutas, define las rutas a las cuales el cliente va a acceder para pedir la información
app.use('/', customerRoutes);

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});
