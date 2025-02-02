// src/server.ts
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

// Обработка подключения
io.on('connection', (socket) => {
    console.log('A user connected')

    // Обработка получения сообщения
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg)
        io.emit('chat message', msg) // Отправка сообщения всем подключенным клиентам
    })

    // Обработка отключения
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

// Настройка маршрута
app.get('/', (req, res) => {
    res.send('Chat server is running!')
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
