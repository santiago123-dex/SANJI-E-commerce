import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import {DatosUsuario, DatosUsuarioLogin} from '../types/usuarioType'
import { DatosToken } from '../types/tokenType'
import { HttpError } from '../utils/errorManager'

const prisma = new PrismaClient()

export const registrarUsuario = async (data: DatosUsuario) => {
    const {nombre_usuario, apellido_usuario, email_usuario, password_usuario, telefono} = data

    const usuarioExistente = await prisma.usuarios.findUnique({where: {email_usuario}})

    if(usuarioExistente) throw new HttpError("Ya existe un usuario con este correo", 409);   

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

    if(!usuarioExiste) throw new HttpError("Usuario no encontrado", 404);

    const passwordValido = await bcrypt.compare(password_usuario, usuarioExiste.password_usuario)

    if(!passwordValido) throw new HttpError("Contraseña incorrecta", 401);

    return {id_usuario: usuarioExiste.id_usuario, email_usuario: usuarioExiste.email_usuario}
}

export const perfilUsuario = async (data: DatosToken) => {
    const id_usuario = data.id_usuario

    const usuario = await prisma.usuarios.findUnique({where: {id_usuario}})
    
    if(!usuario || usuario == null) throw new HttpError("Usuario no encontrado", 404)

    return usuario
}

export const actualizarPerfil = async (id: number, data: DatosUsuario) => {
    try{
        const id_usuario = id
        const {nombre_usuario, apellido_usuario, email_usuario, password_usuario, telefono} = data

        const pwEncriptado = await bcrypt.hash(password_usuario, 10)

        const usuario = await prisma.usuarios.update({
            where: {
                id_usuario
            },
            data: {
                nombre_usuario,
                apellido_usuario,
                email_usuario,
                password_usuario: pwEncriptado,
                telefono: telefono || null,
            }
        })
    }catch{
        throw new HttpError("No se pudo actualizar el perfil", 400);
    }
}

export const borrarCuenta = async (id: number ) => {
    try{
        const id_usuario = id

        await prisma.usuarios.delete({where: {id_usuario}})

    }catch{
        throw new HttpError("No se pudo borrar la cuenta", 400);
    }
}