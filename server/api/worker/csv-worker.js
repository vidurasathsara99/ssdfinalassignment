/*
const {Worker} = require('worker_threads');
const worker = new Worker(`
const {parentPort} = require('worker_threads');
parentPort.once('message',message => parentPort.postMessage({ pong: message }));`,{eval:true});
worker.on('message',message =>{
    console.log(message);
})
worker.postMessage('Sending back!');
 */
exports.worker = `const {parentPort} = require('worker_threads');
    parentPort.once('message',message => {
    let file = message.file;
    file = file.replace("\\n","");
    const filterStart = message.filterStart;
    const filterEnd = message.filterEnd;
    let filter_potion = file.substring(file.indexOf(filterStart)+filterStart.length,file.indexOf(filterEnd));
    console.log("FilterPotion: "+filter_potion);
    filter_potion = filter_potion.replace("Emails,Username,Password","");
    console.log("FilterPotion: "+filter_potion);
    parentPort.postMessage("filtered!");
});`
/*
const {parentPort} = require('worker_threads');
    parentPort.once('message',message => {
    let file = message.file;
    file = file.replaceAll("\n","");
    const filterStart = message.filterStart;
    const filterEnd = message.filterEnd;
    const filter_potion = file.substring(file.indexOf(filterStart)+filterStart.length,file.indexOf(filterEnd));
    console.log("FilterPotion: "+filter_potion);
    parentPort.postMessage("filtered!");
});
 */


