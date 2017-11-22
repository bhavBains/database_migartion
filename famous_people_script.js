const pg = require("pg");
const settings = require("./settings"); // settings.json
const argv = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function getFirstName( name, cb) {
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [name], cb);
}

function getLastName( name, cb)  {
  client.query("SELECT * FROM famous_people WHERE last_name = $1", [name], cb);
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  
  // client.query(`SELECT * FROM famous_people WHERE last_name = $1`, [argv[0]], (err, result) => {
  //   console.log(result.rows)
  // })


  getFirstName(argv[0], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
  });

  getLastName(argv[0], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
  
    client.end();
  });
  
});