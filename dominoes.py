"""
Domino Project

An attempt at analyzing the game of dominoes and creating
a function that determines the best move given the set of
players in move order and the dominoes both on the table
and in the hand. The previous moves of the other players
will also be necessary.

A set of dominoes is a dict
"""

from fractions import Fraction
import random as r
import time as t
from tqdm import tqdm
import sys
from collections import defaultdict

DEBUG = True
VERBOSE = True



class Domino(object):
    # TODO implement interning
    maxval = 6
    minval = 0
    def __init__(self, x, y=None):
        if y == None:
            y = x
        self.numset = {x, y}
        self.x, self.y = min(self.numset), max(self.numset)
        assert(max(self.numset) <= self.maxval)
        assert(self.minval <= min(self.numset))
        #maybe this can extend to all ranges???
        
    def __add__(self, other):
        return int(self) + other
    
    def __radd__(self, other):
        return int(self) + other
    
    def __int__(self):
        return sum(self.numset)*(3-len(self.numset))
    
    def __sum__(self):
        return int(self)
    
    def __str__(self):
        return f"[{'|'.join(sorted([str(i) for i in self.numset]))}]"
    
    def sidedStr(self, reverse=False):
        if reverse:
            return f"[{self.y}|{self.x}]"
        return str(self)
    
    def __lt__(self, other):
        if type(other) != Domino:
            return False
        if int(self) != int(other):
            return int(self) < int(other)
        else:
            return max(self.numset) < max(other.numset)
    
    def __eq__(self, other):
        if type(other) != Domino:
            return False
        return other.numset == self.numset
    
    def __hash__(self):
        temp_list = list(self.numset)
        if len(temp_list) == 1:
            temp_list.append(temp_list[0])
        temp_list.sort()
        i = temp_list[0]
        x = (-(i-15)*(i)//2)
        j = temp_list[1]
        y = j-i
        return x+y
    
    def copy(self):
        return Domino(*self.numset)
    
    def getSet(self):
        return self.numset.copy()


class Hand(object):
    def __init__(self, hand=None):
        if hand is None:
            hand = set()
        self.hand = set(hand).copy()
    
    def __len__(self):
        return len(self.hand)
    
    def __iter__(self):
        return iter(sorted(list(self.hand)))
    
    def __int__(self):
        return self.total()
    
    def __lt__(self, other):
        return self.total() < other.total()
    
    def __str__(self):
        return ', '.join(sorted([str(i) for i in self.hand]))
    
    def __add__(self, other):
        return int(self) + other
    
    def __radd__(self, other):
        return other + int(self)
    
    def total(self):
        t = 0
        for d in self.hand:
            t += int(d)
        return t
    
    def copy(self):
        return Hand(self.hand)
    
    def play(self, dom):
        self.hand.remove(dom)
    
    def draw(self, dominoes):
        chosen = r.choice(list(dominoes))
        self.hand.add(chosen.copy())
        return chosen.copy()
    
    def asSet(self):
        return self.hand.copy()


class Board(object):
    def __init__(self):
        self.reset()
        
    def __str__(self):
        return self.board_str
        
    def play(self, domino, side):
        if not self.canPlay(domino, side):
            return False
        if len(self.edges) >= 3:
            assert(self.edges == [0, 1, 2, 3, 4, 5, 6])
            self.board.append(domino)
            for s in domino.getSet():
                self.num_counts[s] += 1
                if self.num_counts[s] == 6:
                    self.last_set.add(s)
            self.board_str = str(domino)
            self.edges = [domino.x, domino.y]
            assert(self.edges == sorted(self.edges))
            return
        
        lr = 0
        if side == self.edges[1]:
            lr = 1
        if domino.x == side:
            other_side = domino.y
        else:
            other_side = domino.x
        add_str = ""
        #TODO BUG: sometimes flips incorrectly when placing on a double
        if (side == domino.x and lr == 0) or (side == domino.y and lr == 1):
            add_str = domino.sidedStr(False)
        else:
            add_str = domino.sidedStr(True)
        
        if lr == 0:
            self.board_str = self.board_str + add_str
        else:
            self.board_str = add_str + self.board_str
        
        self.edges[lr] = other_side
        self.board.insert(lr*len(self.board), domino)
        for s in domino.getSet():
            self.num_counts[s] += 1
            if self.num_counts[s] == 6:
                self.last_set.add(s)
        
    def canPlay(self, domino, side):
        if self.board == list():
            assert(self.edges == [0, 1, 2, 3, 4, 5, 6])
        return side in set(self.edges).intersection(domino.getSet())
    
    def getEdges(self):
        return set(self.edges)
    
    def reset(self):
        self.board = list()
        self.edges = [0, 1, 2, 3, 4, 5, 6]
        self.board_str = ""
        self.num_counts = defaultdict(lambda: 0) 
        self.last_set = set()

class Strat(object):
    def __init__(self, strat):
        self.strat_str = strat.lower()
        self.build()
        self.hand = None
        self.blocklist = None
        self.board = None
        
    def __str__(self):
        return self.strat_str
    
    def build(self):
        self.build_list = []
        for char in self.strat_str:
            self.build_list.append(self.strats[char])
        
    def choose(self, playable, hand, blocklist, board):
        """
        Returns: (domino, lr)
        """
        # playable is a dict
        self.hand = hand
        self.blocklist = blocklist
        self.board = board
        ans = playable
        for func in self.build_list:
            ans = func(self, ans)
            if len(ans) == 1 and len(ans[next(iter(ans.keys()))]) == 1:
                break
        # TODO implement all the strat functions
        domino = r.choice(list(ans.keys()))
        edge = r.choice(ans[domino])
        return (domino, edge)
    
    def blank_check(self, playable, ans):
        if len(ans) == 0:
            return playable
        else:
            return ans
    
    def price(self, playable):
        """
        Most expensive domino. This can be more than 1 (Ex: [3] and [6,0])
        """
        ans = defaultdict(lambda: list())
        maxval = int(max(playable.keys()))
        for key in playable.keys():
            if int(key) == maxval:
                for edge in playable[key]:
                    ans[key].append(edge)
        return self.blank_check(playable, ans)
    
    def double(self, playable):
        """
        Set of doubles
        """
        ans = defaultdict(lambda: list())
        for key in playable.keys():
            if len(key.getSet()) == 1:
                for edge in playable[key]:
                    ans[key].append(edge)
        return self.blank_check(playable, ans)
    
    def lock(self, playable):
        """
        Set of locking plays (ends the game)
        """
        ans = defaultdict(lambda: list())
        last_set = self.board.last_set.copy()
        edges = self.board.edges 
        for key in playable.keys():
            for p in key.getSet().intersection(last_set):
                #For each number in the set of last that I could play
                # TODO Smells
                if len(set(edges)) == 1 and len(key.getSet())==1:
                    ans[key].append(edges[0])
                    continue
                for e in playable[key]:
                    if not p == e:
                        ans[key].append(e)
        return self.blank_check(playable, ans)
    
    def block(self, playable):
        """
        Set of moves that could block the next person.
        If possible, make sure it's a guaranteed block.
        """
        ans = defaultdict(lambda: list())
        blocks = self.blocklist[0]
        edges = self.board.edges
        
        for key in playable.keys():
            for p in key.getSet().intersection(blocks):
                #For each number in the set of last that I could play
                if len(set(edges)) == 1 and len(key.getSet())==1:
                    ans[key].append(edges[0])
                    continue
                for e in playable[key]:
                    if not p == e:
                        ans[key].append(e)
        if len(ans) == 0:
            for key in playable.keys():
                for p in key.getSet():
                    #For each number in the set of last that I could play
                    if len(set(edges)) == 1 and len(key.getSet())==1:
                        ans[key].append(edges[0])
                        continue
                    for e in playable[key]:
                        if not p == e:
                            ans[key].append(e)
        return self.blank_check(playable, ans)
    
    def kill(self, playable):
        """
        Set of moves that keep a double from being played this cycle.
        If possible, make sure this is the last chance for a double.
        """
        ans = defaultdict(lambda: list())
        return self.blank_check(playable, ans)
    
    def monopoly(self, playable):
        """
        Set of moves that would leave the most of one number domino
        (Ex, play [2] to keep a hand of [5], [0,5], [4,5])
        """
        ans = defaultdict(lambda: list())
        return self.blank_check(playable, ans)
    
    def variety(self, playable):
        """
        Set of dominoes that leave you with 
        max variety in what numbers you can play
        """
        ans = defaultdict(lambda: list())
        return self.blank_check(playable, ans)
        
    
    """The strats dict will be used to cut the playable dict until it's 1 choice"""
    strats = {
            "p":price,
            "d":double,
            "l":lock,
            "b":block,
            "k":kill,
            "m":monopoly,
            "v":variety,
            }
    
class Sim(object):
    """
    Simulates a game of dominoes
    """
    domino_set =    {
                Domino(0, 0), Domino(0, 1), Domino(0, 2), Domino(0, 3), 
                Domino(0, 4), Domino(0, 5), Domino(0, 6), Domino(1, 1), 
                Domino(1, 2), Domino(1, 3), Domino(1, 4), Domino(1, 5), 
                Domino(1, 6), Domino(2, 2), Domino(2, 3), Domino(2, 4), 
                Domino(2, 5), Domino(2, 6), Domino(3, 3), Domino(3, 4), 
                Domino(3, 5), Domino(3, 6), Domino(4, 4), Domino(4, 5), 
                Domino(4, 6), Domino(5, 5), Domino(5, 6), Domino(6, 6)
                }
    
    def __init__(self, user=False, strats=None, goes=None, playto=1000, userstrat=None,
                 seed=None):
        if seed is None:
            seed = r.randrange(sys.maxsize)
            #seed = 3
            #Lock (ldp)
            #seed = 328899545345786016
            #seed = 4362456024183685403
            #seed = 536592943559694763
            r.seed(seed)
        self.seed = seed
        self.scores = [0]*4
        self.playto = playto
        self.gamenum = 0
        if userstrat is None: userstrat = ""
        self.userstrat = Strat(userstrat)
        self.winner = self.reset(user, strats, goes)
        printv("Seed:",seed)
        
        
    def reset(self, user, strats, goes):
        self.dominoes = self.domino_set.copy()
        
        if user != False: self.user = True
        else: self.user = False
        #TODO make this 4, including the user. Requires rework of userstrat
        if strats is None: strats = [""]*3
            
        self.strats = strats.copy()
        
        for s in self.strats:
            for c in s:
                assert(c in self.strat_tags)
        
        self.hands = list()
        
        old = 28
        
        for i in range(4):
            if DEBUG: 
                banner("Current deck")
                print(*self.dominoes, sep=", ")
            hand = set(r.sample(self.dominoes, 7))
            if DEBUG:
                banner("hand drawn")
                print(*hand, sep=", ")
            self.dominoes -= hand
            if DEBUG:
                banner("new deck")
                print(*self.dominoes, sep=", ")
            self.hands.append(Hand(hand))
            assert(old == len(self.dominoes)+7)
            old = len(self.dominoes)
            if DEBUG: print()
        self.blocklist = [set() for i in range(4)]
        self.board = Board()
        return self.turn(goes)
    
    def turn(self, goes):
        banner(f"New game #{self.gamenum+1}")
        self.board = Board()
        if goes is None:
            for i, hand in enumerate(self.hands):
                if Domino(6) in hand.asSet():
                    goes = i
                    self.play(goes, True)
            goes += 1
        pass_count = 0
        goes -= 1
        playing = (True, False)
        while(playing[0] and pass_count < 4):
            if goes == 3: goes = -1
            goes += 1
            playing = self.play(goes)
            if playing[1]: pass_count += 1
            else: pass_count = 0
            if DEBUG: t.sleep(1)
        if pass_count >= 4:
            old_goes = goes
            goes = self.hands.index(min(self.hands))
            banner(f"The game is locked\nPlayer {goes+1} wins")
            #if old_goes == 0: printv(self.seed); self.reveal_hands(); assert(False)
            
        else:
            banner(f"Player {goes+1} wins")
        self.reveal_hands()
        
        self.scores[goes] += sum(self.hands)
        
        self.gamenum += 1
        #print("Seed:",seed)
        
        if self.gamenum >= self.playto:
            winner = self.scores.index(max(self.scores))
            banner(f"Game is over (best of {self.playto})\nPlayer {winner+1} wins!")
            return winner
        else:
            if self.user: repeat = input("Play another game?\n>> ").lower()
            else: repeat = "y"
            if len(repeat) >= 1 and repeat[0] == 'y':
                return self.reset(self.user, None, goes)
    
    def reveal_hands(self):
        banner("reveal hands")
        for i,h in enumerate(self.hands):
            printv(f"{i+1}:\t{str(h)}")
            
    def new_scores(self):
        banner("new scores")
        for i,score in enumerate(self.scores):
            print(f"{i+1}:\t{score}")
            
    def play(self, goes, first=False):
        # Returns: (isPlaying, isPassing)
        playing = (True, False)
        hand = self.hands[goes]
        printv(self.board)
        banner(f"player {goes+1} is playing")
        if first:
            domino = Domino(6)
            self.board.play(domino, 6)
            hand.play(domino)
            return playing
        
        # Make dict of playable (dominoes, set(edges)) to play them on
        playable = defaultdict(lambda: list())
        edges = self.board.getEdges()
        for domino in hand:
            for edge in edges:
                if self.board.canPlay(domino, edge):
                    playable[domino].append(edge)
                    
        # Got dict
        playables = sorted(list(playable.keys()))
        if len(playables) == 0:
            banner(f"Pass: Player {goes+1} has no {' or '.join(str(i) for i in edges)}")
            for i in edges:
                self.blocklist[goes].add(i)
            if goes == 1: printv(self.seed); self.reveal_hands(); assert(False)
            return (True, True)
        else:
            if goes == 0:
                if self.user:
                    #picks the domino
                    user_input = None
                    if len(playables) == 1:
                        user_input = "0"
                    else:
                        while(user_input is None):
                            print(hand)
                            choice_str = '  '.join([str(' '*(len(str(x))//2)+str(i+1)+' '*(len(str(x))//2)) for i,x in enumerate(playables)])
                            playable_str = ', '.join([str(i) for i in playables])
                            user_input = input(f"Choose a domino to play:\n{playable_str}\n{choice_str}\n>> ")
                            if not user_input.isdigit() or int(user_input)-1 not in range(len(playables)):
                                print("INVALID INPUT - Try Again\n")
                                user_input = None
                                printv(self.board)
                    domino = sorted(list(playables))[int(user_input)-1]
                    
                    #Picks the edge
                    playable_edges = playable[domino].copy()
                    user_input = None
                    if len(playable_edges) == 1:
                        user_input = "0"
                    elif len(hand) == 1:
                        user_input = "0"
                        banner(f"Player {goes+1} can win on either side")
                    else:
                        while(user_input is None):
                            print(hand)
                            choice_str = "1      2"
                            playable_str = "Left   Right"
                            user_input = input(f"Choose a side to play onto:\n{playable_str}\n{choice_str}\n>> ")
                            if user_input not in {'1','2'}:
                                print("INVALID INPUT - Try Again")
                                user_input = None
                                printv(self.board)
                    # TODO edge is actually the wrong representation (rework)
                    edge = sorted(list(playable_edges))[int(user_input)-1]
                else:
                    banner("Bot plays for the user")
                    #picks the domino + edge
                    domino, edge = self.userstrat.choose(playable, hand, rope(goes, self.blocklist), self.board)
                    
                    #Picks the edge
                    # TODO fix this for cases where both edges are equal (double)
                    if len(hand) == 1 and len(list(playable[domino])) == 2:
                        banner(f"Player {goes+1} can win on either side")
            else:
                #picks the domino
                domino = r.choice(list(playables))
                
                #Picks the edge
                if len(hand) == 1 and len(list(playable[domino])) == 2:
                    banner(f"Player {goes+1} can win on either side")
                edge = r.choice(list(playable[domino]))
            self.board.play(domino, edge)
            hand.play(domino)
            
        # Check if the hand is empty (if they won)
        if len(self.hands[goes]) == 0: 
            playing = (False, False)
        
        return playing

def banner(s, end="\n", title=True):
    if not VERBOSE:
        return False
    l = len(s)
    if l == 0: return True
    if title: s = s.title()
    print('-'*l)
    print(s)
    print('-'*len(s), end=end)
    return True

def printv(a="", b="", c="", sep=" ", end="\n"):
    if VERBOSE: print(a, b, c, sep=sep, end=end)
    return VERBOSE

def handof(dominoes, choose):
    if DEBUG: banner(f"Generating hand of {choose}")
    return r.sample(dominoes, choose)

def assertsorteq(rhand):
    if not DEBUG: return
    banner("checking sort equality")
    for i in tqdm(range(100000), file=sys.stdout):
        a = r.sample(rhand, len(rhand))
        b = r.sample(rhand, len(rhand))
        #banner("a vs b")
        #print(*a, sep=", ")
        #print(*b, sep=", ")
        assert(sorted(a) == sorted(b))
        
def oddsOfWin(hand):
    hand = hand[:]
    hand.sort()
    ans = Fraction(0, 1)
    return ans

def rope(index, old):
    old = old[:]
    l = len(old)
    new = []
    #after
    for i in range(index+1, l):
        new.append(old[i])
    #before
    for i in range(0, index):
        new.append(old[i])
    return new
    
def searchAssert():
    total = 0
    end = 5000
    #       1.3897
    #B      1.4214
    for x in tqdm(range(end), position=0, leave=True):
        i = 0
        while (True):
            i += 1
            printv(f"Game #{i}")
            try:
                Sim(playto=1, userstrat="b")
            except AssertionError:
                total += i
                break
    ans = total/end
    print(f"Avg: {total/end}")
    return ans

def main():
    
    banner("Starting Domino Project")
    #winner = Sim(False, userstrat="", playto=1).winner
    #Strat("")
    # Attempt normal sim using uninitialized variables
    #game = Sim(playto=1, userstrat="ldp")
    #print(game.winner)
    #searchAssert()
    
        
        
    
    print(Sim(user=True, playto=1, userstrat="dp").winner)
    
    """
    while(True):
        #seed = r.randrange(sys.maxsize)
        #r.seed(seed)
        print(seed)
        Sim()
    """
    #print(seed)
    """
    seed = r.randrange(sys.maxsize)
    r.seed(seed)
    """

if __name__ == "__main__":
    DEBUG = False
    VERBOSE = True
    main()
    
    
    
        
        
    
    
    