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

    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios!")
        return
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

    if (!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    const existe = users.find((user) => {
        return user.username === username;
    })

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

    res.status(200).send(tweets);
})



const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));