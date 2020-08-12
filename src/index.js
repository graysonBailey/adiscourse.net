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
export let general = []
let splashUnits = []
let allData = []

export let position = 0;
let vertSpeed = 30;

export const socket = io();

export const overlay = new p5((p) => {
  let curs;
  let pointers = [p.createVector(0, 0), p.createVector(0, 0)];
  let cnv;

  p.preload = function() {

    curs = p.loadImage("swift.png")
  }


  p.setup = function() {
    cnv = p.createCanvas(p.windowWidth, p.windowHeight)
    p.cursor("swift.png")
    console.log("overlay canvas set up")
    socket.on('mouseRep', p.newDrawing)
    socket.on('unit', p.logUnit)
    p.fill(255)
    p.intSetStart();
  }

  p.intSetStart = function() {
    splashUnits.push({
      "c":"c/ [non-linear] : another challenge is to the idea that critical written discourse needs to be forced into a linear structure to be understood. ",
      "p":{
        "x":1187,
        "y":777
      },
      "t":0,
      "u":"intro25",
      "r":[],
      "d":[2020,6,18,13,25,49],
      "db":["**"],
      "_id":"QgMOCwAxFIRVaOGc"
    })
    splashUnits.push({
      "c":"~ introduction:\n\nin case you haven't been here before, you can follow these loose instructions for a better idea of the operations and spaces of this site.",
      "p":{"x":290,"y":235},
      "t":0,
      "u":"intro21",
      "r":["intro22"],
      "d":[2020,6,18,13,9,15],
      "db":["**"],
      "_id":"WUnR1zbmuEslErcl"
    })

    splashUnits.push({
      "c":"r/ Updates: \n\n+ getSTATE developments\n+ minor bug fixes\n+ citation process disincludes hyperlink characters\n+ addition c/ distinctions in addition to r/ and q/",
      "p":{"x":1170,"y":135},
      "t":0,
      "u":"updates",
      "r":["intro21"],
      "d":[2020,6,18,13,9,15],
      "db":["**"],
      "_id":"WUnR1zbmuEslErcl"
    })
    splashUnits.push({
      "c":"c/ The intention of -this- discursive interface <adiscourse.net> is to challenge a slew of inherited assumptions about \"discursive practice\" which remain largely unexamined. ",
      "p":{"x":324,"y":836},
      "t":0,
      "u":"intro29",
      "r":["intro25","intro26"],
      "d":[2020,6,18,14,51,3],
      "db":["**"],
      "_id":"dR3HROYPoZ39dXUo"
    })
    splashUnits.push({
      "c":"c/ [non-authorial] : one challenge is to the very idea that direct authorship - a rather entrenched (but not very old) idea in which persona is central to the authority of thought - is somehow the best way to generate discourse.",
      "p":{"x":1162,"y":665},
      "t":0,
      "u":"intro24",
      "r":["intro29"],
      "d":[2020,6,18,13,21,24],
      "db":["**"],
      "_id":"keI7nqa16smq1SWY"
    })
    splashUnits.push({
      "c":"c/ \"discursive practices\" are about as varied as discursive interfaces - coffee shop meetings, the conversations and tactics of Social Media, the presentation of a paper at a symposium.\n\nUsually in academic spheres these practices might involve submission of an abstract, response of acceptance of denial, the coalescing of sources into a resolved, linear, authorial argument which contributes to the general sphere of -that- area of discourse.",
      "p":{"x":366,"y":922},
      "t":0,
      "u":"intro27",
      "r":["intro29","intro1592485929455"],
      "d":[2020,6,18,13,36,23],
      "db":["**"],
      "_id":"rEkgawKOsAQsViGX"
    })
    splashUnits.push({
      "c":"c/ for starters, what you are using now is a \"discursive interface\" - sounds very special, but I'm sure you've been using one type or other of a discursive interface for years. \n\nEspecially if you're on Twitter (a discursive interface), use e-mail (a discursive interface), or have written anything at any time (lots of discursive interfaces there). Many differences exist among them all. They have very different intentions. Social Media has a certain flair for discourse, as does using a pen or pencil to write out ideas in a notebook which no one is allowed to look at, as does a riot in the street.",
      "p":{"x":416,"y":419},
      "t":0,
      "u":"intro22",
      "r":["intro23","intro29"],
      "d":[2020,6,18,13,14,45],
      "db":["**"],
      "_id":"wloGufkYljWntfrg"
    })
    splashUnits.push({
      "c":"c/ [irresolution] : a third challenge is to the idea of resolution - in the form of a resolved argument without deviation, a final composition, or the belief that fixity can be conceptually achieved...",
      "p":{"x":1154,"y":873},
      "t":0,
      "u":"intro26",
      "r":[],
      "d":[2020,6,18,13,31,15],
      "db":["**"],
      "_id":"zYiDkGG2WO466P8V"
    })
    splashUnits.push({
      "c":"c/ But, before this gets too long (which isn't really a problem),  you should test out each of the steps and actions out so that when you're in the full database everything makes more sense.\n\n",
      "p":{"x":627,"y":1512},
      "t":0,
      "u":"intro1592486711884",
      "r":["intro1592488799565"],
      "d":[2020,6,18,15,25,11],
      "db":["**"],
      "_id":"62Y9kunnpNIqNovT"
    })
    splashUnits.push({
      "c":"c/ <adiscourse.net> is both an alternative to these usual modes of producing critical discourse, as well as an opening to deconstruct what \"modes of discourse production\" really are.  Very often the work of composing concepts and thoughts is thrown to the idea of a genius moment, but we all know that's bullshit. Instead, there are a whole process of material events (labor acts) which contribute to the output of discourse in whatever format...",
      "p":{"x":325,"y":1221},
      "t":0,
      "u":"intro1592486128168",
      "r":["intro1592486711884","intro27"],
      "d":[2020,6,18,15,15,28],
      "db":["**"],
      "_id":"m7ZlUeu2SClOSNqE"
    })
    splashUnits.push({
      "c":"c/ #1 : drag your cursor while having the LEFT-MOUSE-BUTTON engaged. Do you see those blue circles? They are some drawn remnants you're leaving behind, but also sending out. If you see different markers appear which you haven't drawn... that's because its other people using the interface. ",
      "p":{"x":1178,"y":1469},
      "t":0,
      "u":"intro1592487165230",
      "r":["intro1592486711884"],
      "d":[2020,6,18,15,32,45],
      "db":["**"],
      "_id":"sCEBHI5TYb1KKJeg"
    })
    splashUnits.push({
      "c":"q/ \"different types of input have different attributes, which allow for the intermixing of attempts at composition (aquamarine), quotes/references (black), and responses (reddish). Each of these elements are pretty central to discursive production, and the usage of each is a bit emergent, since it's all based on collaborative use.\" // grayson daniel bailey, adiscourse.net, a few days after turning 30",
      "p":{"x":1460,"y":1859},
      "t":0,
      "u":"intro1592487556253",
      "r":[],
      "d":[2020,6,18,15,39,16],
      "db":["**"],
      "_id":"MZt3NRXgxp0wkqPy"
    })
    splashUnits.push({
      "c":"c/ #2 : Go on over to the left side of the screen and press the Geist Plane button.\nThe background changes and suddenly there's some instructions over there in the bottom left...\n\n...These explain how to provide input like your currently reading.",
      "p":{"x":1099,"y":1693},
      "t":0,
      "u":"intro1592487328632",
      "r":["intro1592487556253","intro1592486711884"],
      "d":[2020,6,18,15,35,28],
      "db":["**"],
      "_id":"tS3x9vkMmcs99F1i"
    })
    splashUnits.push({
      "c":"c/ #3 : lets make some relations! Once you've input a few different elements, try relating them if they are conceptually comparable or if one is derivative of the other or if one is trying to dispute the other. First, click the Relation Plane button, then click two elements to relate them.",
      "p":{"x":571,"y":1748},
      "t":0,
      "u":"intro1592487751332",
      "r":["intro1592486711884","intro1592488124638","intro1592487906533"],
      "d":[2020,6,18,15,42,31],
      "db":["**"],
      "_id":"9v4iJODfGQFqwjNF"
    })
    splashUnits.push({
      "c":"r/ these relations exist all the time within networks and human communication - usually its in the form of metadata or another structure of information which couches comments within threads, an original post within a reblog, or whatever have you. ",
      "p":{"x":814,"y":2041},
      "t":0,
      "u":"intro1592487906533",
      "r":[],
      "d":[2020,6,18,15,45,6],
      "db":["**"],
      "_id":"UVVVfr2037oqEcKO"
    })
    splashUnits.push({
      "c":"r/ notice how things move about a bit when they get cramped, but only when scrolling? That's so that overlapping can be minimized without depending on constant animation. It's also an aesthetic choice, as everything is...",
      "p":{"x":161,"y":1597},
      "t":0,
      "u":"intro1592488124638",
      "r":[],
      "d":[2020,6,18,15,48,44],
      "db":["**"],
      "_id":"eijkZgYQayh1hXGN"
    })
    splashUnits.push({
      "c":"c/ Now that you've tested some things out, you can move on into the actual database by clicking on the Load Discourses Button, which will take you to an area where you can check out, interact with, and contribute to the database and thematic filters. \n\nNothing on this page will be saved, so the real rubber meets the road moment is in the database. Many other aspects and potentials of the interface are going to be left unexplained - the use of the tool is emergent, meaning that it develops forms of use through being used, rather having a simple \"click this, does that\" style of interaction.\n\nWhile this means that the interface is less intuitive (in a few ways) and less understandable (in a few ways) than the usual website, that's the point. \n\nIf you have no interest in using a vague interface in collaboratively producing some critical discourse, tschüs!  If you do, let's build it together.",
      "p":{"x":368,"y":2369},
      "t":0,
      "u":"intro1592488799565",
      "r":[],
      "d":[2020,6,18,15,59,59],
      "db":["**"],
      "_id":"VGViBFsfFndlYGq7"
    })
    splashUnits.push({
      "c":"r/ while it takes a bit too long to provide here, the various breakdowns of 'disciplinary' versus 'political' discourses, as well as the tranformation from \"written/spoken\" significations into overall fields of political  and social interaction is a wild ride. I'd definitely suggest David Howarth's \"Discourse\" as a primer, then jump into the rest.",
      "p":{"x":968,"y":1073},
      "t":0,
      "u":"intro1592485929455"
      ,"r":[],
      "d":[2020,6,18,15,12,9],
      "db":["**"],
      "_id":"2umHtdquele5QeE9"
    })
    discourses = loadDiscourseUnitsToArray(splashUnits)
    discourses.vis()
  }

  p.logUnit = function(data) {
    discourses.addUnit(data.c, data.p, data.t, data.u, data.r, data.d, data.db)
    discourses.vis()
  }

  p.newDrawing = function(data) {
    p.noFill();
    p.stroke(255, 0, 100);
    p.strokeWeight(1.5);
    p.line(data.x - 3, data.y - 3, data.x + 3, data.y + 3)
    p.line(data.x - 3, data.y + 3, data.x + 3, data.y - 3)
  }

  p.mouseDragged = function() {
    var data = {
      x: p.mouseX,
      y: p.mouseY,
    }
    socket.emit('mouse', data);
    p.noStroke();
    p.fill(47, 230, 240)
    p.ellipse(p.mouseX, p.mouseY, 6, 6);
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
      while(tcont.charAt(0) == " "){
        tcont = tcont.slice(1)
      }
      let filtKey = document.getElementById('filterKey').textContent
      let context = filtKey.split('|')
      let tDisc = {
        c: tcont,
        p: {
          x: tleft,
          y: ttop - position
        },
        t: 0,
        u: context+Date.now().toString(),
        r: [],
        d: [p.year(), p.month(), p.day(), p.hour(), p.minute(), p.second()],
        db: context
      }
      temp.remove()
      tempButton.remove()
      escButton.remove()
      discourses.addUnit(tDisc.c, tDisc.p, tDisc.t, tDisc.u, [], tDisc.d, tDisc.db)
      if (document.getElementById('filterKey').textContent !== "**") {
        socket.emit('unit', tDisc);
      }
      discourses.vis()
    } else {
      temp.placeholder = '!!! empty unit cannot be submitted \r\n \r\n fill the area with discursive content \r\n \r\n ...or press the X to remove the input area'
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
          input.attribute('placeholder', 'using "q/" distinguishes a quote or reference \r\n using "r/" distinguishes a response or reaction  \r\n using "c/" distinguishes a bit of composition\r\n using no preface distinguishes nothing \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n using "^^" between references and a citation separates the citation cleanly')
          inputButton.id('tempGeistButton')
          escButton.id('escapeGeistButton')
          inputButton.mousePressed(p.submitUnit)
          escButton.mousePressed(p.escapeUnit)
        } else {
          document.getElementById('tempGeist').focus()
        }
      }
    }
  }

  p.setPositions = function() {
    document.getElementById("vertPos").innerHTML = position
  }

  p.windowResized = function() {
    p.whoaSize();
  }

    p.whoaSize = function(){
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    back.resizeCanvas(p.windowWidth, p.windowHeight+60)
    content.resizeCanvas(p.windowWidth, p.windowHeight+60)
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

  let discs = new discourseSet(content)
  for (let each in units) {
    let unit = units[each]
    discs.addUnit(unit.c, unit.p, unit.t, unit.u, unit.r, unit.d, unit.db)
  }
  return discs;
}

