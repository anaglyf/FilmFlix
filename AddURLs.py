from connect import *

with open(r'Python\Week 2\D5\imageURLS.txt', 'r') as file:
    links = file.readlines()

# for i, link in enumerate(links):

#     print(f"{i}: {link}")
    

# dbCursor.execute("""
#                  ALTER TABLE tblfilms
#                  ADD image_url VARCHAR(255)
#                  """)

# for i, link in enumerate(links):
#     j = i + 1
#     dbCursor.execute(f"UPDATE tblfilms SET image_url = '{link.strip()}' WHERE filmid = {j}")
    
dbCursor.execute("UPDATE tblfilms SET image_url = 'https://xl.movieposterdb.com/16_01/2016/3040964/xl_3040964_df25d434.jpg?v=2024-01-12%2014:24:00' WHERE title = 'The Jungle Book'")

dbCon.commit()