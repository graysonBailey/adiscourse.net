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
let allData= []



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
    introTexts();
  }


  p.intSetStart = function() {
    // splashUnits.push({
    //   "c": "r/ These roles of interpersonal / social negotiation align with Colin Ward's critique of the role of the police, insomuch that the police exist to distance us from our social collaborators, creating space for impersonal violence in exchange for avoiding the awkwardness and tension of negotiations within a shared society. Recently the CHAZ in Seattle is an obvious attempt to deconstruct this relationship, but it's always a gamble when people are armed..." ,
    //   "p": {
    //     "x": 844,
    //     "y": 380
    //   },
    //   "t": 0,
    //   "u": 0,
    //   "r": [],
    //   "d": [2020, 6, 13, 6, 33, 30],
    //   "db": "**"
    // })
    // splashUnits.push({
    //   "c": "q/ \"A radical concept of freedom, therefore, can only be one that deals with freedom in cooperation: I am free if I am free in my negotiation with other, i.e., uninhibited by any higher authority and not restricted by anybody through force. But this simply means that I am equal to others in cooperation: that my cooperation is not a forced one but that I can negotiate it with others at eye level and that there is nobody above me to whose rules and controle I am subjugated. In a radical concept of freedom and of equality both coincide in one.\" // Christoph Spehr, \"Free Cooperation\", The Art of Free Cooperation, 2007, 92",
    //   "p": {
    //     "x": 260,
    //     "y": 525
    //   },
    //   "t": 0,
    //   "u": 1,
    //   "r": [0],
    //   "d": [2020, 6, 13, 6, 33, 30],
    //   "db": "**"
    // })
    // splashUnits.push({
    //   "c": "q/ \"As we see it, contracting in gross and building's incorporation into capitalism brought about a shift away from what Karl Marx calls \"direct social relations between things\" that were now enacted through the specification. Specifications, and the contractual documents of which they were part, took voer what had previously been lived, personal negotiations between architects and builders on site\" // Katie Lloyd Thomas & Tilo Amhoff, \"Writing Work\", The Architect as Worker, 2015, 125",
    //   "p": {
    //     "x": 537,
    //     "y": 145
    //   },
    //   "t": 0,
    //   "u": 2,
    //   "r": [0],
    //   "d": [2020, 6, 13, 6, 33, 30],
    //   "db": "**"
    // })
    // splashUnits.push({
    //   "c": "q/ \"The practice of articulation, therefore, consists in the construction of nodal points which partially fix meaning; and the partial character of this fixation proceeds from the openness of the social, a result, in its turn, of the constant overflowing of every discourse by the infinitude of the field of discursivity.\" // Ernesto Laclau & Chantal Mouffe, Hegemony and Socialist Strategy, 1985, 100",
    //   "p": {
    //     "x": 1102,
    //     "y": 672
    //   },
    //   "t": 0,
    //   "u": 4,
    //   "r": [0],
    //   "d": [2020, 6, 13, 6, 33, 30],
    //   "db": "**"
    // })
    // splashUnits.push({
    //   "c": "r/ First and foremost these negotiations need to be done in discursive terms, creating these nodal points around collective reality can be built - I'm not sure this means that material negotiations need to come after, but the immanent practices of articulation seem to be constructive towards having a subject position from which to negotiate. Oh boy, Post-Marxists make my head hurt...",
    //   "p": {
    //     "x": 700,
    //     "y": 890
    //   },
    //   "t": 0,
    //   "u": 5,
    //   "r": [4],
    //   "d": [2020, 6, 13, 6, 33, 30],
    //   "db": "**"
    // })
    discourses = loadDiscourseUnitsToArray(splashUnits)
    discourses.vis()
  }

  p.logUnit = function(data) {
    if (data.db == discourses.db) {
      discourses.addUnit(data.c, data.p, data.t, data.u, data.r, data.d, data.db)
      discourses.vis()
    }
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
      let context = document.getElementById('filterKey').textContent
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
      console.log(tDisc.u)
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
          input.attribute('placeholder', ' using "q/" distinguishes a quote or reference \r\n using "r/" distinguishes a response or reaction  \r\n using no preface distinguishes nothing \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n using "//" between references and a citation separates the citation cleanly')
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

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    back.resizeCanvas(p.windowWidth, p.windowHeight)
    content.resizeCanvas(p.windowWidth, p.windowHeight)
    back.refreshed()
    discourses.vis()
    if (document.getElementById('filterKey').textContent == "**") {
      introTexts()
    }
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

function introTexts() {
  overlay.textSize(30)
  overlay.noStroke()

  overlay.fill(0, 153, 255)
  overlay.rect(1160, 120, 600, 20)
  overlay.rect(1160, 160, 700, 20)
  overlay.rect(1160, 200, 650, 20)

  overlay.fill('#660066')

  overlay.rect(50, overlay.windowHeight * .205, 220, 20)
  overlay.rect(200, overlay.windowHeight * .365, 400, 10)
  overlay.rect(200, overlay.windowHeight * .425, 400, 10)



  overlay.fill('#CCFFFF')

  overlay.text("* t h i s   i s   a n   a s y n c h r o n o u s   d i s c o u r s e   t o o l ,", 1165, 130)
  overlay.text("* t h i s   i s   a   n o n - a u t h o r i a l   d i s c u r s i v e   p r a c t i c e , ", 1165, 170)
  overlay.text("* t h i s   i s   a   d i s c o u r s e - s p a c e   w e   c o n s t r u c t . . .", 1165, 210)
  overlay.fill(255, 153, 204)
  overlay.text(". . . b u t   f i r s t   i t   i s   a n   i n t r o d u c t i o n ", 1165, 255)

  let gpX = document.getElementById('gp-b').offsetTop
  let gpY = document.getElementById('gp-b').offsetLeft

  let rpX = document.getElementById('rp-b').offsetTop
  let rpY = document.getElementById('rp-b').offsetLeft

  let lX = document.getElementById('discourseLoad').offsetTop
  let lY = document.getElementById('discourseLoad').offsetLeft

  overlay.textSize(16)
  overlay.fill(255, 204, 215)
  overlay.text("#3 when you've tested everything else...", 60, overlay.windowHeight * .21)
  overlay.text("this will take off the training wheels }", 60, overlay.windowHeight * .23)
  overlay.text("<--- #1 _ a plane for entering things (try entering something)", 210, overlay.windowHeight * .37)
  overlay.text("<--- #2 _ a plane for relating things (try relating something)", 220, overlay.windowHeight * .43)
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
  });
  socket.on('dataRep', data => {
    allData = data;
    general = loadDiscourseUnitsToArray(data)
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
    document.getElementById('discourseLoad').classList.remove('current');
    document.getElementById('rp-b').classList.add('current');
    switchModeInstructions(2)
    discourses.vis()
  }
  document.getElementById('gp-b').onclick = () => {
    document.getElementById('rp-b').classList.remove('current');
    document.getElementById('discourseLoad').classList.remove('current');
    document.getElementById('gp-b').classList.add('current');
    switchModeInstructions(1)
    discourses.vis()
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
  }

  document.getElementById('switchLoad').onclick = () => {
    document.getElementById('rp-b').classList.remove('current')
    document.getElementById('gp-b').classList.remove('current')
    document.getElementById('gp-b').classList.add('away')
    document.getElementById('rp-b').classList.add('away')
    document.getElementById('filterKey').textContent = "--"
    content.clear()
    switchModeInstructions(0)
    let presenter = new discursiveOverlay(overlay)
    overlay.clear()
    presenter.giveChoices()
    position = 0
    document.getElementById('vertPos').innerText = position
  }

  document.getElementById('downData').onclick = () => {
    //downloadThatData()
    console.log(allData)
    downloadThatData()
  }


setTimeout(() =>{
  let datas = "frisk"
  socket.emit('gimmeData', datas);
},300)


}
