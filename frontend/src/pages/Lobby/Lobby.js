import {Component} from "react";
import {
  privateComponent,
  withRouter,
} from "../../components/PropsWrapper/PropsWrapper";
import io from "socket.io-client";
import Domino from "../../components/Domino/Domino";

const TEST_LOBBY = {
  id: "9233",
  board: ["21", "13", "33"],
  currentPlayer: "1234",
  creator: "1234",
  joinedPlayers: [
    {
      id: "1234",
      username: "Shamar",
      isMe: true,
    },
    {
      id: "1235",
      username: "Antonio",
      isMe: false,
    },
  ],
  started: true,
  players: [
    {
      id: "1234",
      username: "Shamar",
      hand: ["12", "44", "66", "45"],
      isMe: true,
    },
    {
      id: "1235",
      username: "Antonio",
      hand: ["", "", "", "", ""],
      isMe: false,
    },
  ],
}

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.router.params.lobbyId,
      socket: null,
      lobby: null,
      selectedDomino: "",
      selectedSide: "",
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
    socket.emit("lobby:join", this.state.id, (jsonResponse) => {
      let response = JSON.parse(jsonResponse);
      if (response.result === "success") {
        this.setState({
          lobby: response.data,
        });
      } else {
        this.props.router.navigate("/");
      }
    });

    socket.on("lobby:update", (lobbyData) => {
      this.setState({
        lobby: lobbyData,
      });
    });

    this.setState({
      socket: socket,
    })
  }

  getCurrentPlayer() {
    return this.state.lobby.players.find((player) => {
      return player.id === this.state.lobby.currentPlayer;
    });
  }

  selectDomino = (domino) => {
    let currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer.isMe) {
      return;
    }
    this.setState({
      selectedDomino: domino,
      selectedSide: "",
    });
  };

  isDominoSelected = (domino) => {
    return domino === this.state.selectedDomino;
  };

  selectSide = (side) => {
    if (!this.state.selectedDomino) {
      return;
    }
    if (this.state.selectedSide === side) {
      this.state.socket.emit("lobby:play", this.state.selectedDomino, this.state.selectedSide);
    } else {
      this.setState({
        selectedSide: side,
      });
    }
  };

  isUserLobbyCreator = () => {
    for (let player of this.state.lobby.joinedPlayers) {
      if (player.isMe && player.id.toString() === this.state.lobby.creator.toString()) {
        return true;
      }
    }
    return false;
  }

  startLobby = () => {
    this.state.socket.emit("lobby:start", this.state.id);
  }

  render() {
    if (this.state.lobby) {
      if (this.state.lobby.started) {
        return (
          <div>
            <h1>{this.state.lobby.id}</h1>
            <div>
              <h2>Board</h2>
              <div style={{display: "flex"}}>
                {this.getCurrentPlayer().isMe && (
                  <Domino
                    value={this.state.selectedDomino}
                    selected={this.state.selectedSide === "L"}
                    rotated={true}
                    onClick={() => this.selectSide("L")}
                  />
                )}
                {this.state.lobby.board.map((domino) => (
                  <Domino key={domino} value={domino} rotated={true}/>
                ))}
                {this.getCurrentPlayer().isMe && (
                  <Domino
                    value={this.state.selectedDomino}
                    selected={this.state.selectedSide === "R"}
                    rotated={true}
                    onClick={() => this.selectSide("R")}
                  />
                )}
              </div>
            </div>
            <div>
              <h2>Players</h2>
              {this.state.lobby.players.map((player, index) => (
                <div key={player.id}>
                  <div
                    style={{
                      color:
                        player.id === this.state.lobby.currentPlayer
                          ? "blue"
                          : "black",
                    }}
                  >
                    Player {index + 1} - {player.username}
                  </div>
                  <div style={{display: "flex"}}>
                    {player.hand.map((domino) => (
                      <Domino
                        key={domino}
                        selected={
                          player.isMe && domino === this.state.selectedDomino
                        }
                        value={domino}
                        onClick={() => this.selectDomino(domino)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div>
              <h1>{this.state.lobby.id}</h1>
              {this.isUserLobbyCreator() &&
                <button onClick={this.startLobby}>
                  Start
                </button>
              }
            </div>
            <div>
              <h2>Joined Players</h2>
              {this.state.lobby.joinedPlayers.map((player, index) => (
                <div>
                  Player {index + 1} - {player.username}
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  }
}

export default privateComponent(withRouter(Lobby));
