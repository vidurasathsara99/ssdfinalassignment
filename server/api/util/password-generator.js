
exports.generatePassword = function generatePassword(){
    const symbols = "@#$&+_=%";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890";
    //
    let selectSymbol =  Math.floor(Math.random() * 7);
    let selectAlphabet1 = Math.floor(Math.random() * 25);
    let selectAlphabet2 = Math.floor(Math.random() * 25);
    let selectAlphabet3 = Math.floor(Math.random() * 25);
    let selectNumbers1 = Math.floor(Math.random() * 9);
    let selectNumbers2 = Math.floor(Math.random() * 9);
    let selectSymbol2 =  Math.floor(Math.random() * 7);
    let selectSymbol3 =  Math.floor(Math.random() * 7);
    //console.log(symbols.charAt(selectSymbol)+alphabet.charAt(selectAlphabet1)+alphabet.charAt(selectAlphabet2)+numbers.charAt(selectNumbers1)+alphabet.charAt(26));
    return ""+symbols.charAt(selectSymbol)+numbers.charAt(selectNumbers2)+alphabet.charAt(selectAlphabet1)+alphabet.charAt(selectAlphabet2)+numbers.charAt(selectNumbers1)+alphabet.charAt(selectAlphabet3)+
        symbols.charAt(selectSymbol2)+alphabet.charAt(selectAlphabet3)+symbols.charAt(selectSymbol3);
}