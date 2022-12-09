import {Component} from "react";
import {withRouter, privateComponent} from "../../components/PropsWrapper/PropsWrapper";
import {Link} from "react-router-dom";
import "./Homepage.css"

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    let httpResponse = await fetch("http://localhost:4500/api/me/", {
      method: "GET",
    });
    let response = await httpResponse.json();
    if (response.result === "success") {
      this.setState({
        username: response.data.username,
      })
    }
  }

  logout = async () => {
    await fetch("http://localhost:4500/api/auth/logout", {
      method: "POST",
    });
    localStorage.removeItem("dominosLoggedIn");
    this.props.router.navigate("/");
  }

  render() {
    return (
      <div>
        <div className={"welcomeText"}>Welcome {this.state.username}</div>
        <div className={"buttons"}>
          <button onClick={() => this.props.router.navigate("/games/block")} className={"button"}>
            Block
          </button>
          <button onClick={() => this.props.router.navigate("/games/draw")} className={"button"}>
            Draw
          </button>
        </div>
      </div>
    );
  }
}

export default privateComponent(withRouter(Homepage));
