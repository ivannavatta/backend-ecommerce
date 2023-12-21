const express = require('express');
const handlebars = require('express-handlebars')
const { port } = require('./configs/server.config');
const { Server } = require('socket.io')
const router = require('./router');

const products = []

const app = express()


app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))

app.engine('handlebars', handlebars.engine())

app.set('views', process.cwd() + '/src/views')

router(app)

const httpServer = app.listen(port, () => {
    console.log(`server running at ${port}`);
})

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log('id:', socket.id);

    socket.on('addProduct', data => {
       products.push(data);

       io.emit('messageProducts', products)
    })

    

   
})

