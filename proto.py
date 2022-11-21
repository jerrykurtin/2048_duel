from random import randint, sample
from enum import Enum

class board_state(Enum):
    WIN = 1
    CONTINUE = 0
    LOSS = -1

class Board:
    def __init__(self, board_size=4):
        self.board_size = board_size
        self.win_state = 2048
        self.squares_added = 1

        self.player = 0

        self.board = [[0 for r in range(board_size)] for c in range(board_size)]
        

        # initialize the first numbers
        st1 = [randint(0, self.board_size - 1), randint(0, self.board_size - 1)]
        st2 = [randint(0, self.board_size - 1), randint(0, self.board_size - 1)]
        while (st1 == st2):
            st2 = [randint(0, self.board_size - 1), randint(0, self.board_size - 1)]
        self.board[st1[0]][st1[1]] = 2
        self.board[st2[0]][st2[1]] = 2

    def move(self, dir):
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
            raise AttributeError("invalid move direction")
        
        # check for win condition and add squares
        cands = []
        for row in range(len(self.board)):
            for col in range(len(self.board[0])):
                # win!
                if self.board[row][col] == self.win_state:
                    return board_state.WIN
                # empty square
                elif self.board[row][col] == 0:
                    cands.append((row, col))
        

        # add new values to board
        added = sample(cands, self.squares_added)
        for val in added:
            self.board[val[0]][val[1]] = 2
        

        # check for loss
        if len(cands) <= self.squares_added:
            return board_state.LOSS
        else:
            return board_state.CONTINUE
    
    def left(self):
        """The function to make a left movement"""
        for row in range(len(self.board)):
            newrow = [0] * len(self.board)
            newidx = 0

            for col in range(len(self.board[0])):
                if self.board[row][col] != 0:
                
                    # merge
                    if newidx > 0 and self.board[row][col] == newrow[newidx - 1]:
                        newrow[newidx - 1] = newrow[newidx - 1] * -2    # negative prevents double merge

                    # add normally
                    else:
                        newrow[newidx] = self.board[row][col]
                        newidx += 1

            # update the row
            self.board[row] = list(map(abs, newrow))
    
    def right(self):
        """The function to make a right movement"""
        for row in range(len(self.board)):
            newrow = [0] * len(self.board)
            newidx = len(self.board[0]) - 1

            for col in range(len(self.board[0]) - 1, -1, -1):
                if self.board[row][col] != 0:
                
                    # merge
                    if newidx < len(self.board[0]) - 1 and self.board[row][col] == newrow[newidx + 1]:
                        newrow[newidx + 1] = newrow[newidx + 1] * -2    # negative prevents double merge

                    # add normally
                    else:
                        newrow[newidx] = self.board[row][col]
                        newidx -= 1

            # update the row
            self.board[row] = list(map(abs, newrow))

    def up(self):
        """The function to make an up movement"""
        for col in range(len(self.board[0])):
            newcol = [0] * len(self.board)
            newidx = 0

            for row in range(len(self.board)):
                if self.board[row][col] != 0:
                
                    # merge
                    if newidx > 0 and self.board[row][col] == newcol[newidx - 1]:
                        newcol[newidx - 1] = newcol[newidx - 1] * -2    # negative prevents double merge

                    # add normally
                    else:
                        newcol[newidx] = self.board[row][col]
                        newidx += 1

            # update the row
            for row in range(len(self.board)): 
                self.board[row][col] = abs(newcol[row])
    
    def down(self):
        """The function to make a down movement"""
        for col in range(len(self.board[0])):
            newcol = [0] * len(self.board)
            newidx = len(self.board) - 1

            for row in range(len(self.board) - 1, -1, -1):
                if self.board[row][col] != 0:
                
                    # merge
                    if newidx < len(self.board) - 1 and self.board[row][col] == newcol[newidx + 1]:
                        newcol[newidx + 1] = newcol[newidx + 1] * -2    # negative prevents double merge

                    # add normally
                    else:
                        newcol[newidx] = self.board[row][col]
                        newidx -= 1

            # update the row
            for row in range(len(self.board)): 
                self.board[row][col] = abs(newcol[row])

    def __repr__(self):
        ret = "\n\n".join(["\t".join(list(map(str, row))) for row in self.board])
        return ret
        

if __name__ == "__main__":
    my_board = Board()
    bst = board_state.CONTINUE


    print("Welcome to 2048! Control the board with wasd")

    while bst == board_state.CONTINUE:
        print("\nCurrent board:")
        print(my_board)
        dir = input()
        try:
            bst = my_board.move(dir)
        except AttributeError:
            print("invalid move, try again")

    print("Final state:")
    print(my_board)
    if bst == board_state.WIN:
        print("You won!")
    else:
        print("you lost :(")
