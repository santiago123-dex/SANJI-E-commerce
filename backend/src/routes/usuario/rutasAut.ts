//DEPENDENCIAS NECESARIAS
import {Router, Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router() //ESTE CODÍGO ES PARA DECIR QUE LAS RUTAS SE VAN A GUARDAR EN router
const prisma = new PrismaClient() //ESTO ES PARA INICIAR LA CONEXIÓN A LA BASE DE DATOS CON PRISMA


//ESTE CÓDIGO ES PARA REGISTRAR UN NUEVO USUARIO
router.post("/registro", async (req: Request, res: Response) => { //ESTO DE ACÁ ES LA RUTA Y EL MÉTODO HTTP QUE SE VA A USAR
    const {nombre_usuario, apellido_usuario, email_usuario, password_usuario, telefono,} = req.body //OBTENGO LOS DATOS QUE ME ENVÍAN EN FORMATO JSON

    // Validar que los campos obligatorios no estén vacíos
    if(!nombre_usuario || !apellido_usuario || !email_usuario || !password_usuario){
        res.status(400).json({message: "Faltan campos obligatorios: nombre, email o password"})
        return
    }

    try{
        // Verificar si el usuario ya existe
        const usuarioExistente = await prisma.usuarios.findUnique({where: { email_usuario },})

        if(usuarioExistente){
            res.status(400).json({message: "Ya existe un usuario con ese email"})
            return
        }

        // Encriptar la contraseña
        const pwEncriptado = await bcrypt.hash(password_usuario, 10)
        
        // Crear el nuevo usuario
        const nuevoUsuario = await prisma.usuarios.create({
            data: {
                nombre_usuario,
                apellido_usuario,
                email_usuario,
                password_usuario: pwEncriptado,
                telefono: telefono || null,
            },
        })

        res.status(201).json({message: "Usuario registrado exitosamente", nuevoUsuario}) //ESTO ES LO QUE DEVUELVE EL SERVER COMO RESPUESTA AL CLIENTE

    }catch(error){
        res.status(500).json({message: "Error al registrar el usuario", error})
    }

})


//ESTE CÓDIGO ES PARA INICIAR SESIÓN CON UN USUARIO YA REGISTRADO
router.post("/login", async (req: Request, res: Response) => {
    const {email_usuario, password_usuario} = req.body

    if(!email_usuario || !password_usuario){
        res.status(400).json({message: "Faltan campos obligatorios: email o password"})
        return
    }

    try{
        const usuario = await prisma.usuarios.findUnique({where: { email_usuario}})//BUSCA UN USARIO CON ESE EMAIL
        if(!usuario){
            res.status(404).json({message: "Usuario no encontrado"})
            return
        }

        const passwordValido = await bcrypt.compare(password_usuario, usuario.password_usuario) //COMPARA LA CONTRASEÑA INTRODUCIDA Y LA DE LA DB
        if(!passwordValido){
            res.status(401).json({message: "Contraseña incorrecta"})
            return
        }

        const token = jwt.sign( //GENERA EL TOKEN PARA EL USUARIO
            {
                id_usuario: usuario.id_usuario,
                email_usuario: usuario.email_usuario,
            },
            process.env.JWT_SECRET || "esta es la otra clave secreta que se usa para firmar el token",
            {
                expiresIn: "1h",
            },
        )

        res.status(200).json({message: "Inicio de sesión exitoso", token}) //DEVUELVE EL TOKEN PARA PODER ACCEDER A LAS DEMÁS PÁGINAS QUE REQUIEREN AUTENTICACIÓN
    }catch(error){
        res.status(500).json({message: "Error al iniciar sesión", error})
    }
})

export default router //EXPORTA EL ROUTER PARA QUE PUEDA SER USADO EN OTRAS PARTES DE LA APLICACIÓN
