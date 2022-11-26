import os
from flask import *
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# --------------- Configure the app ---------------
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+file_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()
db.init_app(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


# --------------- Database ---------------
# Create database tables
class ContactModel(db.Model):
    __tablename__ = "table"
 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True)
 
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"{self.name}"

# build tables when first run
@app.before_first_request
def create_table():
    db.create_all()

# --------------- Endpoints ---------------
@app.route("/")
def ping():
    return "hello world"

@app.route('/data/create' , methods = ['GET','POST'])
def create():
    if request.method == 'GET':
        return jsonify({"success": True, "message": "this is the create endpoint"}), 201
 
    if request.method == 'POST':
        request_data = json.loads(request.data)
        name = request_data['name']
        contact = ContactModel(name=name)
        db.session.add(contact)
        db.session.commit()
        return jsonify({"success": True, "message": "contact added successfully"}), 201

def contact_serializer(contact):
    return {'name': contact.name}

@app.route('/data')
def retrieveDataList():
    return jsonify([*map(contact_serializer, ContactModel.query.all())])


@app.route('/data/delete', methods=['GET','POST'])
def delete():
    request_data = json.loads(request.data)
    name = request_data['name']
    contact = ContactModel.query.filter_by(name=name).first()
    if request.method == 'POST':
        if contact:
            db.session.delete(contact)
            db.session.commit()
            return jsonify({"success": True, "message": "Contact deleted successfully"}), 201
        abort(404)
 
    return jsonify({"success": True}), 201

if __name__ == "__main__":
    app.run()
