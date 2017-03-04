var balance = 10000;
var topBalance;
var numsToUpdate;
var meter = Meter({selector: 'meter'});
var start;
meter.init({balance: balance});

$('#newBalance').on('click', requestNewBalance);

var interval;
var timeout = setTimeout(requestNewBalance, 30000);

var lastTry = 0;

function refreshBalance(inc) {
    console.log(inc);
    balance += inc;
    console.log(balance);
    if (balance <= topBalance) {
        meter.setBalance(balance);
    } else {
        meter.setBalance(topBalance);
        clearInterval(interval);
        console.log('end ' + (new Date() - start)/1000);
        timeout = setTimeout(requestNewBalance, 30000);
    }
}

function requestNewBalance() {
    clearInterval(interval);
    clearTimeout(timeout);
    start = new Date();
    topBalance = serverRequest();
    numsToUpdate = ((topBalance - balance));
    var milliSecondsToUpdate = 30000;
    var increment = (numsToUpdate / milliSecondsToUpdate) * 10;
    interval = setInterval(function () {
        refreshBalance(increment);
    }, 10);
}

function serverRequest() {
    // var newBalance = 1010000 + (100 * lastTry);
    var newBalance = 144000;
    lastTry++;
    return newBalance;
}
