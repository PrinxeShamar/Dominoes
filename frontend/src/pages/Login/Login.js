import {Component} from "react";
import {withRouter, privateComponent} from "../../components/PropsWrapper/PropsWrapper";
import logo from "../../images/logo/logo.png"
import {Link} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  input = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = async () => {
    let httpResponse = await fetch('http://localhost:4500/api/auth/login', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    });
    let response = await httpResponse.json();
    if (response.result === "success") {
      localStorage.setItem("dominosLoggedIn", "true");
      this.props.router.navigate("/");
    } else {
      this.setState({
        username: "",
        password: "",
      });
    }
  };

  render() {
    return (
      <div>
        <Link to="/" id="logo">
          <img src={logo} />
        </Link>
        <h1>Dominoes</h1>
        <div id='center'>
          <input
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.input}
          />
          <input
            placeholder="Password"
            name="password"
            value={this.state.password}
            type="password"
            onChange={this.input}
          />
        </div>
        <div id='center'>
          <button id='small_button' onClick={this.submit}>Login</button>
        </div>
      </div>
    );
  }
}

export default privateComponent(withRouter(Login));