function downloadThatData(){

  let stringData = JSON.stringify(allData)
 let a = document.createElement("a")
 let file = new Blob([stringData], {type:'text/plain'})
 a.href = URL.createObjectURL(file)
 a.download ='adiscourseNet.JSON'
 a.click();
 URL.revokeObjectURL(a.href)

}

window.onload = function() {

  document.getElementById('overlay').addEventListener("wheel", event => reposition(event), {
    passive: true
  })
  socket.on('dataRep', data => {
    allData = data;
    general = loadDiscourseUnitsToArray(data)
  })

  document.getElementById('vert30').onclick = () => {
    vertSpeed = 30
  }

  document.getElementById('vert60').onclick = () => {
    vertSpeed = 60
  }

  document.getElementById('vert90').onclick = () => {
    vertSpeed = 90
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
    document.getElementById('discourseLoad').classList.remove('current');
    document.getElementById('rp-b').classList.add('current');
    document.getElementById('rightCascade').classList.remove('away');
    switchModeInstructions(2)
    discourses.vis()
  }
  document.getElementById('gp-b').onclick = () => {
    document.getElementById('rp-b').classList.remove('current');
    document.getElementById('discourseLoad').classList.remove('current');
    document.getElementById('gp-b').classList.add('current');
    document.getElementById('rightCascade').classList.add('away');
    switchModeInstructions(1)
    discourses.vis()
  }

  document.getElementById('searchToggle').onclick = () => {
    document.getElementById('bump').classList.toggle('away')
    document.getElementById('searchKey').classList.toggle('away')
    document.getElementById('rp-search').classList.toggle('away')
    document.getElementById('searchItems').classList.toggle('away')
  }

  document.getElementById('discourseLoad').onclick = () => {
    document.getElementById('filterKey').textContent = "--"
    overlay.clear()
    content.clear()
    discourses = general
    let presenter = new discursiveOverlay(overlay)
    presenter.giveChoices()
    document.getElementById('gp-b').classList.add('away')
    document.getElementById('rp-b').classList.add('away')
    document.getElementById('discourseLoad').classList.add('away')
    document.getElementById('switchLoad').classList.remove('away')
    document.getElementById('rightCascade').classList.add('away')
  }


  document.getElementById('discourseLoad').onclick = () => {
    document.getElementById('filterKey').textContent = "--"
    overlay.clear()
    content.clear()
    discourses = general
    let presenter = new discursiveOverlay(overlay)
    presenter.giveChoices()
    document.getElementById('gp-b').classList.add('away')
    document.getElementById('rp-b').classList.add('away')
    document.getElementById('discourseLoad').classList.add('away')
    document.getElementById('switchLoad').classList.remove('away')
    document.getElementById('rightCascade').classList.add('away')
  }

  document.getElementById('switchLoad').onclick = () => {
    document.getElementById('rp-b').classList.remove('current')
    document.getElementById('gp-b').classList.remove('current')
    document.getElementById('gp-b').classList.add('away')
    document.getElementById('rp-b').classList.add('away')
    document.getElementById('filterKey').textContent = "--"
    document.getElementById('rightCascade').classList.add('away')
    content.clear()
    document.getElementById('printData').classList.toggle('away')
    switchModeInstructions(0)
    let presenter = new discursiveOverlay(overlay)
    overlay.clear()
    presenter.giveChoices()
    position = 0
    document.getElementById('vertPos').innerText = position
  }

  document.getElementById('downData').onclick = () => {
    downloadThatData()
  }

  document.getElementById("searchItems").onclick = () => event.stopPropagation()

  document.getElementById('rp-search').onclick = () => {
    event.stopPropagation()
    while (document.getElementsByClassName("resultItem")[0] != null) {
      document.getElementsByClassName("resultItem")[0].remove()
    }
    let currentKey = document.getElementById('searchKey').value
    let results
    if(currentKey != "" && currentKey != " "){
      results = discourses.set.filter(item => item.c.includes(currentKey))
    } else {
      results = []
    }

    for(let each in results){
      let tempSpan = document.createElement('span')
      tempSpan.classList.add('resultItem')
      tempSpan.id = results[each].u
      tempSpan.textContent = "["+results[each].u+"]\n\n"+results[each].c+"\n\n-----------------\n\n"
      document.getElementById('searchItems').appendChild(tempSpan)
      tempSpan.onclick = () => {
        //event.stopPropagation()
        console.log(tempSpan.id)
        if(discourses.pendingRelation.length == 0){
          let quickSelect = discourses.set.filter(item => item.u == tempSpan.id)
          discourses.pendingRelation.push(quickSelect[0])
          console.log(discourses.pendingRelation)
        } else if(discourses.pendingRelation.length == 1 && discourses.pendingRelation[0] != tempSpan.id){
          discourses.pendingRelation[1] = tempSpan.id
          let data = {
            u: discourses.pendingRelation[0].u,
            r: tempSpan.id
          }
          console.log(data)
          if (document.getElementById('filterKey').textContent !== "**") {
            socket.emit('relation', data);
          }
          console.log(discourses.pendingRelation)
          setTimeout(() => {
            discourses.pendingRelation[0].relatesTo.push(tempSpan.id)
            discourses.pendingRelation = []
            discourses.vis()
          }, 20)

          discourses.unhighlight();
        }
      }
    }
  }

  document.getElementById('printData').onclick = () => {
    let sets = document.getElementById('filterKey').textContent.split('|')
    let concat = sets.join('$-$')
    let site = window.location.href+concat
    window.open(site)
  }


setTimeout(() =>{
  let datas = "frisk"
  socket.emit('gimmeData', datas);
},300)


}
