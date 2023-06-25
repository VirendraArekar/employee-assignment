import toast from 'react-hot-toast'
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return '$' + x;
}

function formateDate(date){
    const currentDate = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return currentDate.toLocaleDateString('en-us', options);
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function setDateFormat(date){
    const newDate = new Date(date);
    const day = newDate.getDate() < 10 ? `${'0' +newDate.getDate().toString()}` : newDate.getDate();
    const month = newDate.getMonth() < 11 ? `${'0' +newDate.getMonth().toString()}`.toString() : newDate.getMonth();
    return `${newDate.getFullYear()}-${month}-${day}`
}

function apiErrorHandler(response){
    if(response.code === 403){
        for(var i = 0 ; i < response.data.length; i++){
            toast.error(response.data[i])
        }
    }
}

function setDocumentTitle(title){
    document.title = title;
}

export {
    numberWithCommas,
    formateDate,
    isNumeric,
    setDateFormat,
    apiErrorHandler,
    setDocumentTitle
}