import {Component} from "react";
import {privateComponent, withRouter} from "../../components/PropsWrapper/PropsWrapper";
import io from "socket.io-client";
import "./Block.css"

class Block extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      lobbies: [],
    };
  }

  componentDidMount() {
    this.socketInit();
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  socketInit() {
    const socket = io("http://localhost:4500/games/block");
    socket.emit("lobby:get", (response) => {
      if (response.result === "success") {
        this.setState({
          lobbies: response.data,
        })
      } else {
        this.props.router.navigate("/")
      }
    })
    socket.on("lobby:created", (lobby) => {
      this.setState((prevState) => {
        return {
          lobbies: [...prevState.lobbies, lobby]
        }
      })
    });
    this.setState({
      socket: socket,
    })
  }

  createNewLobby = () => {
    console.log("Here")
    this.state.socket.emit("lobby:create");
  }

  render() {
    return (
      <div className={"gameMain"}>
        <div className={"gameDetails"}>
          <div className={"gameTitle"}>Block</div>
          <div className={"gameButtons"}>
            <div className={"gameButton"}>Play</div>
            <div className={"gameButton"} onClick={this.createNewLobby}>Create</div>
            <div className={"gameButton"} onClick={() => this.props.router.navigate("/games/block/rules")}>Rules</div>
          </div>
        </div>
        <div className={"gameLobbies"}>
          <div className={"lobbiesText"}>Lobbies</div>
          <div className={"lobbies"}>
            {this.state.lobbies.map((lobby) => (
              <div key={lobby.id} className={"lobby"}>
                <div className={"lobbyDetails"}>
                  <div className={"lobbyName"}>{lobby.id}</div>
                  <div className={"playerCount"}>Players 1/4</div>
                </div>
                <div className={"lobbyButtons"}>
                  <div className={"lobbyButton"} onClick={() => this.props.router.navigate(`/games/block/${lobby.id}`)}>
                    Join
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default privateComponent(withRouter(Block));
