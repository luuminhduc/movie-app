export const formatCurrency = (number) => {
    const formatedNumber = number.toString().split('');
    for(let i = formatedNumber.length-3;i>=1;i-=3) {
        formatedNumber.splice(i,0,',');
    }
    const returnedNumber = formatedNumber.reduce((a,b) => a+=b);
    return returnedNumber;
}

