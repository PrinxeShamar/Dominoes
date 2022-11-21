import {Component} from "react";
import {withRouter, privateComponent} from "../../components/PropsWrapper/PropsWrapper";
import {Link} from "react-router-dom";

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
        <h1>Dominoes</h1>
        <h3>Welcome {this.state.username}</h3>
        <button onClick={this.logout}>
          Logout
        </button>
        <div>
          <h2>Choose Game Mode </h2>
          <Link to="/games/block">
            <button>Block</button>
          </Link>
        </div>
        <div>
          <h2>Game Rules</h2>
          <Link to="/games/block/rules">
            <button>Block</button>
          </Link>
          <Link to="/games/draw/rules">
            <button>Draw</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default privateComponent(withRouter(Homepage));
