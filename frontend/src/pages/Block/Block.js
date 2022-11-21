import {Component} from "react";
import {privateComponent, withRouter} from "../../components/PropsWrapper/PropsWrapper";
import io from "socket.io-client";
import {Link} from "react-router-dom";
import logo from "../../images/logo/logo.png"

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
    this.state.socket.emit("lobby:create");
  }

  render() {
    return (
      <div>
        <Link to="/" id="logo">
          <img src={logo} />
        </Link>
        <h1>Dominoes</h1>
        <h1>Block</h1>
        <div id='center'>
          <button id='big_button' onClick={this.createNewLobby}>
            Create new lobby
          </button>
        </div>
        {this.state.lobbies.map((lobby) => (
          <div id='center' key={lobby.id}>
            <button id='small_button' onClick={() => this.props.router.navigate(`/games/block/${lobby.id}`)}>
              {lobby.id}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default privateComponent(withRouter(Block));
