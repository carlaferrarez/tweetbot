const cassandra = require('cassandra-driver');
const { Client, auth } = require('cassandra-driver');


const client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'] ,
                                     localDataCenter: 'datacenter1', 
                                     keyspace: 'twitter',
                                     authProvider: new auth.PlainTextAuthProvider('admin', 'admin')});

// client.on('log', function(level, className, message, furtherInfo) {
//   console.log('log event: %s -- %s', level, message);
// });

client.connect();
const query = 'INSERT INTO twitter.stweet (id, hashtag, horario, linguagem, mensagem, seguidores, usuario) VALUES (?, ?, ?, ?, ?, ?, ?)';

module.exports = 
  function populateData(tweetsArray){
// tweetsArray.length
      for(var i = 0; i < tweetsArray.length; i++){
        console.log("fazendo o populate data")
        client.execute(query, [tweetsArray[i].id,
        tweetsArray[i].hashtag,
        tweetsArray[i].horario,
        tweetsArray[i].linguagem,
        tweetsArray[i].mensagem,
        tweetsArray[i].seguidores,
        tweetsArray[i].usuario],{ prepare : true });

      };
  };

// client.execute('select * from twitter.stweet', function(err, result) {

//   if (err) throw Error();
//   console.log(result.rows[0]);
// });