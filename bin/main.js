#!/usr/bin/env node

var Pomodoro = require(__dirname + "/../lib/pomodoro").Pomodoro
  , nomnom = require('nomnom');

var options = nomnom.options({
    task: {
      position: 0,
      help: "This is the task you are going to do. When the pomodoro is" +
        "complete it will say the time is done on that task",
    }
    , version: {
      flag: true
      , abbr: 'v'
      , help: "writes the version to the screen"
    }
  }).parse();

var pomodoro = new Pomodoro();
if (options._.length != 0) {
  pomodoro.run(options._.join(' '));
}

