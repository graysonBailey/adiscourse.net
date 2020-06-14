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
  let tFont;
  let curs;
  let pointers = [p.createVector(0,0),p.createVector(0,0)];
  let cnv;



  p.preload = function() {
    tFont = p.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
  }



  p.setup = function() {
    cnv = p.createCanvas(p.windowWidth, p.windowHeight)
    console.log("setting up")
    p.textFont(tFont)
    p.cursor("228ed835800150758bdcfe3a458531a8.png")
    socket.on('mouseRep', p.newDrawing)
    socket.on('unit', p.logUnit)
    p.fill(255)
  }


  p.logUnit = function(data) {
    if (data.db == discourses.db) {
      discourses.addUnit(data.c, data.p, data.t, data.u, data.r, data.d, data.db)
      discourses.vis()
    }
  }


  p.newDrawing = function(data) {
    console.log("got sent something")
    p.noFill();
    p.stroke(255, 0, 100);
    p.strokeWeight(1.5);
    p.line(data.x - 3, data.y - 3, data.x + 3, data.y + 3)
    p.line(data.x - 3, data.y + 3, data.x + 3, data.y - 3)
  }

  // p.printItOut = function(data) {
  //   console.log(data);
  // }


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
    if (document.getElementById('rp-b').classList.contains('current')) {
      discourses.concern()
    }
  }

  p.submitUnit = function() {
    let temp = document.getElementById('tempGeist')
    let tempButton = document.getElementById('tempGeistButton')
    let escButton = document.getElementById('escapeGeistButton')
    if (temp.value != "") {
      let ttop = temp.offsetTop
      let tleft = temp.offsetLeft
      let tcont = temp.value
      let tDisc = {
        c: tcont,
        p: {
          x: tleft,
          y: ttop - position
        },
        t: 0,
        u: discourses.set.length,
        r: [],
        d: [p.year(), p.month(), p.day(), p.hour(), p.minute(), p.second()],
        db: document.getElementById('filterKey').textContent
      }
      console.log(tDisc.d)
      temp.remove()
      tempButton.remove()
      escButton.remove()
      discourses.addUnit(tDisc.c, tDisc.p, tDisc.t, tDisc.u, [], tDisc.d, tDisc.db)
      socket.emit('unit', tDisc);
      discourses.vis()
    } else {
      temp.placeholder = '!!! empty unit cannot be submitted \r\n \r\n fill the area with discursive content \r\n \r\n ...or press ESCAPE to remove the input area'
    }
  }

  p.escapeUnit = function() {
    let temp = document.getElementById('tempGeist')
    let tempButton = document.getElementById('tempGeistButton')
    let tempEscButton = document.getElementById('escapeGeistButton')
    if (temp != null) {
      temp.remove()
      tempButton.remove()
      tempEscButton.remove()
    }
  }

  p.keyPressed = function() {
    if (p.keyCode === 32) {
      if (document.getElementById('gp-b').classList.contains('current')) {
        if (document.getElementsByClassName('geist').length < 1) {
          let input = p.createElement("textarea").class('geist')
          let inputButton = p.createButton('submit').class('geistButton')
          let escButton = p.createButton('X').class('geistButton')
          inputButton.position(p.mouseX, p.mouseY - 20)
          escButton.position(p.mouseX + 380, p.mouseY - 20)
          input.position(p.mouseX, p.mouseY)
          input.id('tempGeist')
          input.attribute('placeholder', '. r/ ____ provide for response \r\n. q/ ____ provide for quotation \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n. // ____ provide before citation')
          inputButton.id('tempGeistButton')
          escButton.id('escapeGeistButton')
          inputButton.mousePressed(p.submitUnit)
          escButton.mousePressed(p.escapeUnit)
        }
      }
    }
  }

  p.setPositions = function() {
    document.getElementById("vertPos").innerHTML = position
  }

  p.mousePressed = function() {
    if (p.mouseX > 0 && p.mouseX < 100 && p.mouseY > 0 && p.mouseY < 100) {
      let fs = p.fullscreen();
      p.fullscreen(!fs);
    }
  }

  p.windowResized = function(){
    p.resizeCanvas(p.windowWidth,p.windowHeight);
    back.resizeCanvas(back.windowWidth, back.windowHeight)
    content.resizeCanvas(content.windowWidth,content.windowHeight)
    back.refreshed()
    discourses.vis()
  }
}, 'overlay')

$(document).on('keydown', '.geist', function() {
  checkInput()
})

let checkInput = function() {
  let el = document.getElementById("tempGeist")
  if (el != null) {
    let tempText = el.value
    if (tempText.includes("r/")) {
      el.classList.remove('quotation')
      el.classList.add('response');

    } else if (tempText.includes("q/")) {
      el.classList.remove('response');
      el.classList.add('quotation')
    }
  }
}

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

  document.getElementById('overlay').addEventListener("wheel", event => reposition(event), {
    passive: true
  });
  socket.on('dataRep', data => {
    loadDiscourseUnitsToArray(data)

    console.log(discourses);
  })

  document.getElementById('vert30').onclick = () => {
    vertSpeed = 30;
  }
  document.getElementById('vert60').onclick = () => {
    vertSpeed = 60;
  }
  document.getElementById('vert90').onclick = () => {
    vertSpeed = 90;
  }

  document.getElementById('about-this-website').onclick = () => {
    document.getElementById('about-window-overlay').classList.remove('disabled');

  }
  document.getElementById('about-window-overlay-close').onclick = () => {
    document.getElementById('about-window-overlay').classList.add('disabled');
  }
  document.getElementById('fs').onclick = () => {
    let fs = overlay.fullscreen();
    overlay.fullscreen(!fs);
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
