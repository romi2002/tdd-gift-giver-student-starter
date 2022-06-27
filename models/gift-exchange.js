const {BadRequestError} =  require("../utils/errors");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GiftExchange {
    static pairs(names){
        console.log(names)
        if(names.length % 2 !== 0){
            throw new BadRequestError("Number of names cannot be odd!")
        }

        // Randomly pair names, iterate through array, pair i with random (i, len)
        var pairedNames = []
        names.sort(() => .5 - Math.random())
        while(names.length){
            //Remove an element from names, and get a random index
            const pairIndex = getRandomInt(0, names.length - 2)
            pairedNames.push([names.pop(), names[pairIndex]])
            names.splice(pairIndex,1)

            //Shuffle names just so it's random
            names.sort(() => .5 - Math.random())
            console.log(names)
        }

        return pairedNames
    }

    static traditional(names){
        const pairedNames = this.pairs(names)
        var output = []
        for(let i = 0; i < pairedNames.length; i += 1){
            output.push(`${pairedNames[i][0]} is giving a gift to ${pairedNames[i][1]}`)
            if(i+1 < pairedNames.length)
            output.push(`${pairedNames[i][1]} is giving a gift to ${pairedNames[i+1][0]}`)
        }

        output.push(`${pairedNames[pairedNames.length - 1][1]} is giving a gift to ${pairedNames[0][0]}`)
        return output
    }
}

module.exports = GiftExchange