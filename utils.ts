export const convertNumberToCodeFormat = (mobileNumber:string) => {
    const number = mobileNumber.trim().replace('-','');
    if(number.startsWith('0')){
        const removedLeadingZero = parseInt(number);
        const temp = `+92${removedLeadingZero}`
        return temp; 
    }else if (number.startsWith('+92')){
        const temp = number.replace('+92','');
        return `+92${temp}`
    }else if (number.startsWith('92')){
        const temp = number.replace('92','');
        return `+92${temp}`
    }
}