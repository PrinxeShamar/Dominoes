import {Component} from "react";
import "./Input.css";

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"inputMain"}>
        <div className={"inputTitle"}>{this.props.title}</div>
        <div className={"inputHolder"}>
          <input name={this.props.name} className={"input"} type={this.props.type} value={this.props.value}
                 onChange={this.props.onChange}/>
        </div>
      </div>
    )
  }
}

export default Input;
