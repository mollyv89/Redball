    // requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    

function Ball(leftval, topval){
    this._left = leftval;
    this._top = topval;
	this.__defineGetter__("left", function(){
//			log("get left");
            return this._left;
        });
	this.__defineSetter__("left", function(val){
//			log("set left");
            this._left = val;
			animation.push(new RecordedMove(this._left, this._top));
        });
	this.__defineGetter__("top", function(){
//			log("get top");
            return this._top;
        });
	this.__defineSetter__("top", function(val){
//			log("set top");
            this._top = val;
			animation.push(new RecordedMove(this._left, this._top));
        });
}

var x = 50;
var y = 100;
var animation = new Array();
var redball = new Ball(x, y);
animate();

function RecordedMove(newx,newy) {
    this.x = newx;
    this.y = newy;
    //log("recorded move x" + this.x + ' total moves ' + animation.length);
}

function animate() {    
    requestAnimFrame( animate );
    draw();
}

function draw() {
	move = animation.shift();
	if(move){
		x = move.x;
		y = move.y;
	}

    if (document.getElementById("redball")){
     	document.getElementById("redball").style.position = 'absolute';
        document.getElementById("redball").style.left = x +'px';
        document.getElementById("redball").style.top = y +'px';
    }
    else{
        console.log('cannot find element with id of "redball"');
    }

}

window.onload=function(){document.onkeydown= function(e){e = e || window.event;if (e.keyCode == 37){redball.left = redball.left - 5;}if (e.keyCode == 38){redball.top = redball.top - 5;}if (e.keyCode == 39){redball.left = redball.left + 5;}if (e.keyCode == 40){redball.top = redball.top + 5;}}};    


function log(msg){
  document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + "<br>" + msg;
}