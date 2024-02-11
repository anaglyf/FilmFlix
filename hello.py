from flask import Flask, jsonify, render_template, abort, request, redirect, url_for, session
from functions import get_films, get_conn, search_films, report_films


"""
RUN COMMANDS:
set FLASK_APP=hello.py
$env:FLASK_APP = "hello.py"
flask run
"""
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_films', methods=['GET'])
def get_films_ajax():
    sort_by = request.args.get('sort_by', 'filmid')  # Default to sorting by title
    sort_order = request.args.get('sort_order', 'ASC').upper()  # Ensure it's either ASC or DESC

    films = get_films(sort_by, sort_order)  # Make sure this function is correctly fetching data
    return jsonify(films=[str(film) for film in films])

@app.route('/search', methods=['GET'])
def search_films_ajax():
    query = request.args.get('query')
    sort_by = request.args.get('sort_by', 'filmid')  # Default to sorting by title
    sort_order = request.args.get('sort_order', 'ASC').upper()  # Ensure it's either ASC or DESC

    results = search_films(query, sort_by, sort_order)
    return jsonify(results=[str(result) for result in results])

@app.route('/report', methods=['GET'])
def report_films_ajax():
    query = request.args.get('query')
    category = request.args.get('category', 'yearReleased')
    sort_by = request.args.get('sort_by', 'filmid')  # Default to sorting by title
    sort_order = request.args.get('sort_order', 'ASC').upper()  # Ensure it's either ASC or DESC

    results = report_films(query, category, sort_by, sort_order)
    return jsonify(results=[str(result) for result in results])

def get_rec(entry_id):
    conn, cursor = get_conn()
    rec = cursor.execute("SELECT * FROM tblfilms WHERE filmID = ?", (entry_id,)).fetchone()
    cursor.close()
    if rec is None:
        abort(404)
    return rec

@app.route('/delete_film/<int:entry_id>', methods=['POST'])
def delete_film(entry_id):
    conn, cursor = get_conn()
    cursor.execute("DELETE FROM tblfilms WHERE filmID = ?;", (entry_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Record deleted successfully'})

@app.route('/film/<string:title>/<int:id>')
def rec(title, id):
    title = title.replace('_', ' ')  # Replace underscores back to spaces
    records = get_recs_by_title(title)

    # Find the record with the matching ID
    record = next((r for r in records if r[0] == id), None)

    if record is None:
        abort(404)

    return render_template('record.html', rec=record)

def get_recs_by_title(title):
    conn, cursor = get_conn()
    recs = cursor.execute("SELECT * FROM tblfilms WHERE title LIKE ?", ('%'+title+'%',)).fetchall()
    cursor.close()
    return recs

@app.route('/update_film/<int:entry_id>', methods=['POST'])
def update_film(entry_id):
    # Extract data from the form
    title = request.form.get('title')
    year = request.form.get('yearReleased')
    rating = request.form.get('rating')
    duration = request.form.get('duration')
    genre = request.form.get('genre')

    # Connect to the database and update the record
    conn, cursor = get_conn()
    cursor.execute("UPDATE tblfilms SET title = ?, yearReleased = ?, rating = ?, duration = ?, genre = ? WHERE filmID = ?", (title, year, rating, duration, genre, entry_id))
    conn.commit()  # Committing the transaction
    cursor.close()
    conn.close()  # Close the connection

    format_title = title.replace("'", "").replace('"', '')

    return redirect(url_for('rec', title=format_title, id=entry_id))

@app.route('/add_film/', methods=['POST'])
def add_film():
    # Extract data from the form
    title = request.form.get('title')
    year = request.form.get('yearReleased')
    rating = request.form.get('rating')
    duration = request.form.get('duration')
    genre = request.form.get('genre')
    url = request.form.get('imageURL')

    # Check if any of the form fields are empty
    if not all([title, year, rating, duration, genre, url]):
        # Handle the error appropriately
        return "Error: All fields are required", 400

    # Connect to the database and insert the record
    conn, cursor = get_conn()
    cursor.execute("INSERT INTO tblfilms (title, yearReleased, rating, duration, genre, image_url) VALUES (?, ?, ?, ?, ?, ?)", (title, year, rating, duration, genre, url))
    id = cursor.lastrowid

    conn.commit()  # Committing the transaction

    cursor.close()
    conn.close()  # Close the connection

    format_title = title.replace("'", "").replace('"', '')
    
    return redirect(url_for('rec', title=format_title, id=id))