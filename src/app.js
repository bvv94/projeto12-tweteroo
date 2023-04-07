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

    if (typeof (username) !== 'string' || typeof (avatar) !== 'string' || isNaN(!username) || isNaN(!avatar)) {
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
    const limit = parseInt(req.query.limit)

    if (!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    if (typeof (username) !== 'string' || typeof (tweet) !== 'string' || isNaN(!username) || isNaN(!tweet)) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    const existe = users.find((user) => {
        return user.username === username;
    })

    if (!existe) {
        return res.send("UNAUTHORIZED")
    }

    console.log(`${users[0].avatar} linha 51`)
    // console.log(users)

    const addAvatar = users.find((user) => {
        if (user.username === username) {
            console.log(`Linha 56: ${user.avatar}`)
            return true;
        }
    })
    console.log(`${addAvatar} linha 61`)
    const avatar = addAvatar ? addAvatar.avatar : '';

    const newTweet = {
        id: tweets.length + 1,
        username,
        avatar,
        tweet,
        views: 0,
    }

    tweets.push(newTweet);
    res.status(201).send("OK");

})

app.get('/tweets', (req, res) => {

    if (users.length < 10) {
        res.status(200).send(tweets);
        return
    }
    else {
        for (let i = 0; i < 10; i++) {
            res.send(tweets[i]);
        }
        return
    }

})



const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));