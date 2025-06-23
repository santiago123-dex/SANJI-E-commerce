import { Request, Response } from 'express'
import * as usuarioServices from '../services/usuarioServices'
import { generarTokenAcceso, generarTokenRefresh } from '../utils/generarToken'
import { HttpError } from '../utils/errorManager'

export const registrarUsuario = async (req: Request, res: Response) => {
    try {
        const { nombre_usuario, apellido_usuario, email_usuario, password_usuario, telefono } = req.body

        if (!nombre_usuario || !apellido_usuario || !email_usuario || !password_usuario) return res.status(400).json({ message: "No se han recibido todos los campos" });

        const nuevoUsuario = await usuarioServices.registrarUsuario(req.body)

        res.status(201).json({message: 'Usuario registrado correctamente', nuevoUsuario})
    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Algo salio mal al resgistrar el usuario', error:error})
        }
    }
}

export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { email_usuario, password_usuario } = req.body

        if (!email_usuario || !password_usuario) return res.status(400).json({ message: 'No se han recibido todos los campos' });

        const usuario = await usuarioServices.loginUsuario(req.body)

        const tokenAcceso = generarTokenAcceso(usuario)
        const tokenRefresh = generarTokenRefresh(usuario)

        res.cookie('tokenRefresh', tokenRefresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7   // para mantener la sesion por 7 dias
        })

        res.cookie('tokenAcceso', tokenAcceso, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 15
        })

        res.status(200).json({message: 'Inicio de sesion exitoso'})
    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Algo salio mal al iniciar sesion'})
        }
    }
}

export const logoutUsuario = async (_req: Request, res: Response) => {
    res.clearCookie('tokenAcceso')
    res.clearCookie('tokenRefresh')
    res.status(200).json({ message: 'Sesión cerrada correctamente' })
}

export const perfilUsuario =  async (req: Request, res: Response) => {
    try{
        const usuario = req.usuario
        if(!usuario) throw new Error("Primero inicia sesión");
        if(!usuario.email_usuario || !usuario.id_usuario) return res.status(400).json({message: "No llegaron datos suficentes"});

        const perfil = await usuarioServices.perfilUsuario(usuario)
        res.status(200).json(perfil)

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Algo salio mal al obtener el perfil'})
        }
    }
}