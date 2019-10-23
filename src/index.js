const express = require('express')
const path = require('path')
const fs = require('fs');
const socketio = require('socket.io')
const http = require('http')
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const { User } = require('../models');

const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    var content = fs.readFileSync(path.join(__dirname + '/views/index.html'), 'utf8')
        .replace(/process.env.BASE_URL/g, "'" + process.env.BASE_URL + "'")

    return res.send(content)
})

app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body)
    io.emit('new_user', user)
    return res.send("foi criado, parça")
})

app.get('/api/users', async (req, res) => {
    return res.json(await User.findAll({ order: [['id', 'DESC'],] }))
})

const port = parseInt(process.env.PORT, 10) || 3333;

server.listen(port)