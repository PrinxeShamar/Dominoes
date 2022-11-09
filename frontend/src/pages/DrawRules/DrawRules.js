import logo from "../../images/logo/logo.png"
import { Link } from "react-router-dom";

export default function DrawRules() {
  return (
    <div>
      <Link to="/" id="logo">
        <img src={logo} />
      </Link>
      <h1>Draw Rules</h1>
      <h3>Setup</h3>
      <p>Shuffle the dominoes. Each player draws the same amount of
      dominoes. The remaining dominoes are in the “boneyard”.</p>
      <h3>Gameplay</h3>
      <p>If this is the first round, the player with the highest double (usually double 6)
      places that double as the first domino. In the event that no player has a
      double, redo the setup. If this is not the first round, the last winner
      plays first. Play proceeds to the left (clockwise). Each player adds a
      domino to an open end of the layout if they can. Note that the layout may
      flow in any direction, turning as necessary. In the “draw” game, players
      must draw tiles from the boneyard if they cannot make a move. If the
      boneyard is empty, that player must pass. The game ends when one player
      uses the last domino in his hand or no more plays can be made. If all
      players still have tiles in their hands, but can more no moves can be
      made, then the game is said to be "blocked". Note that there is no
      difference between “draw” and “block” rules if the boneyard is empty.</p>
      <h3>Scoring</h3>
      <p>If the game ended because someone placed their last domino, that
      person is the winner. If the game ended because it was “blocked”, the
      winning player is the player with the lowest sum of the dominoes in their
      hand. The win goes to the player with the lightest individual tile if
      there is a tie. For example, if one player has a 1-2, 2-4, and 3-5, and
      the other player has a 5-5 and a 3-4, they both have a total of 17, but
      the first player wins because his lightest tile (1-2) is smaller than the
      second player's lightest tile (3-4). The winning player wins the sum total
      of points in all of the opponents' hands. Games are often played in a
      number of rounds, where the score in each individual round (or hand) is
      added to the score in the previous rounds. When one player's total score
      exceeds a pre-established "winning score" (100, for example), the game is
      over and the winner is declared.</p>
    </div>
  );
}
