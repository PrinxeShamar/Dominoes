import {Component} from "react";
import {privateComponent, withRouter} from "../../components/PropsWrapper/PropsWrapper";
import io from "socket.io-client";

class Lobby extends Component {

  constructor(props) {
    super(props);
    console.log(props.router.params.lobbyId)
    this.state = {
      id: props.router.params.lobbyId,
      socket: null,
      lobby: null,
    };
  }

  async componentDidMount() {
    this.socketInit();
  }

  socketInit() {
    const socket = io("http://localhost:4500/games/block");
    socket.emit("lobby:join", this.state.id, (response) => {
      if (response.result === "success") {
        console.log(response.data)
        this.setState({
          lobby: response.data,
        })
      } else {
        this.props.router.navigate("/")
      }
    })

    socket.on("lobby:joined", (lobbyData) => {
      this.setState({
        lobby: lobbyData,
      })
    })

    socket.on("lobby:left", (lobbyData) => {
      this.setState({
        lobby: lobbyData,
      })
    })
  }

  render() {
    if (this.state.lobby) {
      return (
        <div>
          <h1>{this.state.lobby.id}</h1>
          <div>
            <h2>
              Players
            </h2>
            {this.state.lobby.players.map((player) => (
              <div key={player}>
                {player}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default privateComponent(withRouter(Lobby));
