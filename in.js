console.log("Hello world!");
var exec = require('child_process').exec;
var input = require('fs').readFileSync('/dev/stdin', 'utf8')
exec('bash ../a.sh', 
		function(err, stdout){ console.log(stdin); }
    );
