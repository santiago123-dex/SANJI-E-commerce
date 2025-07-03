import { Link } from "react-router-dom";
import "../styles/LogoMiboleta.css";

export function LogoMiboleta() {
  return (
    <div>
      <Link to="/inicio_admin" className="containerLogo">
        <span className="logo-tubo">MiBo</span>
        <span className="logo-leta">leta</span>
      </Link>
    </div>
  )
};

