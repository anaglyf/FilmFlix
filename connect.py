import sqlite3 as sql

dbCon = sql.connect(r"C:\Users\Alex\Desktop\JustIT Training\Python\Week 2\D5\filmflix.db")
dbCursor = dbCon.cursor()