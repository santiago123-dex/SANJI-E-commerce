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

const allowedOrigins = [
  'http://localhost:5173',
  'https://sanji-e-commerce-8ufm.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Si no hay origin (por ejemplo, Postman), permite
      if (!origin) return callback(null, true);

      // Permite tu dominio principal de producción
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Permite cualquier subdominio de Vercel
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }

      // Si no coincide, bloquea
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);

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