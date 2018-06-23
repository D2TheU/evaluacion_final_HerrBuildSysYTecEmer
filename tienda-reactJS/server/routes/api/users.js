const User = require('../../models/User.js');

module.exports = (app) => {
    app.get('/api/users', function(req, res) {
        User.find({}).exec(function(err, docs) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            res.json(docs);
        });
    });
    app.post('/api/login', function(req, res) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            chrEmail: email,
            chrPassword: password,
            estado: 1
        }).exec(function(err, doc) {
            if (err) {
                res.status(500)
                res.json(err)
            }
            res.json(doc)
        })
    });
    app.post('/api/user/new', function(req, res) {
        let user = new User({
            chrEmail: req.body.email,
            chrFullName: req.body.fullname,
            chrPassword: req.body.password,
            intActive: 1
        })
        user.save(function(error) {
            if (error) {
                res.status(500)
                res.json(error)
            }
            res.send("Registro guardado")
        })
    });
    app.get('/api/user/delete/:email', function(req, res) {
        let email = req.params.email
        User.remove({
            chrEmail: email
        }, function(error) {
            if (error) {
                res.status(500)
                res.json(error)
            }
            res.send("Registro eliminado")
        })
    });
};
