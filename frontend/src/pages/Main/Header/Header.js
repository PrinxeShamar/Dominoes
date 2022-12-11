import {Component} from "react";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"headerBackground"}>
        <div className={"headerTitle"}>
          Dominos
        </div>
      </div>
    )
  }
}

export default Header;