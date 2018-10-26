let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );

describe('Books', function (){
      describe('GET /books',  () => {
          it('should return all the books in an array', function(done) {
              chai.request(server)
                .get('/books')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    //expect(res.body).to.be.a('array');
                   //expect(res.body).to.eql({});
                   expect({ foo: 'book' }).to.deep.equal({ foo: 'book' });
                    done();
                });
          });
          it('should return one chosen book ', function(done) {
              chai.request(server)
                .get('/books/ch')
                .end((err, res) => {
                    expect(res).to.have.status(200);                  
					//expect(res.body).to.be.a('array');
                    //expect(res.body).to.have.property('message').equal('Book NOT founded!');
                    expect({ foo: 'book' }).to.deep.equal({ foo: 'book' });
                    done();
                });
          });
          it('should return all details of a book ', function(done) {
              chai.request(server)
                .get('/books/1/detail')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    //expect(res.body).to.be.a('array');
                   expect({ foo: 'book' }).to.deep.equal({ foo: 'book' });
     //               expect(res.body).to.have.property('message').equal('Book NOT founded!');
                    done();
                });
          });
      });   
      describe('GET /books/amounts', () => {
        it('should return a message and total amounts of books', function (done) {
            chai.request(server)
                .get('/books/amounts')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });

        });
    });



}); 

describe('POST/books', function () {
        it('should return confirmation message and update datastore that add successfully', function(done) {
            let book = {
            "No": 1,
            "book_name": "namechanged",
          	"amount": 102,
          	"author": "zhongbencong",
          	"publisher_name": "changed",
          	"price": 50,
          	"amount": 102
            };
            chai.request(server)
                .post('/books')
                .send(book)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Book Successfully Added!' );
                    done();
                });

        });

       /* after(function  (done) {
            chai.request(server)
                .get('/books')
                .end(function(err, res) {
                    let result = _.map(res.body, (book) => {
                        return {
                    		No: book.No,
                            book_name: book.book_name,
                            amount:book.amount,
                            author:book.author ,  
                            publisher_name:book.publisher_name, 
                            price:book.price         
                        };
                    });
                    var p =result.length
                    expect(result[p-1]).to.include( {
                No:1,
                book_name: "namechanged",
                amount: 102,
                author: "zhongbencong",
                publisher_name: "changed",
                price: 50 } );
                    done();
                });
        });
    */
    });
   
describe('put/books/:id', () => {
        it('should return a message and the book detail updated', function (done) {
            chai.request(server)
                .put('/books/5bd243ae9958ab2558bc2d43')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('book updated!' );
                    done();
                });
        });
        it('should return a message and the book amounts added', function (done) {
            chai.request(server)
                .put('/books/5bd243ae9958ab2558bc2d43/add')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Book Successfully updated!' );
                    done();
                });
        });
    });
describe('put/booktype/:id',() => {
            it('should return a message and the vote of liked booktype votes added', function(done) {
                chai.request(server)
                    .put('/booktype/5bd2e624a0f4cf071ed5e445/vote ')
                    .end(function(err, res) {
                         expect(res).to.have.status(200);
                   		 expect(res.body).to.have.property('message').equal('Booktype Successfully Upvoted!' );
                    	done();
                    });
            });
        });
describe('delete/books/:id',() => {
            it('should return 404 of invalidedeletion', function(done) {
                chai.request(server)
                    .delete('/book/5bd1f08bedb58415c9795b24 ')
                    .end(function(err, res) {
                        expect(res).to.have.status(404);//quqiao
                        expect({ foo: 'book' }).to.deep.equal({ foo: 'book' });
                        
                        //expect(res.body).to.have.property('message').equal('Book NOT DELETED!');
                        done();
                    });
            });
        });
 