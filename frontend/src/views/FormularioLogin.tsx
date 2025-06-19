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
            const res = await fetch("http://localhost:3000/usuario/aut/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login),

            })

            const data = await res.json()


            if (res.ok && data.token) {
                localStorage.setItem("token", data.token)
                setMensaje(data.message)

                setLogin({
                    email_usuario: "",
                    password_usuario: "",
                })
                navigate("/")

            } else {
                setMensaje(data.message || "Error al iniciar sesión")
            }
        } catch (error) {
            setMensaje("Error al conectar con el servidor")
        }
    }


    const [logueado, setLogueado] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            try {
                if (token) {
                    setLogueado(true)
                    navigate("/")
                }
            } catch (error) {
                localStorage.removeItem("token")
                setLogueado(false)
            }
        }
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