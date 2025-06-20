import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import {DatosUsuario, DatosUsuarioLogin} from '../types/usuarioType'
import { DatosToken } from '../types/tokenType'

const prisma = new PrismaClient()

export const registrarUsuario = async (data: DatosUsuario) => {
    const {nombre_usuario, apellido_usuario, email_usuario, password_usuario, telefono} = data

    const usuarioExistente = await prisma.usuarios.findUnique({where: {email_usuario}})

    if(usuarioExistente) throw new Error("Ya existe un usuario con este correo");   

    const pwEncriptado = await bcrypt.hash(password_usuario, 10)

    return prisma.usuarios.create({
        data: {
            nombre_usuario,
            apellido_usuario,
            email_usuario,
            password_usuario: pwEncriptado,
            telefono: telefono || null,
        },
    })
}

export const loginUsuario = async (data: DatosUsuarioLogin) => {
    const {email_usuario, password_usuario} = data

    const usuarioExiste = await prisma.usuarios.findUnique({where: {email_usuario}})

    if(!usuarioExiste) throw new Error("Usuario no encontrado");

    const passwordValido = await bcrypt.compare(password_usuario, usuarioExiste.password_usuario)

    if(!passwordValido) throw new Error("Contraseña incorrecta");

    return {id_usuario: usuarioExiste.id_usuario, email_usuario: usuarioExiste.email_usuario}
}

export const perfilUsuario = async (data: DatosToken) => {
    const id_usuario = data.id_usuario

    const usuario= await prisma.usuarios.findUnique({where: {id_usuario}})
    
    if(!usuario || usuario == null) throw new Error("Usuario no encontrado")

    return usuario
}