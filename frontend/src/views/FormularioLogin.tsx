import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormularioLogin.css"

interface Usuario {
    email_usuario: string
    password_usuario: string
}


export function Formulario() {
    const [login, setLogin] = useState<Usuario>({
        email_usuario: "",
        password_usuario: "",
    })

    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLogin((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch("http://localhost:3000/api/usuario/login", {    
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login),

            })

            const data = await res.json()
            console.log("Respuesta del login:", res.status, data)

            if (res.ok) {
                setMensaje(data.message)

                setLogin({
                    email_usuario: "",
                    password_usuario: "",
                })

                navigate("/inicio")
            } else {
                setMensaje(data.message || "Error al iniciar sesión")
            }
        } catch (error) {
            setMensaje("Error al conectar con el servidor")
        }
    }


    const [logueado, setLogueado] = useState(false)

    useEffect(() => {
        const token = async () =>{
            try{
                const res = await fetch("http://localhost:3000/api/usuario/perfil", {
                    method: "GET",
                    credentials: "include"
                })

                if(res.ok){
                    const data = await res.json()
                    setLogueado(true)
                    navigate("/", {replace: true})
                }else{
                    setLogueado(false)
                }
            }catch(error){
                setLogueado(false)
            }
        }
        token()
        }, [navigate])

    return (
        <div className="box">
            <div className="box_form">
                <h2>¡Hola! Bienvenido a mi boleta</h2>
                <form className="box_formulario" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        className="box_formulario_inputs"
                        type="email"
                        name="email_usuario"
                        placeholder="tu@gmail.com"
                        value={login.email_usuario}
                        required
                        onChange={handleChange}
                    />
                    <label>Password</label>
                    <input
                        className="box_formulario_inputs"
                        type="password"
                        name="password_usuario"
                        placeholder="*******"
                        value={login.password_usuario}
                        required
                        onChange={handleChange}
                    />
                    <button className="box_formulario_boton" type="submit">Login</button>
                    <p>Don't have an account?</p>
                    {mensaje && <p>{mensaje}</p>}
                    {logueado && <p>Usuario ya esta logueado</p>}
                </form>
            </div>
        </div>
    )
}