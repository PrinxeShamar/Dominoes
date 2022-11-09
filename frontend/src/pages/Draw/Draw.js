import logo from "../../images/logo/logo.png"
import { Link } from "react-router-dom";

export default function Draw() {
  return (
    <div>
      <Link to="/" id="logo">
        <img src={logo} />
      </Link>
      <h1>Draw</h1>
    </div>
  );
}
