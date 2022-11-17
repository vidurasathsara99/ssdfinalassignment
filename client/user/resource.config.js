exports.proxy = function proxy(sub_directory){
    //localhost server mode
    let local_server = require('./package.json').config.localhost;
    //http server mode
    let http_server = require('./package.json').config["server-http"];
    //https server mode
    let https_server = require('./package.json').config["server-https"];
    return https_server+sub_directory;
}