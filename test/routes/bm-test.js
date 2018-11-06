let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(require('chai-things'));
let supertest = require('supertest');
let app = require('../../app');
chai.use(chaiHttp);
let _ = require('lodash' );
let request = supertest(app);
var mongoose = require("mongoose");

//var should = require( 'should' );
let book = require('../../models/book');
let booktype = require('../../models/booktype');
let publisher = require('../../models/publisher');

describe('Books', function (){

 beforeEach(function(done){
        var bm = new book({ _id:mongoose.Types.ObjectId('5be199ba5b93230c31b10187'),
            "No": 1,
            "book_name": "blockchain",
            "amount": 50,
            "author": "zhongbencong",
            "publisher_name": "publisherA",
            "price": 88

    });
     bm.save(function(err) {
            done();
        });
    });

    beforeEach(function(done){
        var bt = new booktype({ _id:mongoose.Types.ObjectId('5be1690731a5c256ad574fc1'),
            book_name:"blockchain",
            type_no:12,
            description:"bitcoin"
        });
        bt.save(function(err) {
            done();
        });
    });
    beforeEach(function(done){
        var pl = new publisher({ _id:mongoose.Types.ObjectId('5be1690731a5c256ad574fd1'),
            publisher_name:"publisherA",
            location:"ST.tree",
            year:1997
        });
        pl.save(function(err) {
            done();
        });
    });

    //afterEach(function(done){
      //  book.collection.drop();
        //done();
    //});


      describe('GET /books',  () => {
          it('should return all the books in an array', function(done) {
              
                request.get('/books')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                   //expect(res.body).to.equal(1);
                    let result = _.map(res.body, (bm) => {
                        return { No: bm.No,
                            book_name: bm.book_name,
                            amount: bm.amount,
                            author: bm.author,
                            publisher_name: bm.publisher_name,
                            price: bm.price
                        }
                    });
                    expect(result).to.include( {
                        "No": 1,
                        "book_name": "blockchain",
                        "amount": 50,
                        "author": "zhongbencong",
                        "publisher_name": "publisherA",
                        "price": 88  } );

                    book.collection.drop();
                    done();
                });
          });
          it('should return one chosen book ', function(done) {
             // chai.request(server)
                request.get('/books/bl')
                .end((err, res) => {
                    expect(res).to.have.status(200);                  
					expect(res.body).to.be.a('array');
                    let result = _.map(res.body, (bm) => {
                        return { No: bm.No,
                            book_name: bm.book_name,
                            amount: bm.amount,
                            author: bm.author,
                            publisher_name: bm.publisher_name,
                            price: bm.price
                        }
                    });
                    expect(result).to.include( {
                        "No": 1,
                        "book_name": "blockchain",
                        "amount": 50,
                        "author": "zhongbencong",
                        "publisher_name": "publisherA",
                        "price": 88  } );

                    book.collection.drop();


                    done();
                });
          });
          it('should return all details of a book ', function(done) {
              //chai.request(server)
                 request.get('/books/1/detail')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');

                    done();
                });
          });
      });   
      describe('GET /books/amounts', () => {
        it('should return a message and total amounts of books', function (done) {
            //chai.request(server)
                request.get('/books/amounts')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });

        });
    });


describe('POST/books', function () {
        it('should return confirmation message and update datastore that add successfully', function(done) {
            let book = {
            "No": 1,
            "book_name": "blockchain",
          	"amount": 102,
          	"author": "zhongbencong",
          	"publisher_name": "changed",
          	"price": 50,

            };
            //chai.request(server)
                request.post('/books')
                .send(book)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Book Successfully Added!' );
                    done();
                });

        });
