import {Component} from "react";
import {privateComponent, withRouter} from "../../components/PropsWrapper/PropsWrapper";
import io from "socket.io-client";

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
    this.state.socket.emit("lobby:create");
  }

  render() {
    return (
      <div>
        <h1>Block</h1>
        <button onClick={this.createNewLobby}>
          Create new lobby
        </button>
        {this.state.lobbies.map((lobby) => (
          <div key={lobby.id}>
            <button onClick={() => this.props.router.navigate(`/games/block/${lobby.id}`)}>
              {lobby.id}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default privateComponent(withRouter(Block));
