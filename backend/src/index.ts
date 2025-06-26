//DEPENDENCIAS NECESARIAS

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import rutasUsuario from './routes/usuario/rutasUsuario'
import rutasEventos from './routes/eventos/rutasEventos'
import rutasAdmin from './routes/admin/rutasAdmin'
import rutasDEV from './DEV/datosdb'

//CONFIGURAMOS VARIABLES DE ENTORNO PARA CONECTARNOS A LA DB Y OTRAS CONFIGURACIONES
dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

//CORS PARA RUTAS Y EXPRESS.JSON PARA DECIR QUE LOS DATOS QUE RECIBIMOS SON EN FORMATO JSON

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

//RUTAS DE REGISTRO Y LOGIN
app.use("/api/usuario", rutasUsuario)

app.use("/api/admin", rutasAdmin)

app.use("/api/eventos", rutasEventos) //en proceso

app.use("/dev", rutasDEV)

//RUTA DE PRUEBA PARA VERIFICAR QUE EL SERVIDOR ESTÁ CORRIENDO
// app.get("/api", (_req, res) => {
//     res.json({message: "API funcionando correctamente oh fajis"})
// })



//INICIAMOS EL SERVIDOR
app.listen(PORT, () => {
    console.log(`SERVER CORRIENDO EN http://localhost:${PORT}`)
})