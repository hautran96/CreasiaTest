const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

const users = [
    {
        "username": "hautran",
        "passowrd": "123456",
        "cccd": "096096002805",
        "name": "Trần Minh Hậu",
        "image": "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
        "id": "123456789",
        "position": "1",
        "gender": "1",
        "birthday": "15/01/1997",
        "email": "hautran96.itcm@gmail.com",
        "phoneNumber": "0777451578",
        "place": "Cục cảnh sát",
        "dateCccd": "21/12/2021"
    }
];
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    try {
        const { username } = req.body;
        const user = users.find(user => user.username === username);
        console.log('user: ', user)
        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send("OK")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/profile', async (req, res) => {
    try {
        const { username } = req.body;
        const user = users.find(user => user.username === username);
        console.log('user: ', user)
        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/edit', async (req, res) => {
    try {
        const { username, passowrd, cccd, image, id, position, gender, birthday, phoneNumber, dateCccd, place, name } = req.body;

        users[0].username = username
        users[0].passowrd = passowrd
        users[0].cccd = cccd
        users[0].gender = gender
        users[0].birthday = birthday
        users[0].phoneNumber = phoneNumber
        users[0].dateCccd = dateCccd
        users[0].place = place
        users[0].name = name
        users[0].image = image
        users[0].position = position
        users[0].id = id

        res.status(200).json(users)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
