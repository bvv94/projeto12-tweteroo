import express from 'express';
import cors from 'cors';

//Crição do App Servidor
const app = express();

//Configurações
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

//Inicio Programa

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    const newUser = {
        id: users.length + 1,
        username,
        avatar,
        views: 0,
    }

    users.push(newUser);
    res.send("OK");

})

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;

    const newTweet = {
        id: tweets.length + 1,
        username,
        tweet,
        views: 0,
    }

    tweets.push(newTweet);
    res.send("OK");

})

app.get('/tweets', (req, res) => {
    for (i = 0; i < 10; i++) {
        res.send(`${tweets[i]}`)
    }
})



const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));