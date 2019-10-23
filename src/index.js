const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const { User } = require('../models');


const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname + '/views/index.html'))
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