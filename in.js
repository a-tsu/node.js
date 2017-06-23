console.log("Hello world!");
const exec = require('child_process').exec;
const input = require('fs').readFileSync('/dev/stdin', 'utf8')
exec('bash ../a.sh', 
    function(err, stdout){ console.log(stdin); }
);
