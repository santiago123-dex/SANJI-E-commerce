import "../styles/Footer.css";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook, FaMapMarkerAlt } from "react-icons/fa";
import { LogoMiboleta } from "./LogoMiboleta";

export function Footer () {
    return (
        <footer className="footer">
        <div className="footer-container">
            <div className="footer-logo-section">
            <div className="footer-logo">
                <LogoMiboleta />
            </div>
            </div>
            
            <div className="footer-info">
            <h4>MiBoleta</h4>
            <p><FaMapMarkerAlt /> Ticket Fast<br/>S.A.S<br/>Nit 900.569.193-0</p>
            <div className="footer-social">
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaYoutube /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaFacebook /></a>
            </div>
            </div>
            <div className="footer-links">
            <h4>Categorías</h4>
            <ul>
                <li>Conciertos</li>
                <li>Teatro</li>
                <li>Deportes</li>
                <li>Festivales</li>
                <li>Familiar</li>
                <li>Foros</li>
                <li>Experiencias</li>
            </ul>
        </div>

            <div className="footer-links">
            <h4>Ayuda</h4>
            <ul>
                <li>Contáctanos - PQRS</li>
                <li>MiBoleta Pass</li>
                <li>Puntos de venta</li>
                <li>MiBoleta Te cuenta</li>
            </ul>
            </div>
            <div className="footer-links">
            <h4>Legal</h4>
            <ul>
                <li>Política de privacidad</li>
                <li>Términos de uso</li>
                <li>SAGRILAFT Y PTEE</li>
                <li>SIC</li>
            </ul>
            </div>
        </div>
        <div className="footer-bottom">
            © 2025 MiBoleta®. Reservados todos los derechos. Versión 1.0.0
        </div>
        </footer>
    )
};

