const pool = require('../query.js');
const fs = require('fs');

const seedQuery = fs.readFileSync('1-Seeding5Data/query.sql', {encoding: 'utf-8'});
pool.query(seedQuery, (err, res)=> {
    if(err) throw err;
    console.log('seeding success!');
    pool.end();
})