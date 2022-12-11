import {Component} from "react";
import "./Domino.css";

function importAll(r) {
  let names = r.keys();
  let images = r.keys().map(r);
  let nameMap = {}
  for (let name in names) {
    nameMap[names[name]] = images[name];
  }
  return nameMap;
}

const images = importAll(require.context('../../images/dominoes/white/', false, /\.(png|jpe?g|svg)$/));

class Domino extends Component {
  constructor(props) {
    super(props);
    let value;
    let rotation;
    if (this.props.value) {
      let valueList = this.props.value.split("");
      let valueListSorted = this.props.value.split("").sort();
      let flippedDomino = valueList.join("") !== valueListSorted.join("")
      if (this.props.rotated) {
        if (valueList[0] !== valueList[1]) {
          if (flippedDomino) {
            rotation = -90;
          } else {
            rotation = 90;
          }
        } else {
          rotation = 0;
        }
      } else {
        rotation = 0;
      }
      value = valueListSorted.join("");
    } else {
      value = "back";
      rotation = this.props.rotated ? 90 : 0;
    }
    this.state = {
      value: value,
      rotation: rotation,
    }
  }

  render() {
    return (
      <div className={this.props.selected ? "domino selected" : "domino"}
           onClick={this.props.onClick}>
        <img src={images[`./${this.state.value}.png`]} width={100}
             style={{transform: `rotate(${this.state.rotation}deg)`}}/>
      </div>
    )
  }
}

export default Domino;