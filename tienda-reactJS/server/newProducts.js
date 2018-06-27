var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    var dbObject = database.db('tienda');
    var newProducts = [{
            chrName: 'Aguacate',
            chrFile: 'aguacate.jpg',
            numPrice: 1,
            intQuantity: 100,
            intActive: 1
        }, {
            chrName: 'Ajo',
            chrFile: 'ajo.jpg',
            numPrice: 2,
            intQuantity: 100,
            intActive: 1
        }, {
            chrName: 'Almendras',
            chrFile: 'almendras.jpg',
            numPrice: 3,
            intQuantity: 100,
            intActive: 1
        }, {
            chrName: 'Arandanos',
            chrFile: 'arandanos.jpg',
            numPrice: 4,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Brocoli',
            chrFile: 'brocoli.png',
            numPrice: 5,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Calabaza',
            chrFile: 'calabaza.jpg',
            numPrice: 6,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Canela',
            chrFile: 'canela.jpg',
            numPrice: 7,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Cebolla',
            chrFile: 'cebolla.jpg',
            numPrice: 8,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Fresa',
            chrFile: 'fresa.jpg',
            numPrice: 9,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Kiwi',
            chrFile: 'kiwi.jpg',
            numPrice: 10,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Limon',
            chrFile: 'limon.jpg',
            numPrice: 11,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Lychee',
            chrFile: 'lychee.jpg',
            numPrice: 12,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Maiz',
            chrFile: 'maiz.jpg',
            numPrice: 13,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Manzana',
            chrFile: 'manzana.jpg',
            numPrice: 14,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Naranja',
            chrFile: 'naranja.jpg',
            numPrice: 15,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Papa',
            chrFile: 'papa.jpg',
            numPrice: 16,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Pasta',
            chrFile: 'pasta.jpg',
            numPrice: 17,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Pimienta',
            chrFile: 'pimienta.jpg',
            numPrice: 18,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Repollo',
            chrFile: 'repollo.jpg',
            numPrice: 19,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Tomate',
            chrFile: 'tomate.jpg',
            numPrice: 20,
            intQuantity: 100,
            intActive: 1
        },
        {
            chrName: 'Zanahoria',
            chrFile: 'zanahoria.jpg',
            numPrice: 21,
            intQuantity: 100,
            intActive: 1
        }
    ];
    dbObject.collection('products').insertMany(newProducts, function(err, res) {
        if (err) throw err;
        console.log('Products inserted');
        database.close();
    });
});
