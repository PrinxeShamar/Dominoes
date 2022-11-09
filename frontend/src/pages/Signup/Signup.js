import {Component} from "react";
import {privateComponent, withRouter} from "../../components/PropsWrapper/PropsWrapper";

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
        <button onClick={this.submit}>Signup</button>
      </div>
    );
  }
}

export default privateComponent(withRouter(Signup));