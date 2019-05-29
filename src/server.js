const express = require('express');
const cors = require('cors');

const { connectDatabase } = require('./database');

const ListController = require('./controllers/list');
const ItemController = require('./controllers/item');


connectDatabase();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/list', ListController);
app.use('/item', ItemController);


app.listen(4000, () => {
  console.log('Listening on localhost:4000...');
});