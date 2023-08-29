let date, hours, minutes, session;

function displayTime(){
    var dateTime = new Date();
    hours = dateTime.getHours();
    minutes = dateTime.getMinutes();
    date = dateTime.toLocaleDateString('en', { weekday:"long",day:"numeric", month:"long"});

    if(hours >= 12){
        session = 'PM';
    }else{
        session = 'AM';
    }

    if(hours > 12){
        hours = hours - 12;
    }

}

// setInterval(displayTime, 10);
displayTime()
export {date, hours, minutes, session}