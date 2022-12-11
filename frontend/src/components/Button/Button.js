import {Component} from "react";
import "./Button.css"

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"buttonMain"} onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }
}

export default Button;