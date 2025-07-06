import "../styles/Footer.css";
import {
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaFacebook,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { LogoMiboleta } from "./LogoMiboleta";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="content__logo">
                    <LogoMiboleta />
                </div>
                <div className="content__section section--info">
                    <h4 className="info__title title">MiBoleta</h4>
                    <p className="info__text">
                        <FaMapMarkerAlt /> Ticket Fast
                        <br />
                        S.A.S
                        <br />
                        Nit 900.569.193-0
                    </p>
                    <div className="info__social">
                        <a href="#">
                            <FaInstagram />
                        </a>
                        <a href="#">
                            <FaYoutube />
                        </a>
                        <a href="#">
                            <FaTwitter />
                        </a>
                        <a href="#">
                            <FaFacebook />
                        </a>
                    </div>
                </div>
                <div className="content__section section--categories">
                    <h4 className="categories__title title">Categorías</h4>
                    <ul className="categories__list list">
                        <li>Conciertos</li>
                        <li>Teatro</li>
                        <li>Deportes</li>
                        <li>Festivales</li>
                        <li>Familiar</li>
                        <li>Foros</li>
                        <li>Experiencias</li>
                    </ul>
                </div>
                <div className="content__section section--help">
                    <h4 className="help__title title">Ayuda</h4>
                    <ul className="help__list list">
                        <li>Contáctanos - PQRS</li>
                        <li>MiBoleta Pass</li>
                        <li>Puntos de venta</li>
                        <li>MiBoleta Te cuenta</li>
                    </ul>
                </div>
                <div className="content__section section--legal">
                    <h4 className="legal__title title">Legal</h4>
                    <ul className="legal__list list">
                        <li>Política de privacidad</li>
                        <li>Términos de uso</li>
                        <li>SAGRILAFT Y PTEE</li>
                        <li>SIC</li>
                    </ul>
                </div>
            </div>
            <div className="footer__bottom">
                © 2025 MiBoleta®. Reservados todos los derechos. Versión 1.0.0
            </div>
        </footer>
    );
}
