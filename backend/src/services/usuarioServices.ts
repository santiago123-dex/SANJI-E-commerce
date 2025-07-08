import {Prisma, PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import {DatosActualizarUsuario, DatosUsuario, DatosUsuarioLogin} from '../types/usuarioType'
import { DatosToken } from '../types/tokenType'
import { HttpError } from '../utils/errorManager'
import {prisma} from '../utils/prisma'

export const registrarUsuario = async (data: DatosUsuario) => {
    const {nombre_usuario, apellido_usuario, email_usuario, password_usuario, telefono} = data

    const usuarioExistente = await prisma.usuarios.findUnique({where: {email_usuario}})

    if(usuarioExistente) throw new HttpError("Ya existe un usuario con este correo", 409);   

    const pwEncriptado = await bcrypt.hash(password_usuario, 10)

    try{
        return prisma.usuarios.create({
            data: {
                nombre_usuario,
                apellido_usuario,
                email_usuario,
                password_usuario: pwEncriptado,
                telefono: telefono || null,
            },
        })
    }catch(error){
        if(error instanceof Prisma.PrismaClientValidationError) throw new HttpError("Datos inválidos para el registro", 400);
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2002') throw new HttpError("Ya existe un usuario con este correo", 409);
        }else{
            throw error
        }
    }
}

export const loginUsuario = async (data: DatosUsuarioLogin) => {
    try{
        const {email_usuario, password_usuario} = data
        
        const usuarioExiste = await prisma.usuarios.findUnique({where: {email_usuario}})
        
        if(!usuarioExiste) throw new HttpError("Usuario no encontrado", 404);
        
        const passwordValido = await bcrypt.compare(password_usuario, usuarioExiste.password_usuario)
        
        if(!passwordValido) throw new HttpError("Contraseña incorrecta", 401);
        
        return {id_usuario: usuarioExiste.id_usuario, email_usuario: usuarioExiste.email_usuario}
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("Usuario no encontrado", 404);
        }else{
            throw error
        }
    }
}

export const perfilUsuario = async (data: DatosToken) => {
    try{
        const id_usuario = data.id_usuario
        
        const usuario = await prisma.usuarios.findUnique({where: {id_usuario}})
        
        if(!usuario || usuario == null) throw new HttpError("Usuario no encontrado", 404);
            
        return usuario
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("Perfil de usuario no encontrado", 404);
        }else{
            throw error
        }
    }
}

export const actualizarPerfil = async (id: number, data: DatosActualizarUsuario) => {
    try{
        const id_usuario = id
        const {nombre_usuario, apellido_usuario, email_usuario, telefono} = data

        const usuario = await prisma.usuarios.update({
            where: {
                id_usuario
            },
            data: {
                nombre_usuario,
                apellido_usuario,
                email_usuario,
                telefono: telefono || null,
            }
        })
    }catch(error){
        if(error instanceof Prisma.PrismaClientValidationError) throw new HttpError("Datos inválidos para actualizar", 400);
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("El usuario que intentas actualizar no existe", 404);
            if(error.code === 'P2002') throw new HttpError("Ya existe un usuario con este correo", 409);
        }
        throw new HttpError("No se pudo actualizar el perfil", 400);
    }
}

export const borrarCuenta = async (id: number ) => {
    try{
        const id_usuario = id

        await prisma.usuarios.delete({where: {id_usuario}})

    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("El usuario que intentas borrar no existe", 404);
        }
        throw new HttpError("No se pudo borrar la cuenta", 400);
    }
}