// alert('hellooo welcome');
// alert('u are here');
// alert('im glad');
// alert('it was getting dark');



//onLoad run fxn
window.onload = () => {
  // // define custom function we called sayHi. This only defines the function and does not execute it.
  // function sayHi() { 		
  //   console.log("Hi!");  // native function console.log
  //   alert("Hi");  // native function alert
  // }

  //rain FX
  (function() {
    var squares = [];
    var canvas = null;
    var lastFrame = new Date().getTime();
    var delta = 0;
    var mousePos = null;
    var debug = true;
    var click = false;
    var properties = {
      cols: 100,
      rows: 50,
      color: "rgba(255, 255, 255, 0.6)",
      altColor: "#1564a1",
      sLength: 0,
      activeAmt: 0.25,
      easeIn: 0.25
    };
  
    var init = function rain() {
      canvas = document.createElement('canvas');

  
      document.body.appendChild(canvas);  //adds canvas to the body element
      
  
      canvas.width = canvas.offsetWidth;
      canvas.height = (canvas.offsetWidth / properties.cols * properties.rows);
      properties.sLength = canvas.offsetWidth / properties.cols;
      
      // Generate the Grid
      for (var r = 0; r < properties.rows; r++) {
        squares[r] = [];
        for (var c = 0; c < properties.cols; c++) {
          squares[r][c] = null;
        }
      }
  
      canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(evt);
      });
  
      canvas.addEventListener('mouseout', function(evt) {
        mousePos = null;
      });
      
      canvas.addEventListener('mousedown', function(evt){
        mousePos = getMousePos(evt);
        click = true;
      });
    }
  
    var step = function() {
      delta = (new Date().getTime() - lastFrame) / 10000;
      lastFrame = new Date().getTime();
  
      // Spawn new Squares
      for (var i = 0; i < Math.ceil(properties.cols * delta); i++) {
        var c = Math.round(Math.random() * (properties.cols - 1));
        var r = Math.round(Math.random() * (properties.rows - 1));
        if (squares[r][c] == null) {
          var duration = Math.round(0.5 * (Math.random() + 0.5));
          squares[r][c] = new Square(c, r, duration);
        }
      }
      
      // Spawn squares under the mouse
      if (mousePos != null) {
        var col = Math.round((mousePos.x - properties.sLength / 2) / canvas.width * properties.cols);
        var row = Math.round((mousePos.y - properties.sLength / 2) / canvas.height * properties.rows);
        
        if(click){
          squares[row][col] = new Square(col, row, 5, false, "#f00");
          click = false;
        } else if(squares[row][col]) {
          squares[row][col].reset();
        } else {
          squares[row][col] = new Square(col, row, 10, false)
        }
      }
  
      // Remove old squares
      for (var r = 0; r < properties.rows; r++) {
        for (var c = 0; c < properties.cols; c++) {
          if (squares[r][c] != null && squares[r][c].life <= 0) {
            squares[r][c] = null;
          }
        }
      }
  
      render();
  
      requestAnimationFrame(step);
    }
  
    var render = function() {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var r = 0; r < properties.rows; r++) {
        for (var c = 0; c < properties.cols; c++) {
          if (squares[r][c] != null) {
            squares[r][c].step(ctx);
          }
        }
      }
    }
  
    function getMousePos(evt) {
      var rect = canvas.getBoundingClientRect();
  
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }
  
    init();
    requestAnimationFrame(step);
  
    // Helper Function
    var getActiveNum = function() {
      var i = 0;
      for (var r = 0; r < properties.rows; r++) {
        for (var c = 0; c < properties.cols; c++) {
          if (squares[r][c] != null) {
            i++;
          }
        }
      }
      return i;
    }
  
    var Square = function(c, r, life, animIn, color) {
      
      if(typeof(animIn) == "undefined"){
        animIn = true;
        opacity = 0;
      } else {
        animIn = false;
        opacity = 1;
      }
      
      this.col = c;
      this.row = r;
      this.life = life;
      this.color = color ? color : properties.color;
      this.initialLife = life;
      this.animIn = animIn;
      this.opacity = opacity;
  
      this.step = function(ctx) {
        this.render(ctx);
        if (this.animIn) { //this.animIn){
          this.opacity = this.opacity +  (1 / properties.easeIn * delta);
          if (this.opacity >= 1) {
            this.opacity = 1;
            this.animIn = false;
          }
        } else {
          this.life = this.life - delta;
          if (this.life < 0) {
            this.life = 0;
          }
          this.opacity = Math.round(1 * (this.life / this.initialLife) * 1000) / 1000;
        }
      };
  
      this.render = function(ctx) {
        var l = properties.sLength;
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle =  this.color;
        ctx.fillRect(this.col * l, this.row * l, l, l);
  
        if (debug == true) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = "#000";
          ctx.font = "12px Arial";
  
         // ctx.fillText(this.col, this.col * l + 2, this.row * l + 12);
         //  ctx.fillText(this.row, this.col * l + l - 14, this.row * l + 12);
          // ctx.fillText(Math.round(this.life), this.col * l + 2, this.row * l + (l / 2) + 10);
         //  ctx.fillText(this.initialLife, this.col * l + 2, this.row * l + l - 4);
         //  ctx.fillText(delta, this.col * l + l - 24, this.row * l + (l / 2) + 10);
         //  ctx.fillText(this.opacity, this.col * l + l - 24, this.row * l + +l - 4);
        }
      };
      
      this.reset = function(){
        this.opacity = 1;
        this.life = this.initialLife;
        console.log("i'm working");
      };
    }
  })();

}


