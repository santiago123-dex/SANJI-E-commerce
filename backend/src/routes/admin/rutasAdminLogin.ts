import {Router, Response, Request} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {PrismaClient} from '@prisma/client'


const router = Router()
const prisma = new PrismaClient()

router.post("/login", async(req: Request, res: Response) => {
    const {email_admin, password_admin} = req.body
    if(!email_admin || !password_admin){
        res.status(400).json({message: "Faltan datos"})
        return
    }

    try{
        const admin = await prisma.administradores.findUnique({where: {email_admin}})
        if(!admin){
            res.status(404).json({message: "Email no válido"})
            return
        }

        const validarPassword = await bcrypt.compare(password_admin, admin.password_admin)
        if(!validarPassword){
            res.status(401).json({message: "Contraseña incorrecta"})
        }

        const token = jwt.sign(
            {
                id_admin: admin.id_admin,
                email_admin: admin.email_admin,
                tipo: 'admin',
            },
            process.env.JWT_SECRET || "Esta es la otra clave secreta que pongo por si acaso pero da igual solo iusa la variable de entorno",
            {
                expiresIn: "1h",
            },
        )

        res.status(200).json({message: "Login exitoso", token})
    }catch(error){
        res.status(500).json({message: "Error al iniciar sesión", error})
    }
})


export default router