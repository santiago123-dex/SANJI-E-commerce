import { Request, Response } from 'express'
import * as usuarioServices from '../services/usuarioServices'
import { generarToken } from '../utils/generarToken'

export const registrarUsuario = async (req: Request, res: Response) => {
    try {
        const { nombre_usuario, apellido_usuario, email_usuario, password_usuario, telefono } = req.body

        if (!nombre_usuario || !apellido_usuario || !email_usuario || !password_usuario) return res.status(400).json({ message: "No se han recibido todos los campos" });

        const nuevoUsuario = await usuarioServices.registrarUsuario(req.body)
        res.status(201).json({ message: 'Usuario registrado correctamente', nuevoUsuario })
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal al resgistrar el usuario', error: error })
    }
}

export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { email_usuario, password_usuario } = req.body

        if (!email_usuario || !password_usuario) return res.status(400).json({ message: 'No se han recibido todos los campos' });

        const usuario = await usuarioServices.loginUsuario(req.body)

        const token = generarToken(usuario)
        res.status(200).json({ message: 'Inicio de sesion exitoso', token })
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal al iniciar sesion', error: error })
    }
}

export const perfilUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = req.usuario
        if (!usuario) {
            return res.status(401).json({ message: "Primero inicia sesión" })
        }

        if (!usuario.email_usuario || !usuario.id_usuario) throw new Error("No llegaron datos suficentes");

        const perfil = await usuarioServices.perfilUsuario(usuario)
        res.status(200).json(perfil)
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal al obtener el perfil', error: error })
    }
}