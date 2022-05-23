// config inicial
import express, { urlencoded, json } from 'express'
import mongoose from 'mongoose'
import personRouter from './routes/personRoutes.js'
import 'dotenv/config'

// inicializando a aplicacao
const app = express()

// config para ler json / middleware
app.use(
    urlencoded({
        extended: true
    })
)

app.use(json())

// rotas da API
app.use('/person', personRouter)

// rota inicial / endpoint teste
app.get('/', (req, res) => {
    res.json({message: 'API Rest'})
})

// entregar a porta
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@apicluster.irkef.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conectamos ao MongoDB")
    app.listen(process.env.PORT)
})
.catch((err) => console.log(err))