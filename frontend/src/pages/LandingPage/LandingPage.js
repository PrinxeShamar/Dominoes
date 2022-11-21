import {Component} from "react";
import Homepage from "../Homepage/Homepage";
import {withRouter} from "../../components/PropsWrapper/PropsWrapper";
import logo from "../../images/logo/logo.png"
import {Link} from "react-router-dom";

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isLoggedIn = localStorage.getItem("dominosLoggedIn") === "true";
    if (isLoggedIn) {
      return <Homepage private={true}/>
    } else {
      return (
        <div>
          <Link to="/" id="logo">
            <img src={logo} />
          </Link>
          <h1>Dominoes</h1>
          <div id='center'>
            <button id='big_button' onClick={() => this.props.router.navigate("/login")}>
              Login
            </button>
            <button id='big_button' onClick={() => this.props.router.navigate("/signup")}>
              Signup
            </button>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(LandingPage);
