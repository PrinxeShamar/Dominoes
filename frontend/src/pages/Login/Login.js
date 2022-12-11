import {Component} from "react";
import {withRouter, privateComponent} from "../../components/PropsWrapper/PropsWrapper";
import Input from "../../components/Input/Input";

import "./Login.css";
import Button from "../../components/Button/Button";
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
      <div className={"loginMain"}>
        <div className={"login"}>
          <Input name="username"
                 title={"Username"}
                 value={this.state.username}
                 onChange={this.input}
                 type="text"/>
          <Input
            name="password"
            title={"Password"}
            value={this.state.password}
            type="password"
            onChange={this.input}
          />
          <Button onClick={this.submit} text={"Login"}/>
          <Link to="/signup">
            <div className={"subButton"}>Don't have an account?
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default privateComponent(withRouter(Login));
