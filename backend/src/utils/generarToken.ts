import jwt from 'jsonwebtoken'
import {DatosToken, DatosTokenAdmin} from '../types/tokenType'

export const generarToken = (datos: DatosToken | DatosTokenAdmin) => {
    return jwt.sign(datos, process.env.JWT_SECRET as string, {expiresIn: '1h'})
}