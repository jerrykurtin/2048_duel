import objects.board as board

if __name__ == "__main__":
    my_board = board.Board(4, 64)
    bst = board.state.CONTINUE


    print("Welcome to 2048! Control the board with wasd")
    print("claim opponents' squares on your move")
    print("after you move, your opponent gets a new 2 square, so be careful!")
    print(f"the first person to steal all squares or reach a square of {my_board.win_state} wins!")

    while bst == board.state.CONTINUE:
        print("\n\n")
        print(my_board)
        print(f"P1 score: {my_board.p1score}, P2 score: {my_board.p2score}")
        # print("\nCurrent owner:")
        # print("\n\n".join(["\t".join(list(map(str, row))) for row in my_board.owner]))
        dir = input(f"\nPlayer {my_board.player + 1}, enter your move -> ")
        try:
            bst = my_board.move(dir)
            while bst == board.state.NO_CHANGE:
                dir = input(f"Nothing changed, Player {my_board.player + 1}, move again -> ")
                bst = my_board.move(dir)
        except ValueError:
            print("invalid move, try again")

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