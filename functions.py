import sqlite3

def get_conn():
    conn = sqlite3.connect(r"C:\Users\Alex\Desktop\JustIT Training\Python\Week 2\D5\filmflix.db")  # Use your database path
    cursor = conn.cursor()
    return conn, cursor

def get_films(sort_by='filmid', sort_order='ASC'):
    conn, cursor = get_conn()  # Unpack the tuple to get both conn and cursor
    cursor.execute(f"SELECT * FROM tblfilms ORDER BY {sort_by} {sort_order}")
    films = cursor.fetchall()
    cursor.close()
    conn.close()  # Close the connection as well
    return films

def search_films(query, sort_by='filmid', sort_order='ASC'):
    conn, cursor = get_conn()
    # Modify the SQL query to include ORDER BY clause
    sql_query = f"SELECT * FROM tblfilms WHERE title LIKE ? ORDER BY {sort_by} {sort_order}"
    cursor.execute(sql_query, ('%' + query + '%',))
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

def report_films(query, category='yearReleased', sort_by='filmid', sort_order='ASC'):
    conn, cursor = get_conn()
    # Safely construct the SQL query
    sql_query = f"SELECT * FROM tblfilms WHERE {category} LIKE ? ORDER BY {sort_by} {sort_order}"
    # Use a parameter only for the value part of the LIKE clause
    cursor.execute(sql_query, ('%'+query+'%',))
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results