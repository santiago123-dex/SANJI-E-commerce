import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormularioLogin.css"; 

    interface Admin {
        email_admin: string;
        password_admin: string;
    }

    export function FormularioLoginAdmin() {
        const [admin, setAdmin] = useState<Admin>({
        email_admin: "",
        password_admin: "",
    });

        const [mensaje, setMensaje] = useState("");
        const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdmin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("https://sanji-e-commerce.onrender.com/api/admin/login", {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(admin),
        });

        const data = await res.json();

        if (res.ok) {
            setMensaje("Login exitoso");
            navigate("/inicio_admin");
        } else {
            setMensaje(data.message || "Credenciales incorrectas");
        }
        } catch (error) {
            console.log("Error real", error)
            setMensaje("Error al conectar con el servidor");
        }
    };
    

    return (
        <div className="box">
            <div className="box_form">
            <h2>Acceso administrador</h2>
            <form className="box_formulario" onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                className="box_formulario_inputs"
                type="email"
                name="email_admin"
                value={admin.email_admin}
                required
                onChange={handleChange}
            />

            <label>Contraseña</label>
                <input
                className="box_formulario_inputs"
                type="password"
                name="password_admin"
                value={admin.password_admin}
                required
                onChange={handleChange}
            />
            <button className="box_formulario_boton" type="submit">
                Iniciar sesión
            </button>
            {mensaje && <p>{mensaje}</p>}
            </form>
            </div>
        </div>
    );
    }
