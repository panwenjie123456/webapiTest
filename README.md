name:Wenjie Pan       
id:20082269

Model:[4 models with schema & related to each other]
relation:   book => book_name:String/ publisher_name:String,
            booktype => book_name:String
            publisher =>  publisher_name:String

CRUD Node Server[use bookmanage as example,it contains all functions except one]:
     get:
        1. /books : find all of books
        2. /books/1/detail : find all of the book with other models' data(Multi-table query) 
        3. /book/:book_name : find book details by entering any words in book name(fuzzy search)
        4. /books/amounts : show the amounts of book in the system.
        5. /publisher/:id[the one not included in book] : find book detail by id
     post:
        1. /books : add a book detail
        2. /books/authenticate : post the token before operation[authentication]
     put:
        1. /books/:id/add : add the count of the book in sysytem.
        2. /books/:id : update one book's information by id
        3. /booktype/:id/vote : add the booktype counts by id/vote
     delete:
        1. /books/:id : delete one book by id
        2. /books : delete all information in collection
        
[authentication]:
   first, as administrator we should set username/password first because that is more secure than post.
   secondly we post user name/password for a token
   finaly we use token to authenticate the identity for opreations
   
  one  of  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDA1NzkwNDMsImV4cCI6MTU0MDU4MDQ4M30.uA0VsITqy9KN4uzes8E1KWE60OJ5QaN74e4nA1rZ5JQ"
   
Persistence :mongoose,mongodb,,deploy to github  heroku



DX (Developer eXperience) :Automated testing /npm test---------->>git status persistent
                           
   