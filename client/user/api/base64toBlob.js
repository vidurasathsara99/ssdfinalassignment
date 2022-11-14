exports.base64toBlob = async function (file_base64){
    let base64 = await file_base64.substring(file_base64.indexOf(",")+1,file_base64.length);
    let base64bin = atob(base64.replace(/\s/g,''));
    let base64binLength = base64bin.length;
    let buffer = new ArrayBuffer(base64binLength);
    let view = new Uint8Array(buffer);
    for (let i = 0; i < base64binLength; i++) {
        view[i] = base64bin.charCodeAt(i);
    }
    let blob = new Blob([view], {type: "application/pdf"});
    return URL.createObjectURL(blob);
}