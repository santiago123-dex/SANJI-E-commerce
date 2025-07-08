//DEPENDENCIAS NECESARIAS

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import rutasUsuario from './routes/usuario/rutasUsuario'
import rutasEventos from './routes/eventos/rutasEventos'
import rutasAdmin from './routes/admin/rutasAdmin'

//CONFIGURAMOS VARIABLES DE ENTORNO PARA CONECTARNOS A LA DB Y OTRAS CONFIGURACIONES
dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

//CORS PARA RUTAS Y EXPRESS.JSON PARA DECIR QUE LOS DATOS QUE RECIBIMOS SON EN FORMATO JSON

const allowedOrigins =
    process.env.NODE_ENV === 'production' ? ['https://sanji-e-commerce-njcx.vercel.app'] : ['http://localhost:5173']

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

//RUTAS DE REGISTRO Y LOGIN
app.use("/api/usuario", rutasUsuario)

app.use("/api/admin", rutasAdmin)

app.use("/api/eventos", rutasEventos) //en proceso

//RUTA DE PRUEBA PARA VERIFICAR QUE EL SERVIDOR ESTÁ CORRIENDO
// app.get("/api", (_req, res) => {
//     res.json({message: "API funcionando correctamente oh fajis"})
// })



//INICIAMOS EL SERVIDOR
app.listen(PORT, () => {
    console.log(`SERVER CORRIENDO EN http://localhost:${PORT}`)
})