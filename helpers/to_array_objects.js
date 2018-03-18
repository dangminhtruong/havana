const _ = require('lodash');
let convert = (arrObj) => {
    let origin = _.chunk(arrObj, 2);
    let sig = (colorCode, colorQuantity) => {
            let tm = {
                code : colorCode,
                quantity : colorQuantity
            };
            return tm;
    }

    let newArr = origin.slice();
    let objConverted = [];
    newArr.forEach((item)=>{
        objConverted.push(sig(...item))
    });
    return objConverted; 
}

module.exports = convert;