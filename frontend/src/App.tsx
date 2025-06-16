import { Routes, Route } from "react-router-dom"
import { Inicio } from "./views/Inicio"

export default function App() {
    return (
        <Routes>
            <Route path="/" index element= {<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
        </Routes>
    )
}