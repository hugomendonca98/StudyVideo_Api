import './typeorm';
import 'express-async-errors';

import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (request, response) => {
  return response.json({ message: 'olá' });
});

app.listen(3333, () => console.log('rodando na porta 3333'));
