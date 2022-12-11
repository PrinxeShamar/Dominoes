import {Component} from "react";
import {
  privateComponent,
  withRouter,
} from "../../components/PropsWrapper/PropsWrapper";
import io from "socket.io-client";
import Domino from "../../components/Domino/Domino";
import "./Lobby.css"

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
      console.log(response);
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

    socket.on("lobby:player:joined", (playerData) => {
      console.log(playerData);
    });

    socket.on("lobby:player:left", (playerData) => {
      console.log(playerData);
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
      this.state.socket.emit("lobby:play", this.state.id, this.state.selectedDomino, this.state.selectedSide, () => {

      });
      this.setState({
        selectedDomino: "",
        selectedSide: "",
      });
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

  passPlay = () => {
    this.state.socket.emit("lobby:play", this.state.id, "--", "--", () => {
      console.log("HEY")
    });
  }


  render() {
    if (this.state.lobby) {
      if (this.state.lobby.started) {
        return (
          <div className={"gameStarted"}>
            <div class={"detailsContainer"}>
              <div>Board</div>
              <div style={{display: "flex"}} className={"dominoBoard"}>
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
            <div class={"detailsContainer"}>
              <div>Players</div>
              <div className={"playersHands"}>
                {this.state.lobby.players.map((player, index) => (
                  <div key={player.id} className={"playerHandContainer"}>
                    <div className={"playerName"}>
                      Player {index + 1} - {player.id} {player.id.toString() === this.state.lobby.currentPlayer.toString() ? "- Current Player" : ""}
                    </div>
                    <div style={{display: "flex", alignItems: "center"}} className={"playerHand"}>
                      {player.hand.map((domino) => (
                        <>
                          {player.isMe ? <Domino key={domino}
                                                 selected={domino === this.state.selectedDomino}
                                                 value={domino}
                                                 onClick={() => this.selectDomino(domino)}/>
                            : <Domino key={domino}
                                      selected={false}
                                      value={domino}/>}
                        </>
                      ))}
                      {player.isMe &&
                        <button onClick={this.passPlay} style={{width: "100px", height: "100px"}}>
                          Pass
                        </button>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={"gameMain"}>
            <div className={"gameDetails"}>
              <div className={"gameTitle"}>{this.state.lobby.id}</div>
              <div className={"gameButtons"}>
                {this.isUserLobbyCreator() && <div className={"gameButton"} onClick={this.startLobby}>Start</div>}
                <div className={"gameButton"}>Share</div>
                <div className={"gameButton"}>Leave</div>
              </div>
            </div>
            <div className={"gameLobbies"}>
              <div className={"lobbiesText"}>Players</div>
              <div className={"lobbies"}>
                {this.state.lobby.joinedPlayers.map((player, index) => (
                  <div key={player.id} className={"lobby"}>
                    <div className={"lobbyDetails"}>
                      <div className={"lobbyName"}>{player.id}</div>
                      {player.id.toString() === this.state.lobby.creator.toString() &&
                        <div className={"playerCount"}>Creator</div>}
                    </div>
                    <div className={"lobbyButtons"}>
                      {this.isUserLobbyCreator() && !player.isMe &&
                        <div className={"lobbyButton"}>
                          Kick
                        </div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default privateComponent(withRouter(Lobby));
