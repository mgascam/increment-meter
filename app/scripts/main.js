var balance = 10000;
var targetBalance;
var numsToUpdate;
var meter = Meter({selector: 'meter'});
var start;
meter.init({balance: balance});

$('#newBalance').on('click', requestNewBalance);
$('#restoreBalance').on('click', restoreBalance);

var interval;
var timeout = setTimeout(requestNewBalance, 30000);

var lastTry = 0;

function refreshBalance(inc) {
    console.log(inc);
    balance += inc;
    if (balance <= targetBalance) {
        meter.setBalance(balance);
    } else {
        meter.setBalance(targetBalance);
        clearInterval(interval);
        console.log('end ' + (new Date() - start)/1000);
        timeout = setTimeout(requestNewBalance, 30000);
    }
}

function requestNewBalance() {
    clearInterval(interval);
    clearTimeout(timeout);
    start = new Date();
    targetBalance = serverRequest();
    numsToUpdate = ((targetBalance - balance));
    var tick = 10;
    var milliSecondsToUpdate = 30000 / tick;
    var increment = (numsToUpdate / milliSecondsToUpdate);
    interval = setInterval(function () {
        refreshBalance(increment);
    }, tick);
}

function serverRequest() {
    var newBalance = balance + (balance * 0.001);
    // var newBalance = 1000000;
    lastTry++;
    return newBalance;
}

function restoreBalance() {
    balance = 10000;
}
