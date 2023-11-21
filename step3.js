const fs = require('fs');
const axios = require('axios');

const cat = async (path) => {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        dataAction(data);
    })
}

const webCat = async (url) => {

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    const response = await axios.get(url);
    dataAction(response.data);
}

const dataAction = async (data) => {
    if (argv.includes("--out")) {
        const outFileIndex = argv.indexOf("--out") + 1;
        fs.writeFile(`./${argv[outFileIndex]}`, data, "utf8", function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
        })
    } 
    else {
        console.log(data);
    }
    
}

const argv = process.argv;
const lastArg = argv[argv.length-1];

if (argv[argv.length-1].startsWith('http://') || argv[argv.length-1].startsWith('https://') || argv[argv.length-1].startsWith('www')) {
    webCat(lastArg);
}
else {
    cat(lastArg);
}
