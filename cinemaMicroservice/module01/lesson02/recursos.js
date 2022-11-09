function calcular(operador1, operador2, simbolo) {
    switch (simbolo) {
        case '*':
            return operador1 * operador2;
        case '/':
            return operador1 / operador2;
        case '+':
            return operador1 / operador2;
        case '-':
            return operador1 / operador2;
        default:
            break;
    }
}
function parimpar(numero){
    if (numero % 2 != 0)
        return 'Impar'
    else
        return 'Par'
}

function palindromo(palavra){
    palindromo = palavra.split("").reverse().join("")
    if (palavra === palindromo)
        return "É um Palindromo"
    else
        return "Não é um Palindromo"
}
module.exports = {calcular, parimpar, palindromo}

