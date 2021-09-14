// async/await
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://abc123:abc123@ds261078.mlab.com:61078/full_stack_2";

// var callback = function(err, db) {
//   // if (err) throw err;
//   var dbo = db.db("full_stack_2");
//   dbo.collection('orders').aggregate([
//     { $lookup:
//       {
//         from: 'products',
//         localField: 'product_id',
//         foreignField: '_id',
//         as: 'orderdetails'
//       }
//     }
//   ]).toArray(function(err, res) {
//     // if (err) throw err;
//     console.log(JSON.stringify(res));
//     db.close();
//   });
// }

// MongoClient.connect(url, { useUnifiedTopology: true }, callback);
// console.log(123);

async function connection() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const array = await client.db('full_stack_2').collection('posts').find({}).toArray();
  client.close();
  console.log(array);
}
connection();

// работает !!