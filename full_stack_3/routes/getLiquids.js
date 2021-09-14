var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://abc123:abc123@ds261078.mlab.com:61078/full_stack_2";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("full_stack_2");
  dbo.collection('liquids').aggregate([
    { $lookup:
      {
        from: 'prices',
        localField: 'card',
        foreignField: 'card',
        as: 'price'
      }
    }
  ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});

// работает !!