import objects.board as board
import sys, select
import random

def get_dir(delay):
    if (delay == 0):
        delay = 99999

    # non-lightning round, has a warning
    if delay > 5:
        i, _, _ = select.select( [sys.stdin], [], [], delay - 2)
        if not i:
            print("\nWarning: 2 seconds left ->", end="")
        i, _, _ = select.select( [sys.stdin], [], [], 2)

    # lightning round
    else:
        i, _, _ = select.select( [sys.stdin], [], [], delay)

    if i:
        return sys.stdin.readline().strip(), True
    else:
        return random.choice(["w", "a", "s", "d"]), False

if __name__ == "__main__":
    my_board = board.Board(4, 64)
    bst = board.state.CONTINUE


    print("Welcome to 2048! Control the board with wasd")
    print("claim opponents' squares on your move")
    print("after you move, your opponent gets a new 2 square, so be careful!")
    print(f"the first person to steal all squares or reach a square of {my_board.win_state} wins!")
    time_limit = ""
    while True:
        time_limit = input("Enter the time limit for moves (seconds): ")
        if time_limit == "":
            time_limit = 0
            break
        try:
            time_limit = float(time_limit)
        except:
            print("invalid number")
        else:
            break    
    if time_limit == 0:
        print("No time limit selected")
    else:
        print(f"time limit of {time_limit} selected")        

    # main loop
    while bst == board.state.CONTINUE or bst == board.state.NO_CHANGE:
        # print current state
        print("\n\n")
        print(my_board)
        print(f"P1 score: {my_board.p1score}, P2 score: -{my_board.p2score}")

        # Take move from user
        print(f"\nPlayer {my_board.player + 1}, enter your move -> ", end="")
        dir, success = get_dir(time_limit)
        if not success:
            print(f"Time limit exceeded, auto-selecting {dir}")
        try:
            bst = my_board.move(dir)
            while bst == board.state.NO_CHANGE:
                print(f"Nothing changed, Player {my_board.player + 1}, move again")
                dir, success = get_dir(time_limit)
                if not success:
                    print(f"Time limit exceeded, auto-selecting ->{dir}")
                bst = my_board.move(dir)

        except ValueError:
            print("invalid move, try again")

    # print endgame message
    print("Final state:")
    print(my_board)

    if bst == board.state.WIN1:
        print("Player 1 won!")

    elif bst == board.state.WIN2:
        print("Player 2 won!")

    else:
        if my_board.p1score > my_board.p2score:
            print("Player 1 wins by score!")
        elif my_board.p1score < my_board.p2score:
            print("Player 2 wins by score!")
        else:
            print("It's a tie!")