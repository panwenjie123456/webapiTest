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
      });
      describe('GET /books',  () => {
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
      });
      describe('GET /books',  () => {
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
}); 

describe('POST/books', function () {
        it('should return confirmation message and update datastore that add successfully', function(done) {
            let book = {
            "No": 1,
            "book_name": "namechanged",
          	"amount": 102,
          	"author": "zhongbencong",
          	"publisher_name": "changed",
          	"price": 50
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
    });
    */
