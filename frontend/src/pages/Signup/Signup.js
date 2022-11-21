import {Component} from "react";
import {privateComponent, withRouter} from "../../components/PropsWrapper/PropsWrapper";
import logo from "../../images/logo/logo.png"
import {Link} from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repeatPassword: "",
    };
  }

  input = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = async () => {
    if (this.state.password !== this.state.repeatPassword) {
      this.setState({
        password: "",
        repeatPassword: "",
      });
      return;
    }
    let httpResponse = await fetch('http://localhost:4500/api/auth/signup', {
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
        password: "",
        repeatPassword: "",
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
            type="password"
            value={this.state.password}
            onChange={this.input}
          />
          <input
            placeholder="Repeat Password"
            name="repeatPassword"
            type="password"
            value={this.state.repeatPassword}
            onChange={this.input}
          />
        </div>
        <div id='center'>
          <button id='small_button' onClick={this.submit}>Signup</button>
        </div>
      </div>
    );
  }
}

export default privateComponent(withRouter(Signup));