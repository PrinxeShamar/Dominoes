import {Component} from "react";
import {privateComponent, withRouter} from "../../components/PropsWrapper/PropsWrapper";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./Signup.css";
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
      <div className={"signupMain"}>
        <div className={"signup"}>
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
          <Input
            name="repeatPassword"
            title={"Repeat Password"}
            value={this.state.repeatPassword}
            type="password"
            onChange={this.input}
          />
          <Button onClick={this.submit} text={"Signup"}/>
          <Link to="/login">
            <div className={"subButton"}>Already have an account?
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default privateComponent(withRouter(Signup));