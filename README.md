# Pomodoro

This is a basic CLI app that allows you to do pomodoro''s  in the command line. When the pomodoro is complete it will send a growl message.

## How to install it

To install it you will need to have node.js or io.js installed.

To install run:

`npm install -g pomodoro`

## How to use it

```
Usage: pomodoro [task] [options]

task     This is the task you are going to do. When the pomodoro iscomplete it will say the time is done on that task

Options:
   -a, --add       Add a new item that can be processed later
   -r, --remove    Remove items that we have saved to disk
   -s, --show      Show all the items in the file
   --start         Start running the top item in the list
   -b, --break     Time a break and be notified when to start again. Pass in the amount of munites to break for.
   -v, --version   writes the version to the screen
 ```
