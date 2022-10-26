export default function Rules() {
  return (
    <div>
      <h1>Block Rules</h1>
      Setup: Shuffle the dominoes. Each player draws the same amount of
      dominoes. The remaining dominoes are in the “boneyard”. For block
      dominoes, the boneyard will remain unused for the rest of the round. Block
      is usually played with 4 players each drawing 7 dominoes, so there would
      be no boneyard. Gameplay: If this is the first round, the player with the
      highest double (usually double 6) places that double as the first domino.
      In the event that no player has a double, redo the setup. If this is not
      the first round, the last winner plays first. Play proceeds to the left
      (clockwise). Each player adds a domino to an open end of the layout if
      they can. Note that the layout may flow in any direction, turning as
      necessary. A player will pass if and only if they cannot make a move. In
      the “block” game, players may not draw tiles from the boneyard. The game
      ends when one player uses the last domino in his hand or no more plays can
      be made. If all players still have tiles in their hands, but can more no
      moves can be made, then the game is said to be "blocked". Scoring: If the
      game ended because someone placed their last domino, that person is the
      winner. If the game ended because it was “blocked”, the winning player is
      the player with the lowest sum of the dominoes in their hand. If there is
      a tie, the win goes to the player with the lightest individual tile. For
      example, if one player has a 1-2, 2-4, and 3-5, and the other player has a
      5-5 and a 3-4, they both have a total of 17, but the first player wins
      because his lightest tile (1-2) is smaller than the second player's
      lightest tile (3-4). The winning player wins the sum total of points in
      all of the opponents' hands. Games are often played in a number of rounds,
      where the score in each individual round (or hand) is added to the score
      in the previous rounds. When one player's total score exceeds a
      pre-established "winning score" (100, for example), the game is over and
      the winner is declared.
    </div>
  );
}
