var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    var dbObject = database.db('tienda');
    var newUser = {
        chrEmail: 'brandon@mail.com',
        chrFullName: 'Brandon Shneider',
        chrPassword: 'password',
        intActive: 1
    };
    dbObject.collection('users').findOne({
        chrEmail: newUser['chrEmail']
    }, function(err, result) {
        if (err) throw err;
        if (result == null) {
            dbObject.collection('users').insertOne(newUser, function(err, res) {
                if (err) throw err;
                console.log('1 user inserted');
                database.close();
            });
        } else {
            console.log(result.chrEmail + ' already exists.');
            database.close();
        }
    });
});
