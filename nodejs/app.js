const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./database');
var studentController = require('./controllers/studentController');
const cors = require('cors');

const port = process.env.PORT || 3000;
var app = express();
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use('/students', studentController);

app.use((request, response, next) => {

    response.header("Access-Control-Allow-Origin", "*");

    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization "
    );

    if(request.method === 'OPTIONS'){

        response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH ');

        return response.status(200).json({});

    }

    next();
});


app.use((request, response, next) => {

   const error = new Error('Not Found');

   error.status = 404;

   next(error);
});

app.use((error, request, response, next) => {

     response.status(error.status || 500);

     response.json({
         error: {
             message: error.message
         }
     });
} );

