import express from 'express';
import cors from 'cors';

//Crição do App Servidor
const app = express();

//Configurações
app.use (express.json());
app.use (cors());

//Inicio Programa




const PORT = 5000;
app.listen (PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`));