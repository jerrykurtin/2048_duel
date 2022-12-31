from flask import Flask, request
import flask
import json
from flask_cors import CORS
from objects import board

# setup the app
app = Flask(__name__)
CORS(app)

# health check
@app.route("/")
def hello():
    return "Backend reached successfully"

# returns the current board state
@app.route("/board", methods=["GET"])
def getBoard():
    data = {
        "board" : my_board.board,
        "owner" : my_board.owner,
        "state" : str(bst)[6:],
        "p1score" : my_board.p1score,
        "p2score" : my_board.p2score,
        "turn" : my_board.player + 1,
        }
    return flask.jsonify(data)

# makes a move
@app.route("/move", methods=["POST"])
def move():
    global bst
    if bst == board.state.CONTINUE or bst == board.state.NO_CHANGE:
        # read the move
        in_data = request.get_json()
        usr_move = in_data["move"]

        # make the move
        bst = my_board.move(usr_move)

    return getBoard()

@app.route("/reset", methods=["POST"])
def reset():
    global my_board
    global bst
    my_board = board.Board(4, 64)
    bst = board.state.CONTINUE

    return getBoard()

if __name__ == "__main__":
    # setup the objects
    my_board = board.Board(4, 64)
    bst = board.state.CONTINUE
    app.run("localhost", 6969)