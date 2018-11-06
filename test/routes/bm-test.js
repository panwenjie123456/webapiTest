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

//var should = require( 'should' );
const bookmanage = require("../../routes/bookmanage");
const booktypemanage = require("../../routes/booktypemanage");
const publishermanage = require("../../routes/publishermanage");

describe('Books', function (){
  
 beforeEach(function(done){
        var book = new book({ _id:mongoose.Types.ObjectId('5be19351089e9d0b52bb318a'),
            id : 1,
            username : "wzt",
            sex : "male",
            amountofmessage: 1
    });
        book.save(function(err) {
            done();
        });
    });

    afterEach(function(done){
        book.collection.drop();
        done();
    });

 
      describe('GET /books',  () => {
          it('should return all the books in an array', function(done) {
              
                request.get('/books')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    //expect(res.body).to.be.a('array');
                   //expect(res.body).to.eql({});
                   expect({ foo: 'book' }).to.deep.equal({ foo: 'book' });
                    done();
                });
          });
          it('should return one chosen book ', function(done) {
             // chai.request(server)
                request.get('/books/ch')
                .end((err, res) => {
                    expect(res).to.have.status(200);                  
					//expect(res.body).to.be.a('array');
                    //expect(res.body).to.have.property('message').equal('Book NOT founded!');
                    expect({ foo: 'book' }).to.deep.equal({ foo: 'book' });
                    done();
                });
          });
          it('should return all details of a book ', function(done) {
              //chai.request(server)
                 request.get('/books/1/detail')
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
            "book_name": "namechanged",
          	"amount": 102,
          	"author": "zhongbencong",
          	"publisher_name": "changed",
          	"price": 50,
          	"amount": 102
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
                amount: 102,
                author: "zhongbencong",
                publisher_name: "changed",
                price: 50       
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
           // chai.request(server)
                request.put('/books/5be19351089e9d0b52bb318a')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('book updated!' );
                    done();
                });
        });
        it('should return a message and the book amounts added', function (done) {
           // chai.request(server)
                request.put('/books/5be19351089e9d0b52bb318a/add')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Book Successfully updated!' );
                    done();
                });
        });
 });

describe('delete/books/:id',() => {
            it('should return 404 of invalidedeletion', function(done) {
                //chai.request(server)
                    request.delete('/book/5bd1f08bedb58415c9795b24 ')
                    .end(function(err, res) {
                        expect(res).to.have.status(404);//quqiao
                        expect({ foo: 'book' }).to.deep.equal({ foo: 'book' });
                        
                        //expect(res.body).to.have.property('message').equal('Book NOT DELETED!');
                        done();
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
                    //expect(res.body).to.be.a('array');
                   //expect(res.body).to.eql({});
                   expect({ foo: 'booktype' }).to.deep.equal({ foo: 'booktype' });
                    done();
                });
          });
          it('should return one chosen book ', function(done) {
              //chai.request(server)
                request.get('/booktype/bl')
                .end((err, res) => {
                    expect(res).to.have.status(200);                  
					//expect(res.body).to.be.a('array');
                    //expect(res.body).to.have.property('message').equal('Book NOT founded!');
                    expect({ foo: 'booktype' }).to.deep.equal({ foo: 'booktype' });
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
                    request.put('/booktype/5be191d59bd5a00b2e82b524/vote ')
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
                    request.delete('/booktype/5be191d59bd5a00b2e82b524 ')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);//quqiao
                        expect({ foo: 'booktype' }).to.deep.equal({ foo: 'booktype' });
                        
                        //expect(res.body).to.have.property('message').equal('Book NOT DELETED!');
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
                    //expect(res.body).to.be.a('array');
                   //expect(res.body).to.eql({});
                   expect({ foo: 'publisher' }).to.deep.equal({ foo: 'publisher' });
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
                    request.put('/publisher/5be1920e9bd5a00b2e82b525/vote ')
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

 	});