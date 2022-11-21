from random import randint, sample
from enum import Enum

class state(Enum):
    WIN2 = 2
    WIN1 = 1
    CONTINUE = 0
    LOSS = -1
    NO_CHANGE = -2

class Board:
    def __init__(self, board_size=4, win_state=2048):
        self.board_size = board_size
        self.win_state = win_state
        self.squares_added = 1
        self.player = 0

        self.board = [[0 for r in range(board_size)] for c in range(board_size)]
        self.owner = [[-1 for r in range(board_size)] for c in range(board_size)]

        # initialize the first numbers
        st1 = [randint(0, self.board_size - 1), randint(0, self.board_size - 1)]
        st2 = [randint(0, self.board_size - 1), randint(0, self.board_size - 1)]
        while (st1[0] == st2[0] or st1[1] == st2[1]):
            st2 = [randint(0, self.board_size - 1), randint(0, self.board_size - 1)]
        self.board[st1[0]][st1[1]] = 2
        self.owner[st1[0]][st1[1]] = 0

        self.board[st2[0]][st2[1]] = 2
        self.owner[st2[0]][st2[1]] = 1

        self.p1score = 2
        self.p2score = 2

    def move(self, dir):
        prev_state = [[col for col in row] for row in self.board]
        # call the proper move function
        dir = dir.lower()
        if dir == "w":
            self.up()
        elif dir == "s":
            self.down()
        elif dir == "a":
            self.left()
        elif dir == "d":
            self.right()
        else:
            raise ValueError("invalid move direction")

        # check for no change
        if self.board == prev_state:
            return state.NO_CHANGE
        
        # check for win condition and add squares
        cands = []
        self.p1score = 0
        self.p2score = 0
        for row in range(len(self.board)):
            for col in range(len(self.board[0])):
                # win!
                if self.board[row][col] == self.win_state:
                    if self.owner[row][col] == 0:
                        return state.WIN1
                    else:
                        return state.WIN2
                
                # empty square
                elif self.board[row][col] == 0:
                    cands.append((row, col))
                # track ids to see if anybody has been eliminated
                else:
                    if self.owner[row][col] == 0:
                        self.p1score += self.board[row][col]
                    else:
                        self.p2score += self.board[row][col]
        
        # elimination win
        if self.p1score == 0:
            return state.WIN2
        elif self.p2score == 0:
            return state.WIN1

        # add new values to board
        added = sample(cands, self.squares_added)
        for val in added:
            self.board[val[0]][val[1]] = 2
            self.owner[val[0]][val[1]] = self.player
            if self.player == 0:
                self.p1score += 2
            else:
                self.p2score += 2
        
        # switch to the next player
        self.player = (self.player + 1) % 2
        
        # check for loss
        if len(cands) <= self.squares_added:
            return state.LOSS
        else:
            return state.CONTINUE
    
    def left(self):
        """The function to make a left movement"""
        for row in range(len(self.board)):
            newrow = [0] * len(self.board)
            newowner = [-1] * len(self.board)
            newidx = 0
            

            for col in range(len(self.board[0])):
                if self.board[row][col] != 0:
                
                    # merge
                    if newidx > 0 and self.board[row][col] == newrow[newidx - 1]:
                        newrow[newidx - 1] = newrow[newidx - 1] * -2    # negative prevents double merge
                        
                        # determine ownership of new square
                        if newowner[newidx - 1] != self.owner[row][col]:
                            newowner[newidx - 1] = self.player


                    # add normally
                    else:
                        newrow[newidx] = self.board[row][col]
                        newowner[newidx] = self.owner[row][col]
                        newidx += 1

            # update the row
            self.board[row] = list(map(abs, newrow))

            # update the owner
            self.owner[row] = newowner
    
    def right(self):
        """The function to make a right movement"""
        for row in range(len(self.board)):
            newrow = [0] * len(self.board)
            newowner = [-1] * len(self.board)
            newidx = len(self.board[0]) - 1

            for col in range(len(self.board[0]) - 1, -1, -1):
                if self.board[row][col] != 0:
                
                    # merge
                    if newidx < len(self.board[0]) - 1 and self.board[row][col] == newrow[newidx + 1]:
                        newrow[newidx + 1] = newrow[newidx + 1] * -2    # negative prevents double merge

                        # determine ownership of new square
                        if newowner[newidx + 1] != self.owner[row][col]:
                            newowner[newidx + 1] = self.player

                    # add normally
                    else:
                        newrow[newidx] = self.board[row][col]
                        newowner[newidx] = self.owner[row][col]
                        newidx -= 1

            # update the row
            self.board[row] = list(map(abs, newrow))

            # update the owner
            self.owner[row] = newowner

    def up(self):
        """The function to make an up movement"""
        for col in range(len(self.board[0])):
            newcol = [0] * len(self.board)
            newowner = [-1] * len(self.board)
            newidx = 0

            for row in range(len(self.board)):
                if self.board[row][col] != 0:
                
                    # merge
                    if newidx > 0 and self.board[row][col] == newcol[newidx - 1]:
                        newcol[newidx - 1] = newcol[newidx - 1] * -2    # negative prevents double merge

                        # determine ownership of new square
                        if newowner[newidx - 1] != self.owner[row][col]:
                            newowner[newidx - 1] = self.player

                    # add normally
                    else:
                        newcol[newidx] = self.board[row][col]
                        newowner[newidx] = self.owner[row][col]
                        newidx += 1

            # update the row and owner
            for row in range(len(self.board)): 
                self.board[row][col] = abs(newcol[row])
                self.owner[row][col] = newowner[row]
    
    def down(self):
        """The function to make a down movement"""
        for col in range(len(self.board[0])):
            newcol = [0] * len(self.board)
            newowner = [-1] * len(self.board)
            newidx = len(self.board) - 1

            for row in range(len(self.board) - 1, -1, -1):
                if self.board[row][col] != 0:
                
                    # merge
                    if newidx < len(self.board) - 1 and self.board[row][col] == newcol[newidx + 1]:
                        newcol[newidx + 1] = newcol[newidx + 1] * -2    # negative prevents double merge

                        # determine ownership of new square
                        if newowner[newidx + 1] != self.owner[row][col]:
                            newowner[newidx + 1] = self.player

                    # add normally
                    else:
                        newcol[newidx] = self.board[row][col]
                        newowner[newidx] = self.owner[row][col]
                        newidx -= 1

            # update the row
            for row in range(len(self.board)): 
                self.board[row][col] = abs(newcol[row])
                self.owner[row][col] = newowner[row]

    def __repr__(self):
        printarr = [[col for col in row] for row in self.board]
        for row in range(len(printarr)):
            for col in range(len(printarr[0])):
                if printarr[row][col] == 0:
                    printarr[row][col] = "."
                if self.owner[row][col] == 1:
                    printarr[row][col] *= -1

        ret = "\n\n".join(["\t".join(list(map(str, row))) for row in printarr])
        return ret
        

if __name__ == "__main__":
    pass