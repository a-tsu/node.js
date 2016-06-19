console.log("Hello world!");
var exec = require('child_process').exec;
exec('bash ../a.sh', 
		function(err, stdout){ console.log(stdout); }
    );
