const settings = require("./settings"); // settings.json
const argv = process.argv.slice(2);

const pg = require('knex')({
  client: 'pg',
  connection: {
	  user     : settings.user,
	  password : settings.password,
	  database : settings.database,
	  host     : settings.hostname,
	  port     : settings.port,
	  ssl      : settings.ssl
	},
  //searchPath: 'knex,public'
});

pg('famous_people').insert({
	first_name	:  argv[0],
	last_name	:  argv[1],
	birthdate	:  argv[2]
}).then( console.log('done'));

// pg('famous_people').where('first_name', '=', argv[0]).then((err, row) => {
// 	console.log(row);
// });