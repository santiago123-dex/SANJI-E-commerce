import { Request, Response} from "express"
import * as adminServices from '../services/adminServices'
import {generarToken} from '../utils/generarToken'

export const loginAdmin = async (req: Request, res: Response) => {
    try{
        const {email_admin, password_admin} = req.body
        if(!email_admin || !password_admin) return res.status(400).json({message: "No se han recibido todos los campos"});

        const admin = await adminServices.loginAdmin(req.body)

        if(!admin) return res.status(404).json({message: "Usuario no encontrado"});
        
        const token = generarToken(admin)

        if(!token) return res.status(400).json({message: "No se ha generado el token"});

        res.status(200).json({message: "Inicio de sesión exitoso", token})
        
    }catch(error){
        res.status(500).json({message: "Ha ocurrido un error al iniciar sesión", error})
    }
    
}