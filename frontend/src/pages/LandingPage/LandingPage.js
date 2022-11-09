import {Component} from "react";
import Homepage from "../Homepage/Homepage";
import {withRouter} from "../../components/PropsWrapper/PropsWrapper";

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
          <button onClick={() => this.props.router.navigate("/login")}>
            Login
          </button>
          <button onClick={() => this.props.router.navigate("/signup")}>
            Signup
          </button>
        </div>
      )
    }
  }
}

export default withRouter(LandingPage);
