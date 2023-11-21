const fs = require('fs');
const axios = require('axios');

const cat = async (path) => {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    })
}

const webCat = async (url) => {

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    const response = await axios.get(url)
    fs.readFile(response.data, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    })
}

const argv = process.argv;

if (argv[2].startsWith('http://') || argv[2].startsWith('https://') || argv[2].startsWith('www')) {
    webCat(argv[2])
}
else {
    cat(argv[2])
}