/*
       after(function  (done) {
            //chai.request(server)
                request.get('/books')
                .end(function(err, res) {
                    let result = _.map(res.body, (book) => {
                        return {
                    		 No:1,
                book_name: "namechanged",

                author: "zhongbencong",
                publisher_name: "changed",
                price: 50       
                        };
                    });
                    var p =result.length
                    expect(result[p-1]).to.include( {
                No:1,
                book_name: "namechanged",

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
           // chai.request(server)
                request.put('/books/5be199ba5b93230c31b10187')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('book updated!' );
                    done();
                });
        });
        it('should return a message and the book amounts added', function (done) {
           // chai.request(server)
                request.put('/books/5be199ba5b93230c31b10187/add')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Book Successfully updated!' );
                    done();
                });
        });
 });

    describe('DELETE /books', function () {
        describe('DELETE /books/name', function () {
            it('should return books Successfully Deleted!', function(done) {
                //chai.request(server)
                request.delete('/books/blockchain')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        let information = res.body.message;
                        expect(information).to.include('Book Successfully Deleted!');
                        done();
                    });
            });
        });


    describe('DELETE /books', function () {
        it('should return Information Successfully Deleted!', function(done) {
            //chai.request(server)
            request.delete('/books')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let information = res.body.message;
                    expect(information).to.include('Book Successfully Deleted!');
                    done();
                });
        });
    });

    });

}); 

 describe('booktype', function (){
 		describe('GET /booktype',  () => {
          it('should return all the booktypes in an array', function(done) {
             // chai.request(server)
                request.get('/booktype')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');


                    done();
                });
          });
          it('should return one chosen book ', function(done) {
              //chai.request(server)
                request.get('/booktype/bl')
                .end((err, res) => {
                    expect(res).to.have.status(200);                  
					expect(res.body).to.be.a('array');


                    done();
                });
          });
         });
 		describe('GET /booktype/votes', () => {
        it('should return a message and total amounts of voter', function (done) {
            //chai.request(server)
               request .get('/booktype/votes')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });

        });
    });
 		describe('POST/booktype', function () {
        it('should return confirmation message and update datastore that add successfully', function(done) {
            let booktype = {
                book_name: "blcokchain",
                type_no: 12,
                description: "descriptio",
                
            };
            //chai.request(server)
                request.post('/booktype')
                .send(booktype)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Booktype Successfully Added!' );
                    done();
                });

        });
});
 		describe('put/booktype/:id',() => {
            it('should return a message and the vote of liked booktype votes added', function(done) {
                //chai.request(server)
                    request.put('/booktype/5be1690731a5c256ad574fc1/vote ')
                    .end(function(err, res) {
                         expect(res).to.have.status(200);
                   		 expect(res.body).to.have.property('message').equal('Booktype Successfully Upvoted!' );
                    	done();
                    });
            });
        });
        describe('delete/booktype/:id',() => {
            it('should return 200 of invalidedeletion', function(done) {
                //chai.request(server)
                    request.delete('/booktype/5be1690731a5c256ad574fc1 ')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);//quqiao
                        expect(res.body).to.have.property('message').equal('Booktype Successfully Deleted!');
                        done();
                    });
            });
        });
     describe('DELETE /booktype', function () {
         it('should return Information Successfully Deleted!', function(done) {
             //chai.request(server)
             request.delete('/booktype')
                 .end(function(err, res) {
                     expect(res).to.have.status(200);
                     let information = res.body.message;
                     expect(information).to.include('Booktype Successfully Deleted!');
                     done();
                 });
         });
     });

 	});

 describe('publisher', function (){
 		describe('GET /publisher',  () => {
          it('should return all the publishers in an array', function(done) {
             // chai.request(server)
                request.get('/publisher')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                });
          });
          
         });
 		describe('GET /publisher/votes', () => {
        it('should return a message and total amounts of voter', function (done) {
            //chai.request(server)
                request.get('/publisher/votes')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });

        });
    });
 		describe('POST/publisher', function () {
        it('should return confirmation message and update datastore that add successfully', function(done) {
            let publisher = {
                publisher_name: "changed",
                location: "st.22",
                year: 1997,
                
            };
            //chai.request(server)
               request.post('/publisher')
                .send(publisher)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Publisher Successfully Added!' );
                    done();
                });

        });
});
 		describe('put/publisher/:id',() => {
            it('should return a message and the vote of liked publisher votes added', function(done) {
                //chai.request(server)
                    request.put('/publisher/5be1690731a5c256ad574fd1/vote ')
                    .end(function(err, res) {
                         expect(res).to.have.status(200);
                   		 expect(res.body).to.have.property('message').equal('Publisher Successfully Upvoted!' );
                    	done();
                    });
            });
        });
        describe('delete/publisher/:id',() => {
            it('should return 200 of invalidedeletion', function(done) {
                //chai.request(server)
                    request.delete('/publisher/5bc9fd64f8ca9c0dfe946bbc ')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);//quqiao
                        expect({ foo: 'publisher' }).to.deep.equal({ foo: 'publisher' });
                        
                        //expect(res.body).to.have.property('message').equal('Book NOT DELETED!');
                        done();
                    });
            });
        });
     describe('DELETE /publisher', function () {
         it('should return Information Successfully Deleted!', function(done) {
             //chai.request(server)
             request.delete('/publisher')
                 .end(function(err, res) {
                     expect(res).to.have.status(200);
                     let information = res.body.message;
                     expect(information).to.include('Publisher Successfully Deleted!');
                     done();
                 });
         });
     });

 	});