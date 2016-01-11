var itemsController = require('./itemsController');
var associationsController = require('./associationsController');
var usersController = require('./usersController');
var engineController = require('./engineController');
var categoriesController = require('./categoriesController');

var mysql = require('mysql');
var expect = require('chai').expect;

describe("Free Association Engine", function() {
  var dbConnection;

  before(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "password",
      database: "freeAssoc"
    });
    dbConnection.connect();

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // dbConnection.query("drop database freeAssoc");
    // dbConnection.query("create database freeAssoc");
    // dbConnection.query("use freeAssoc");

    function insertDummyData () {
      var item1 = { name: 'socks' };
      var item2 = { name: 'shirts' };
      var item3 = { name: 'pants' };
      var item4 = { name: 'uderwear' };
      var item5 = { name: 'shorts' };

      var testUser1 = { id: 1, username: 'max', password: 'password' };
      var testUser2 = { id: 2, username: 'alex', password: 'password' };
      var testUser3 = { id: 3, username: 'wayne', password: 'password' };
      var testUser4 = { id: 4, username: 'julien', password: 'password' };

      usersController.addUser(testUser1)
      usersController.addUser(testUser2)
      usersController.addUser(testUser3)
      usersController.addUser(testUser4)

      itemsController.addItem({ item: item1, user: testUser1 });
      itemsController.addItem({ item: item2, user: testUser1 });
      itemsController.addItem({ item: item3, user: testUser1 });
      itemsController.addItem({ item: item2, user: testUser2 });
      itemsController.addItem({ item: item3, user: testUser2 });
      itemsController.addItem({ item: item1, user: testUser3 });
      itemsController.addItem({ item: item5, user: testUser3 });
      itemsController.addItem({ item: item3, user: testUser4 });
      itemsController.addItem({ item: item4, user: testUser4 });
      itemsController.addItem({ item: item4, user: testUser4 })
        .then(function (item) {
          console.log('new item: ', item);
        })
          done();
    }
  });

  after(function() {
    dbConnection.end();
  });

  it('Should get users from the database', function (done) {
    var testUser = { username: 'max' };

    usersController.getUser(testUser)
      .then(function (user) {
        expect(user.username).to.equal('max');
        done();
      })
  })

  it('Should give an error if the user does not exist', function (done) {
    var badUser = { username: 'xam' };

    usersController.getUser(badUser)
      .then(function (user) {
        expect(user).to.equal(undefined);
      })
      .catch(function (err) {
        console.log(err);
        expect(err).to.equal('User does not exist!');
        done();
      })
  })

  it('Should relate items between users', function (done) {
    var items = [{id: 1}, {id: 2}];
    engineController.getRelatedItems(items)
      .then(function(items) {
        console.log(items);
      })
  })
})

      var item1 = { name: 'socks' };
      var item2 = { name: 'shirts' };
      var item3 = { name: 'pants' };
      var item4 = { name: 'uderwear' };
      var item5 = { name: 'shorts' };

      var testUser1 = { id: 1, username: 'max', password: 'password' };
      var testUser2 = { id: 2, username: 'alex', password: 'password' };
      var testUser3 = { id: 3, username: 'wayne', password: 'password' };
      var testUser4 = { id: 4, username: 'julien', password: 'password' };

      usersController.addUser(testUser1)
      usersController.addUser(testUser2)
      usersController.addUser(testUser3)
      usersController.addUser(testUser4)

      itemsController.addItem({ item: item1, user: testUser1 });
      itemsController.addItem({ item: item2, user: testUser1 });
      itemsController.addItem({ item: item3, user: testUser1 });
      itemsController.addItem({ item: item2, user: testUser2 });
      itemsController.addItem({ item: item3, user: testUser2 });
      itemsController.addItem({ item: item1, user: testUser3 });
      itemsController.addItem({ item: item5, user: testUser3 });
      itemsController.addItem({ item: item3, user: testUser4 });
      itemsController.addItem({ item: item4, user: testUser4 });
      itemsController.addItem({ item: item4, user: testUser4 })
        .then(function (item) {
          console.log('new item: ', item);
        })
