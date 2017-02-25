var balance = 10000;
var topBalance;
var numsToUpdate;
var meter = Meter({selector: 'meter'});
meter.init({balance: balance});

$('#newBalance').on('click', requestNewBalance);

var interval;
var timeout = setTimeout(requestNewBalance, 30000);

var lastTry = 0;

function refreshBalance() {
    var newBalance = balance++;
    if (newBalance <= topBalance) {
        meter.setBalance(newBalance);
    } else {
        clearInterval(interval);
        console.log('end ' +new Date());
        timeout = setTimeout(requestNewBalance, 30000);
    }
}

function requestNewBalance() {
    clearInterval(interval);
    clearTimeout(timeout);

    console.log('start ' +new Date());
    topBalance = serverRequest();
    numsToUpdate = ((topBalance - balance));
    var milliSecondsToUpdate = 30000;
    var frequency = milliSecondsToUpdate / numsToUpdate;
    interval = setInterval(refreshBalance, frequency);
}

function serverRequest() {
    var newBalance = 10100 + (100 * lastTry);
    lastTry++;
    return newBalance;
}
