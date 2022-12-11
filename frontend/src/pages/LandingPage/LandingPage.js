import {Component} from "react";
import Homepage from "../Homepage/Homepage";
import {withRouter} from "../../components/PropsWrapper/PropsWrapper";
import "./LandingPage.css";

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
        <div className={"buttons"}>
          <button onClick={() => this.props.router.navigate("/login")} className={"button"}>
            Login
          </button>
          <button onClick={() => this.props.router.navigate("/signup")} className={"button"}>
            Signup
          </button>
        </div>
      )
    }
  }
}

export default withRouter(LandingPage);
