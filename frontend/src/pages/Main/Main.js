import {Component} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header/Header";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"main"}>
        <Header/>
        <div className={"body"}>
          <Outlet/>
        </div>
      </div>
    )
  }
}

export default Main;