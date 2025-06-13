//DEPENDENCIAS NECESARIAS

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rutasAut from './routes/rutasAut'
import rutasEventos from './routes/rutasEventos'

//CONFIGURAMOS VARIABLES DE ENTORNO PARA CONECTARNOS A LA DB Y OTRAS CONFIGURACIONES
dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

//CORS PARA RUTAS Y EXPRESS.JSON PARA DECIR QUE LOS DATOS QUE RECIBIMOS SON EN FORMATO JSON
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

//RUTAS DE REGISTRO Y LOGIN
app.use("/aut", rutasAut)

app.use("/api", rutasEventos) //en proceso

//RUTA DE PRUEBA PARA VERIFICAR QUE EL SERVIDOR ESTÁ CORRIENDO
// app.get("/api", (_req, res) => {
//     res.json({message: "API funcionando correctamente oh fajis"})
// })



//INICIAMOS EL SERVIDOR
app.listen(PORT, () => {
    console.log(`SERVER CORRIENDO EN http://localhost:${PORT}`)
})