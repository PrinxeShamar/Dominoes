import {Component} from "react";
import {withRouter, privateComponent} from "../../components/PropsWrapper/PropsWrapper";
import {Link} from "react-router-dom";
import logo from "../../images/logo/logo.png"

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
        <Link to="/" id="logo">
          <img src={logo} />
        </Link>
        <h1>Dominoes</h1>
        <h3>Welcome {this.state.username}</h3>
        <div id='center'>
          <button id='small_button' onClick={this.logout}>
            Logout
          </button>
        </div>
        <div>
          <div id='center'>
            <Link to="/games/block">
              <button id='big_button'>Play vs Friends</button>
            </Link>
          </div>
          <div id='center'>
            <Link to="/games/block">
              <button id='big_button'>Play vs Computer</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default privateComponent(withRouter(Homepage));
