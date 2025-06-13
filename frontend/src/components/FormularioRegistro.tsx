import { useState } from "react";
import React from "react";
import "../styles/FormularioRegistro.css"

interface Usuario{
    name: string
    email:string
    password:string
}


export function FormularioRegistro(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    function clic(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setUsuario({
            name,
            email,
            password
        })
        setEmail("")
        setPassword("")
        setName("")
    }   
    return(
        <div className="box"> 
        <div className="box_form">
            <h2>¡Hola! Registrate para disfrutar</h2>
            <form className="box_formulario" onSubmit={clic}>
                <label>Nombre</label>
                <input className="box_formulario_inputs" type="text" placeholder="Javiz" value={name} required onChange={(e) => setName(e.target.value)}/>
                <label>Email</label>
                <input className="box_formulario_inputs" type="email" placeholder="tu@gmail.com" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input className="box_formulario_inputs" type="password" placeholder="*******" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                <button className="box_formulario_boton" type="submit">Login</button>
                <p>Don't have an account?</p>
            </form>
            {usuario &&(
                <div className="mostrarDatos">
                    <p>Email: {usuario.email}</p>
                    <p>Constraseña: {usuario.password}</p>
                </div>
            )}
        </div>
        </div>
    )
}