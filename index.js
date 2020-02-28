const PORT = process.env.PORT || 8080,
    db = require('./db'),
    schema = require('./schema'),
    path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    cors = require('cors'),
    gql = require('express-graphql'),
    mongo = require('mongoose'),
    app = express();

//connect to mongodb instance
mongo.connect('mongodb+srv://' + db.user + ':' + db.pass + '@' + db.url + '/' + db.name + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//if development env, set CORS for angular served app
if (process.env.DEV_ENV) {
    console.log('Running in dev mode');
    app.use(cors());
}
//setup graphql and angular client app
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({'extended':'false'}))
    .use(express.static(path.join(__dirname, '/client/dist')))
    .use('/gql', gql({
        schema: schema,
        graphiql: true
    }));

mongo.connection.once('open', () => { console.log('Database connected'); });

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
});
