let socket;
let tFont;
let curs;
let discourse;
let pointers = [];
let position = 0
let cnv;


window.onload = function() {
  document.getElementById('about-this-website').onclick = () => {
    document.getElementById('about-window-overlay').classList.remove('disabled');
    console.log("pressed it")
  }
  document.getElementById('about-window-overlay-close').onclick = () => {
    document.getElementById('about-window-overlay').classList.add('disabled');
    console.log("pressed it")
  }
}



function preload() {
  tFont = loadFont("assets/OCRAStd.otf");
  discourse = loadJSON("allgemeine.json");
}



function displayDiscourse() {
  noStroke();
  fill(255);
  let units = discourse.units
  for (let each in units) {
    let unit = units[each];
    text(unit.Base, unit.PosX, unit.PosY+position, 400, 1000)
    //console.log(units[each])
  }
}




function refresh() {
  background(31);


  cursor("assets/swift.png");
  displayDiscourse();
  pointers = [createVector(0, 0), createVector(0, 0)]

  translate(0,position);
}



function setup() {
  cnv = createCanvas(windowWidth, windowHeight)
  centerCanvas(cnv)
  textFont(tFont)
  socket = io.connect('node-express-env.eba-vgwp4pvw.eu-central-1.elasticbeanstalk.com/')
  socket.on('mouse', newDrawing)
  refresh()

}

function centerCanvas(can) {
  var x = 0;
  var y = 0;
  can.position(x, y);
  //can.style('z-index','-1')
}


function draw(){





}


function setPositions() {
  document.getElementById("x-coord").innerHTML = mouseX
  document.getElementById("y-coord").innerHTML = mouseY
}

function newDrawing(data, tex) {
  noStroke();
  fill(255, 0, 100);
  fill(230, 47, 240);
  text(data.talk, data.x, data.y);
}


function mouseDragged() {

  var tex = "loser";
  var data = {
    x: mouseX,
    y: mouseY,
    talk: tex
  }
  socket.emit('mouse', data);
  socket.emit('text', tex);
  noStroke();
  fill(47, 230, 240)
  ellipse(mouseX, mouseY, 20, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  refresh();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function mouseClicked() {
  if (pointers[0].x + pointers[0].y == 0) {
    pointers[0].x = mouseX
    pointers[0].y = mouseY
    console.log("POINTER ONE" + pointers[0])
  } else {
    pointers[1].x = mouseX
    pointers[1].y = mouseY
    console.log("POINTER TWO" + pointers[1])
    stroke('#ffA908');
    strokeWeight(1);
    line(pointers[0].x, pointers[0].y, pointers[1].x, pointers[1].y);
    pointers[0] = createVector(0, 0);
  }
}

function mouseMoved() {
  setPositions()
}

function mouseWheel(event){
console.log(event.delta);
position-= event.delta/2;
refresh();
}
