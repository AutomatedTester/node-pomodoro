#!/usr/bin/env node

var Pomodoro = require(__dirname + "/../lib/pomodoro").Pomodoro
  , nomnom = require('nomnom');

var options = nomnom.options({
    task: {
      position: 0,
      help: "This is the task you are going to do. When the pomodoro is" +
        "complete it will say the time is done on that task",
    }
    , add: {
      abbr: 'a'
      , help: "Add a new item that can be processed later"
    }
    , remove: {
      abbr: 'r'
      , help: "Remove items that we have saved to disk"
    }
    , show: {
      flag: true
      , abbr: 's'
      , help: "Show all the items in the file"
    }
    , start: {
      flag: true
      , help: "Start running the top item in the list"
    }
    , break: {
      abbr: 'b'
      , help: "Time a break and be notified when to start again. Pass in the" +
        " amount of munites to break for."
    }
    , version: {
      flag: true
      , abbr: 'v'
      , help: "writes the version to the screen"
    }
  }).parse();

var pomodoro = new Pomodoro();
if (!options.add && !options.remove && !options.show && !options.start && !options.break) {
  pomodoro.run(options._.join(' '));
}

if (options.add) {
  pomodoro.add(options.add + ' ' + options._.join(' '));
}

if (options.remove) {
  pomodoro.remove(options.remove);
}

if (options.show) {
  pomodoro.show();
}

if (options.start) {
  pomodoro.start();
}

if (options.break) {
  pomodoro.break(options.break);
}
