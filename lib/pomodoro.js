var growl = require('growl');

var Pomodoro = function(){};

Pomodoro.prototype.run = function(message){
  setTimeout(function(){
    console.log(message + " pomodoro is complete");
    growl(message + " pomodoro is complete",
      {
        sticky: true,
        image: "Pomodoro",
      }
    )
  }, 1000*60*25);
}

exports.Pomodoro = Pomodoro;
