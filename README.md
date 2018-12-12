# Assignment 2 - Web API - Automated development process.

Name: Wenjie Pan

## Overview.

The main function of the library management app is to add, delete, and verify

## API endpoints.
+get:
/books : find all of books
/books/1/detail : find all of the book with other models' data(Multi-table query) 
/books/:book_name : find book details by entering any words in book name(fuzzy search)
/books/amounts : show the amounts of book in the system.
/publisher/:id[the one not included in book] : find book detail by id
+post:
/books : add a book detail
/books/authenticate : post the token before operation[authentication]
+put:
/books/:id/add : add the count of the book in sysytem.
/books/:id : update one book's information by id
/booktype/:id/vote : add the booktype counts by id/vote
+delete:
/books/:id : delete one book by id
/books : delete all information in collection
        


## Continuous Integration and Test results.

. . . URL of the Travis build page for web API, e.g.

https://travis-ci.org/panwenjie123456/webapiTest

. . . URL of published test coverage results on Coveralls, e.g.  

https://coveralls.io/github/panwenjie123456/webapiTest


## Extra features.
+[authentication]:
   first, as an administrator we should set username/password first because that is more secure than post.
   secondly we post user name/password for a token
   finaly we use token to authenticate the identity for opreations
   
  one  of  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDA1NzkwNDMsImV4cCI6MTU0MDU4MDQ4M30.uA0VsITqy9KN4uzes8E1KWE60OJ5QaN74e4nA1rZ5JQ"
+DX (Developer eXperience) :Automated testing /npm test---------->>git status persistent
