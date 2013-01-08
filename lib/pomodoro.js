var growl = require('growl')
  , fs = require('fs');

var items = {todo: [], completed:[]};

var Pomodoro = function(){};

Pomodoro.prototype.run = function(message){
  var imageLocation = __dirname + "/../images/twentyfive.jpg"
  setTimeout(function(){
    console.log(message + " pomodoro is complete");
    growl(message + " pomodoro is complete",
      {
        sticky: true,
        image: imageLocation,
      }
    )
  }, 1000*60*25);
}

Pomodoro.prototype.show = function(){
  fs.readFile(process.env.HOME + "/.pomodoro", "utf-8", function(err, data){
      if (err) {
        fs.open(process.env.HOME + "/.pomodoro", "w", function(err, fd){
             if (err) throw err;
             fs.write(fd, JSON.stringify(items), null, "utf-8", function(err, written, buffer) {
                 if (err) throw err;
                 fs.close(fd, function(err){ if (err) throw err;});
             });
        });
      } else {
        var items = JSON.parse(data);
        for (var i=0; i < items.todo.length; i++){
          var txt = "#" + (i + 1) + " : " + items.todo[i];
          console.log(txt);
        }
        if (items.completed.length > 0) console.log("Completed Items");
        for (var i=0; i < items.completed.length; i++){
          var txt = "#" + (i + 1) + " : " + items.completed[i];
          console.log(txt);
        }
      }
    });
};

Pomodoro.prototype.add = function(message){
  fs.readFile(process.env.HOME + "/.pomodoro", "utf-8", function(err, data){
      if (err){
        items.todo.push(message);
        fs.open(process.env.HOME + "/.pomodoro", "w", function(err, fd){
          if (err) throw err;
          fs.write(fd, JSON.stringify(items), null, "utf-8", function(err, written, buffer) {
            if (err) throw err;
              fs.close(fd, function(err){ if (err) throw err;});
            });
        });
      } else {
        items = JSON.parse(data);
        items.todo.push(message);
        fs.unlink(process.env.HOME + "/.pomodoro", function(err){
          fs.writeFile(process.env.HOME + "/.pomodoro", JSON.stringify(items), "utf-8", function(err){
            if (err) throw err;
          });
        });
      }
  });
};

Pomodoro.prototype.remove = function(index, callback){
  fs.readFile(process.env.HOME + "/.pomodoro", "utf-8", function(err, data){
      if (err) throw err;
      var items = JSON.parse(data);
      items.completed.remove(index);
      fs.writeFile(process.env.HOME + "/.pomodoro", JSON.stringify(items), "utf-8", function(err){
              if (err) throw err;
              callback;
          });
    });
}

Pomodoro.prototype.start = function () {
  var self = this;
  fs.readFile(process.env.HOME + "/.pomodoro", "utf-8", function(err, data){
      if (err) throw err;
      var items = JSON.parse(data);
      var task = items.todo[0];
      items.completed.push(task);
      items.todo.remove(1);
      fs.writeFile(process.env.HOME + "/.pomodoro", JSON.stringify(items), "utf-8", function(err){
              if (err) throw err;
      });
      self.run(task);
    });
}

// Based on http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function(index) {
  index -= 1;
  var rest = this.slice(index + 1 || this.length);
  this.length = index < 0 ? this.length + index: index;
  return this.push.apply(this, rest);
};
exports.Pomodoro = Pomodoro;
