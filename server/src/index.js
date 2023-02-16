require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = require('./routers/UserRouter')

const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Escutando na porta  ${port}`);
});

app.use('/user', UserRouter);
