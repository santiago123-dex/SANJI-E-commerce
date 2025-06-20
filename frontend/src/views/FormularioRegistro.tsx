import { useState } from "react";
import React from "react";
import "../styles/FormularioRegistro.css"


interface FormularioRegistroData {
    nombre_usuario: string
    apellido_usuario: string
    email_usuario: string
    password_usuario: string
    telefono?: string
}

export const FormularioRegistro = () => {

    /*GUARDAMOS LOS DATOS DEL FORMULARIO EN UN ESTADO, Y USAMOS EL SETFORM PARA CAMBIAR LOS VALORES*/
    const [form, setForm] = useState<FormularioRegistroData>({
        /*INICIA CAMPOS VACIOS PORQUE NO SE HA LLENADO NADA*/
        nombre_usuario: "",
        apellido_usuario: "",
        email_usuario: "",
        password_usuario: "",
        telefono: "",
    })

    /* ESTADO PARA MOSTRAR MENSAJES DE EXITO O ERROR*/
    const [mensaje, setMensaje] = useState("")

    /*ESTA FUNCION SE ACTIVA CADA VEZ QUE SE ESCRIBE ALGO EN CUALQUIER INPUT DEL FORMULARIO*/
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        /*OBTENEMOS EL NAME Y EL VALUE DEL INPUT QUE SE MODIFICO*/
        const { name, value } = e.target

        /*ACTUALIZAMOS EL ESTADO FORM USANDO LA FUNCION DE SETFORM*/
        setForm((prev) => ({
            /*MANTENEMOS TODOS LOS VALORES QUE YA TENIAMOS DEL FORM*/
            ...prev,
            /*ACTULIZAMOS SOLO EL CAMPO QUE CAMBIO USANDO name como clave dinamica*/
            [name]: value
        }))
    }

    /*ESTA FUNCION ENVIA LOS DATOS AL BACKEND CUANDO EL USUARIO ENVIA EL FORMULARIO*/
    const handelSubmit = async (e: React.FormEvent) => {
        /*EVITA QUE LA PAGINA SE RECARGUE AUTOMATIXAMENTE*/
        e.preventDefault()
        try {
            /*USAMOS EL FETCH PARA ENVIAR UNA PETICION HTTP AL SERVIDOR BACKEND */
            const res = await fetch("http://localhost:3000/usuario/aut/registro", {  
                /*USAMOS METODO POST PARA DECIR QUE VAMOS A ENVIAR DATOS*/
                method: "POST",
                /*LE DECIMOS AL BACK QUE ESTAMOS ENVIANDO DATOS EN FORMATO JSON*/
                headers: {
                    /*Content-type indica al servidor en que formato se estan enviando los datos*/
                    /*"application/json es el formato estandar para APISs modernas"*/
                    "Content-Type": "application/json",
                },
                /*CONVERTIMOS EL OBJETO DE JS "form" A TEXTO JSON PORQUE EL FETCH NO PUEDE ENVIAR OBJETOS DIRECTAMENTE*/
                /*ESTE TEXTO SE ENVIARA AL SERVIDOR COMO CUERPO "BODY" DE LA SOLICITUD*/
                body: JSON.stringify(form),
            })

            /*CONVERTIMOS LA RESPUESTA DEL SERVIDOR EN FORMATO JSON PARA PODER LEERLA*/
            const data = await res.json()
            /*SI EL REGISTRO FUE EXITOSO*/
            if (res.ok) {
                /*MOSTRAMOS EL MENSAJE QUE NOS DEVUELVE EL BACKEND*/
                setMensaje(data.message);
                /*SETEAMOS TODOS LO INPUTS PARA QUE QUEDEN VACIOS DESPUES DE LLENAR EL FORMULARIO*/
                setForm({
                    nombre_usuario: "",
                    apellido_usuario: "",
                    email_usuario: "",
                    password_usuario: "",
                    telefono: ""
                })
            /*Mensaje al no poder registrarse*/
            } else {
                setMensaje(data.message || "Error al registrar")
            }
        /*SI NO SE PUDO CONECTAR CON EL SERVIDOR*/
        } catch (error) {
            setMensaje("Error al conectar con el servidor")
        }
    }


    return (
        <div className="box">
            <div className="box_form">
                <h2>¡Hola! Registrate para disfrutar</h2>
                <form className="box_formulario" onSubmit={handelSubmit}>
                    <label>Nombre</label>
                    <input
                        className="box_formulario_inputs"
                        type="text"
                        name="nombre_usuario"
                        placeholder="Javiz"
                        value={form.nombre_usuario}
                        onChange={handleChange}
                        required
                    />

                    <label>Apellidos</label>
                    <input
                        className="box_formulario_inputs"
                        type="text"
                        name="apellido_usuario"
                        placeholder="Juarez"
                        value={form.apellido_usuario}
                        onChange={handleChange}
                        required
                    />

                    <label>Correo Electronico</label>
                    <input
                        className="box_formulario_inputs"
                        type="email"
                        name="email_usuario"
                        placeholder="tu@gmail.com"
                        value={form.email_usuario}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        className="box_formulario_inputs"
                        type="password"
                        name="password_usuario"
                        placeholder="*******"
                        value={form.password_usuario}
                        required
                        onChange={handleChange}
                    />

                    <button className="box_formulario_boton" type="submit">Registrarse</button>
                    <p>Don't have an account?</p>
                    {mensaje && <p>{mensaje}</p>}
                </form>
            </div>
        </div>
    )
}