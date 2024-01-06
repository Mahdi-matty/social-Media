const connection = require('../config/connection');
const User = require('../models/users');

const usernames = [
    {
        username : 'salut',
        email: 'salut@salutcom',
},
{
    username : 'sandwich',
        email: 'sandwich@salutcom',
},
{
    username : 'pstein',
        email: 'pstein@salutcom',
},
{
    username : 'donald',
        email: 'donald@salutcom',
},
{
    username : 'biden',
        email: 'biden@salutcom',
},
{
    username : 'ronaldo',
        email: 'ronaldo@salutcom',
},
{
    username : 'gabriel',
        email: 'gabriel@salutcom',
},
{
    username : 'sheksp',
        email: 'sheksp@salutcom',
},
{
    username : 'tamil',
        email: 'tamil@salutcom',
}, 
    
];

console.time('seeding');

connection.once('open', async () => {
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'user' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('user');
    }
    await User.collection.insertMany(usernames);
    console.table(usernames);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});
