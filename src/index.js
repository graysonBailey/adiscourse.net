import _ from 'lodash';
import './style.css';
import p5 from 'p5/lib/p5.min.js';
import io from 'socket.io-client';
import $ from 'jQuery'
import {
  discourseSet
} from './content.js';
import {
  discursiveOverlay
} from './present.js'
import {
  back,
  content
} from './threeCanvases.js';
import switchModeInstructions from './modeSwitch.js'

let path = require('path');
export let discourses = []



export let position = 0;
let vertSpeed = 30;

export const socket = io();







export const overlay = new p5((p) => {
  let x = 100;
  let y = 100;
  let can;


  let tFont;
  let curs;

  let pointers = [];

  let cnv;



  p.preload = function() {
    tFont = p.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");


  }



  p.setup = function() {
    cnv = p.createCanvas(p.windowWidth, p.windowHeight)

    console.log("setting up")
    p.textFont(tFont)
    socket.on('mouseRep', p.newDrawing)

    p.refresh()
    p.fill(255)
  }

  p.refresh = function() {


    p.cursor("228ed835800150758bdcfe3a458531a8.png");

    pointers = [p.createVector(0, 0), p.createVector(0, 0)]

    p.translate(0,position);
  }

  p.draw = function(){


  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.refresh();
    console.log("resized!")
  }


  p.newDrawing = function(data) {
    console.log("got sent something")
    p.noStroke();
    p.fill(255, 0, 100);
    p.ellipse(data.x, data.y,3,3);
  }

  p.printItOut = function(data){
    console.log(data);
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


  p.mouseWheel = function(event){
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




}, 'overlay')


let reposition = function(event) {
  content.clear()
  const delta = Math.sign(event.deltaY);
  position = position - (delta * vertSpeed)
  discourses.vis()
  document.getElementById("vertPos").innerHTML = position
}

function loadDiscourseUnitsToArray(units) {
  discourses = new discourseSet(content)
  for (let each in units) {
    let unit = units[each]
    discourses.addUnit(unit.c, unit.p, unit.t, unit.u, unit.r, unit.d, unit.db)
  }
}



window.onload = function() {

  document.getElementById('overlay').addEventListener("wheel", event => reposition(event), {passive: true});
  socket.on('dataRep', data =>{
    loadDiscourseUnitsToArray(data)

    console.log(discourses);
  })

  document.getElementById('vert30').onclick = () => {
      vertSpeed = 30;
      console.log(vertSpeed)
    }
  document.getElementById('vert60').onclick = () => {
    vertSpeed = 60;
    console.log(vertSpeed)
  }
  document.getElementById('vert90').onclick = () => {
    vertSpeed = 90;
    console.log(vertSpeed)
  }

  document.getElementById('about-this-website').onclick = () => {
    document.getElementById('about-window-overlay').classList.remove('disabled');
    console.log("pressed it")
  }
  document.getElementById('about-window-overlay-close').onclick = () => {
    document.getElementById('about-window-overlay').classList.add('disabled');
    console.log("pressed it")
  }


  document.getElementById('rp-b').onclick = () => {
      document.getElementById('gp-b').classList.remove('current');
      document.getElementById('rp-b').classList.add('current');
      switchModeInstructions(2)
      discourses.vis()
    }
    document.getElementById('gp-b').onclick = () => {
      document.getElementById('rp-b').classList.remove('current');
      document.getElementById('gp-b').classList.add('current');
      switchModeInstructions(1)
      discourses.vis()
    }
    document.getElementById('discourseLoad').onclick = () => {

        let presenter = new discursiveOverlay(overlay)
        presenter.giveChoices()

    }
    document.getElementById('switchLoad').onclick = () => {
      document.getElementById('rp-b').classList.remove('current')
      document.getElementById('gp-b').classList.remove('current')
      document.getElementById('gp-b').classList.toggle('away')
      document.getElementById('rp-b').classList.toggle('away')
      document.getElementById('filterKey').textContent = "--"
      content.clear()
      switchModeInstructions(0)
      let presenter = new discursiveOverlay(overlay)
      overlay.clear()
      presenter.giveChoices()
      position = 0
      document.getElementById('vertPos').innerText = position
    }



    let datas = "frisk"
    socket.emit('gimmeData', datas);

}
