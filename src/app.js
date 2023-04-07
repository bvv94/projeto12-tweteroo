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

    if (!username || !avatar || (typeof (username) === 'string') || (typeof (avatar) === 'string')) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    const newUser = {
        id: users.length + 1,
        username,
        avatar,
        views: 0,
    }

    users.push(newUser);
    res.status(201).send("OK");

})

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    const existe = false;

    if (!username || !tweet || (typeof (username) === 'string') || (typeof (tweet) === 'string')) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    for (i = 0; i < users.length; i++) {
        if (users.username === username) {
            existe = true;
        }
    }

    if (!existe) {
        return res.send("UNAUTHORIZED")
    }

    const newTweet = {
        id: tweets.length + 1,
        username,
        tweet,
        views: 0,
    }

    tweets.push(newTweet);
    res.status(201).send("OK");

})

app.get('/tweets', (req, res) => {
    for (i = 0; i < 10; i++) {
        res.send(`${tweets[i]}`);
    }

    res.status(200);
})



const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));