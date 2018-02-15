const STEP = 0.01;

var time = 0.0;

var timer = false;

function getTime() {
    return time.toPrecision(3);
}

function startTimer() {
    timer = setInterval(function() {
        time += STEP;
        document.getElementById('clock').innerHTML = getTime().toString();
    }, STEP*1000);
}

function clearTimer() {
    if (timer) {
        clearInterval(timer);
        timer = false;
    }
}

function resumeTimer() {
    if (!timer) 
        startTimer();
    else {
        clearTimer();
    }
}

function resetTimer() {
    clearTimer();
    time = 0;
    document.getElementById('clock').innerHTML = '0';
    document.getElementById('past_time').innerHTML = '';
}

function saveTime() {
    document.getElementById('past_time').innerHTML += '<p>'+ getTime().toString() + '</p>';
}