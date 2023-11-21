const fs = require('fs');

const cat = (path) => {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    })
}

const argv = process.argv;

cat(argv[argv.length-1])
