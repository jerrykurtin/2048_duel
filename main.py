import objects.board as board

if __name__ == "__main__":
    my_board = board.Board()
    bst = board.state.CONTINUE


    print("Welcome to 2048! Control the board with wasd")

    while bst == board.state.CONTINUE:
        print("\nCurrent board:")
        print(my_board)
        print("\nCurrent owner:")
        print("\n\n".join(["\t".join(list(map(str, row))) for row in my_board.owner]))
        dir = input()
        try:
            bst = my_board.move(dir)
        except ValueError:
            print("invalid move, try again")

    print("Final state:")
    print(my_board)
    if bst == board.state.WIN:
        print("You won!")
    else:
        print("you lost :(")