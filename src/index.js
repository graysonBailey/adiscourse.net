import _ from 'lodash';
import './style.css';
import p5 from 'p5/lib/p5.min.js';
import io from 'socket.io-client';
import discourseJSON from './allgemeine.json';
import { present } from './dUnit.js';
let path = require('path');

const socket = io();





// new p5();




//const containerElement = document.getElementById('p5-container');

const sketch = (p) => {
  let x = 100;
  let y = 100;
  let can;


  let tFont;
  let curs;
  let discourse;
  let pointers = [];
  let position = 0
  let cnv;



  p.preload = function() {
    tFont = p.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
   discourse = discourseJSON
   console.log(discourse)
  }



  p.setup = function() {
    cnv = p.createCanvas(p.windowWidth, p.windowHeight)

    console.log("setting up")
    p.textFont(tFont)
    socket.on('mouse', p.newDrawing)
    p.refresh()
    p.fill(255)
  }

  p.refresh = function() {
    p.background(0);


    p.cursor("228ed835800150758bdcfe3a458531a8.png");
    p.displayDiscourse();
    pointers = [p.createVector(0, 0), p.createVector(0, 0)]

    p.translate(0,position);
  }

  p.draw = function(){


  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    //p.background(0);
    p.refresh();
    console.log("resized!")
  }


  p.newDrawing = function(data) {
    p.noStroke();
    p.fill(255, 0, 100);
    p.ellipse(data.x, data.y,3,3);
  }


  p.mouseDragged = function() {

    var data = {
      x: p.mouseX,
      y: p.mouseY,
    }
    socket.emit('mouse', data);
    p.noStroke();
    p.fill(47, 230, 240)
    p.ellipse(p.mouseX, p.mouseY, 20, 20);
  }


  p.displayDiscourse = function() {

    for(let i = 0; i <p.windowHeight; i+=25){
      p.stroke(255)
      p.strokeWeight(.1)
      p.line(100,i,p.windowWidth-100,i)
    }
    p.noStroke();
    p.fill(255);
    p.textSize(16);
    let units = discourse.units
    for (let each in units) {
      let unit = units[each];
      if(unit.PosX > 0 && unit.PosX < p.windowWidth && unit.PosY+position > -30 && unit.PosY+position < p.windowHeight) {
        p.text(unit.Base, unit.PosX, unit.PosY+position, 400, 1000)
      }
    }
  }

  p.mouseClicked = function() {
    if (pointers[0].x + pointers[0].y == 0) {
      pointers[0].x = p.mouseX
      pointers[0].y = p.mouseY
      // console.log("POINTER ONE" + pointers[0])
    } else {
      pointers[1].x = p.mouseX
      pointers[1].y = p.mouseY
      // console.log("POINTER TWO" + pointers[1])
      p.stroke('#ffA908');
      p.strokeWeight(1);
      p.line(pointers[0].x, pointers[0].y, pointers[1].x, pointers[1].y);
      pointers[0] = p.createVector(0, 0);
    }
  }

  p.mouseMoved = function() {
    p.setPositions()
  }

  p.mouseWheel = function(event){
  position-= event.delta/2;
  p.refresh();
  }

  p.keyPressed = function() {
    if(p.keyCode == p.ESCAPE){
      let temp = document.getElementById('tempGeist')
      if( temp != null){temp.remove()}
    }
  }

  p.setPositions = function() {
    document.getElementById("vertPos").innerHTML = position
  }

  p.mousePressed = function() {
    if (p.mouseX > 0 && p.mouseX < 100 && p.mouseY > 0 && p.mouseY < 100) {
      let fs = p.fullscreen();
      p.fullscreen(!fs);
    } else if(document.getElementsByClassName('geist').length < 1){
      let input = p.createElement('textarea').class('geist');
        input.position(p.mouseX,p.mouseY)
        input.id('tempGeist')
    }
  }




};

let baseSketch = new p5(sketch);




window.onload = function() {
  console.log(present);
  document.getElementById('about-this-website').onclick = () => {
    document.getElementById('about-window-overlay').classList.remove('disabled');
    console.log("pressed it")
  }
  document.getElementById('about-window-overlay-close').onclick = () => {
    document.getElementById('about-window-overlay').classList.add('disabled');
    console.log("pressed it")
  }
}
