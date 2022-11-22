function generatePassword() {
    const chars = 'qwertyuiopasddfghghjhjkzxcvbnbnm234456578#$%ASDFTYNVJKL';
    var pass = ''
    for(var i=0; i<10; i++)
        pass += chars.charAt(Math.random() * 52)
    return pass
}

module.exports = {
    generatePassword
}