import _ from 'lodash';
import './style.css';
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
      "c":"Pressing the \"loadDiscourse\" button will take you further into {adiscourse.net}, able to choose from the spaces already created for thematic discourse, overlay multiple discourse spaces, or create a discourse space of your own. ",
      "p":{"x":1138,"y":4248},
      "t":0,
      "u":"splash1599143377176",
      "r":[],
      "d":[2020,9,3,16,29,37],
      "db":["**"],
      "_id":"1NxkQGNksjFBSTUN"
    })

    splashUnits.push({
      "c":"c/ But more specifically, I do not fully understand {adiscourse.net}, even while creating it, because it is a work of instability and productive negation. It is, in this way, intended as an anarchist subversion.",
      "p":{"x":525,"y":1229},
      "t":0,
      "u":"splash1599140090457",
      "r":["splash1599140311443"],
      "d":[2020,9,3,15,34,50],
      "db":["**"],
      "_id":"44ESxjCrAGPlDiut"
    })

    splashUnits.push({
      "c":"Suggestions for use:",
      "p":{"x":1280,"y":160},
      "t":0,
      "u":"splash1599142807653",
      "r":["splash1599142898040"],
      "d":[2020,9,3,16,20,7],
      "db":["**"],
      "_id":"8WJ6XSeJaJIZGUwo"
    })

    splashUnits.push({
      "c":"c/ Interacting here and now - the space of interaction. Elements jump, positions are reorganized, the environment is expansive and unstable.",
      "p":{"x":251,"y":2891},
      "t":0,
      "u":"splash1599142141019",
      "r":["splash1599141381678"],
      "d":[2020,9,3,16,9,1],
      "db":["**"],
      "_id":"BujGRcVb3l2L4AzG"
    })

    splashUnits.push({
      "c":"c/ The result is an asynchronous, non-authorial, incomplete environment and product. The result is {adiscourse.net}.",
      "p":{"x":682,"y":3916},
      "t":0,
      "u":"splash1599142653752",
      "r":["splash1599142592736","splash1599143256513"],
      "d":[2020,9,3,16,17,33],
      "db":["**h"],
      "_id":"IBCnoUv97pQXzd3N"
    })

    splashUnits.push({
      "c":"c/ And you can click on \"getSTATE\" to see the second style of review, the temporary frozen object which can be saved in a number of ways.",
      "p":{"x":610,"y":-530},
      "t":0,
      "u":"splash1599144897563",
      "r":[],
      "d":[2020,9,3,16,54,57],
      "db":["**"],
      "_id":"IR1ugKlrNPvQzbqQ"
    })

    splashUnits.push({
      "c":"c/ {adiscourse.net} is a discourse tactic without resolution, a jump between two structures - a subversion.",
      "p":{"x":551,"y":2575},
      "t":0,
      "u":"splash1599141381678",
      "r":["splash1599141899687","splash1599142219550"],
      "d":[2020,9,3,15,56,21],
      "db":["**"],
      "_id":"ODie4QN8TQep2zWd"
    })

    splashUnits.push({
      "c":"c/ Viewing it from an Object-Oriented Ontology/Philosophy, perhaps this is because it _withdraws_ - as all objects do - even as I work on the code which produces the interactions on the screen. I can only understand it contingently from the point of interface I occupy at any given time.",
      "p":{"x":370,"y":964},
      "t":0,
      "u":"splash1599139529473",
      "r":["splash1599138823187","splash1599140090457"],
      "d":[2020,9,3,15,25,29],
      "db":["**"],
      "_id":"OEyofWTOO8Td9A4f"
    })

    splashUnits.push({
      "c":"c/ And so with a full understanding or not, the intention here is a dialogical exchange (between server and client, between human and human, etc.) which neither tries to impress with individual erudition, nor ignore content in preference for underlying data.",
      "p":{"x":755,"y":3631},
      "t":0,
      "u":"splash1599142592736",
      "r":[],
      "d":[2020,9,3,16,16,32],
      "db":["**"],
      "_id":"QZm7crUVjedPsn5c"
    })

    splashUnits.push({
      "c":"c/ I have been working on a project for the past four months (June - September 2020) which I do not fully understand: {adiscourse.net}",
      "p":{"x":483,"y":803},
      "t":0,
      "u":"splash1599138823187",
      "r":["splash1599139961230","splash1599138689680"],
      "d":[2020,9,3,15,13,43],
      "db":["**"],
      "_id":"Qpvqygtj9cWqUzv0"
    })

    splashUnits.push({
      "c":"r/ What are those golden lines, you ask? Relation sort of things - you can investigate how that works after engaging the \"verbindungs-face\" button.",
      "p":{"x":681,"y":-241},
      "t":0,
      "u":"splash1599143564816",
      "r":["splash1599143493208"],
      "d":[2020,9,3,16,32,44],
      "db":["**"],
      "_id":"VshiDZ9VrjZGtg42"
    })

    splashUnits.push({
      "c":"c/ From the view of Discourse, it's also inevitable - the overdetermined field of meaning spits in the face of fixed understanding.",
      "p":{"x":951,"y":1032},
      "t":0,
      "u":"splash1599139961230",
      "r":["splash1599140090457"],
      "d":[2020,9,3,15,32,41],
      "db":["**"],
      "_id":"W6p25iuRZ5OX2In8"
    })

    splashUnits.push({
      "c":"c/ Nothing you input on this screen will be persistent, but everything you type in the discourse spaces will be very persistent... If you wish to return to this intro, you'll need to refresh the screen and enter the interface again.",
      "p":{"x":1702,"y":-436},
      "t":0,
      "u":"splash1599144190282",
      "r":["splash1599144897563"],
      "d":[2020,9,3,16,43,10],
      "db":["**"],
      "_id":"X3D71VYSKxmGVFws"
    })

    splashUnits.push({
      "c":"c/ Anarchist in a Colin Ward / post-structural sense: anarchism as a \"social and political philosophy out of the natural and spontaneous tendency of human beings to associate together for their mutual benefit.\"^^Colin Ward, Anarchy in Action, 1996, 19",
      "p":{"x":1039,"y":1407},
      "t":0,
      "u":"splash1599140311443",
      "r":["splash1599140577690"],
      "d":[2020,9,3,15,38,31],
      "db":["**"],
      "_id":"X7sC6zn4QmiEYYop"
    })

    splashUnits.push({
      "c":"c/ In contrast to the normal functions of academic discourse, there is no pyramid structure of passing knowledge and there is no final tome which to raise up as a conclusion.",
      "p":{"x":322,"y":2092},
      "t":0,
      "u":"splash1599140846456",
      "r":["splash1599141257360"],
      "d":[2020,9,3,15,47,26],
      "db":["**"],
      "_id":"ZxzYNWIssQDdD2Vg"
    })

    splashUnits.push({
      "c":"r/ and of course this makes understanding something, a fairly \"order from above\" action, rather difficult.",
      "p":{"x":1055,"y":1623},
      "t":0,
      "u":"splash1599140633622",
      "r":[],
      "d":[2020,9,3,15,43,53],
      "db":["**"],
      "_id":"aWWlrYierthcu7qy"
    })

    splashUnits.push({
      "c":"c/ And anarchist in the destructive way - a way that Colin Ward still agrees with - and is described by Simon Critchley as \"a radical disturbance of the state, a disruption of the state's attempt to set itself or erect itself into a whole (s'eriger en Tout). In our terms, anarchy is the creation of interstitial distance within the state, the continual questioning from below of any attempt to establish order from above.\"^^Simon Critchley, Infinitely Demanding, 2012, 123",
      "p":{"x":481,"y":1534},
      "t":0,
      "u":"splash1599140577690",
      "r":["splash1599140633622","splash1599140762960"],
      "d":[2020,9,3,15,42,57],
      "db":["**"],
      "_id":"c78L7HOfAT5zn223"
    })

    splashUnits.push({
      "c":"c/ Before clicking that big beautiful \"loadDiscourses\" button, I would suggest screwing on this space and seeing what all these other buttons do  - explore {adiscourse.net} a bit from the confines of an intro screen!",
      "p":{"x":1319,"y":-56},
      "t":0,
      "u":"splash1599142898040",
      "r":["splash1599143493208","splash1599144190282"],
      "d":[2020,9,3,16,21,38],
      "db":["**"],
      "_id":"eNWTjJww8aSM4cD3"
    })

    splashUnits.push({
      "c":"c/ Producing the \"state\" - a frozen simplification. The version which is coherent but not dependable, an output of temporary structure broken from depth.",
      "p":{"x":955,"y":2894},
      "t":0,
      "u":"splash1599142219550",
      "r":["splash1599142380851"],
      "d":[2020,9,3,16,10,19],
      "db":["**"],
      "_id":"gwOAVzo4WTjp7WH5"
    })

    splashUnits.push({
      "c":"q/ \"There are a few different styles of input that have graphical differences, but no underlying difference in structure. Try inputting a few different types after engaging the \"geist-face\" button\"^^me, \"the intro suggestions\", 2020, here",
      "p":{"x":1251,"y":-267},
      "t":0,
      "u":"splash1599143493208",
      "r":[],
      "d":[2020,9,3,16,31,33],
      "db":["**"],
      "_id":"lluf5NW8ORdAXWri"
    })

    splashUnits.push({
      "c":"c/ What it subverts, or at least where it subverts, are the functions of discourse - the styles of discursive production which Foucualt determines to be delimiting forces, the production of stable interiors.",
      "p":{"x":648,"y":1890},
      "t":0,
      "u":"splash1599140762960",
      "r":["splash1599140846456","splash1599141018456"],
      "d":[2020,9,3,15,46,2],
      "db":["**"],
      "_id":"n5EfG2Qvm1HlmUwh"
    })

    splashUnits.push({
      "c":"With this result, the symposium is organized - a real-time production of unresolved discourse via material network exchange! While this page might remain fairly organized the others will be organized or disorganized at the discretion of each interaction, generatively producing unit-coherence in a possible network-incoherence - an anarchic organization.",
      "p":{"x":522,"y":4201},
      "t":0,
      "u":"splash1599143256513",
      "r":["splash1599143377176","splash1599142592736"],
      "d":[2020,9,3,16,27,36],
      "db":["**"],
      "_id":"rG8llhIg3E2o1pZb"
    })

    splashUnits.push({
      "c":"r/ I relate this to the game of Go (Weiqi), which is a basic setup with simple rules, but releases a weird amount of potential (\"more potential ending than atoms in the universe\", they say). Even when it was \"solved\" by AlphaGo, it was only the developed styles of play which were mastered, rather than a true understanding of how Go functions or produces space.",
      "p":{"x":1168,"y":2681},
      "t":0,
      "u":"splash1599141899687",
      "r":[],
      "d":[2020,9,3,16,4,59],
      "db":["**"],
      "_id":"sN4rV78wQLwFLcrU"
    })

    splashUnits.push({
      "c":"Introductory notes by grayson daniel bailey:",
      "p":{"x":353,"y":681},
      "t":0,
      "u":"splash1599138689680",
      "r":[],"d":[2020,9,3,15,11,29],
      "db":["**"],
      "_id":"sVb1rP2sPCXPBDDm"
    })

    splashUnits.push({
      "c":"Welcome to the {adiscourse.net} symposium, open from 17:00 CET September 14th until 17:00 CET September 21st 2020.",
      "p":{"x":220,"y":300},
      "t":0,
      "u":"splashDescription0",
      "r":["splashDescription1"],
      "d":[2020,9,3,15,54,17],
      "db":["**"]
    })

    splashUnits.push({
      "c":"This is an asynchronous, non-authorial symposium for real-time discourse production through {adiscourse.net} over themes including but not limited to: radical discourse, media, and architecture. There is no correct form of use, there are no rules over relevance or style, there is only the manner which emerges from collaborative contribution and negotiation in digital space.",
      "p":{"x":800,"y":400},
      "t":0,
      "u":"splashDescription1",
      "r":[],
      "d":[2020,9,3,15,54,17],
      "db":["**"]
    })


    splashUnits.push({
      "c":"Rather than prepared statements, papers, or presentations, the discourse of the symposium is neither academic nor conversational, but a mixture of both without the goal of completion. Have fun and engage.",
      "p":{"x":1200,"y":600},
      "t":0,
      "u":"splashDescription2",
      "r":["splashDescription1"],
      "d":[2020,9,3,15,54,17],
      "db":["**"]
    })


    splashUnits.push({
      "c":"c/ Instead there is a digital-material space of discursive interaction, a set of operations and objects, which oscillate between smooth streams (the environment) and temporary productions (the examinable state).",
      "p":{"x":670,"y":2324},
      "t":0,
      "u":"splash1599141257360",
      "r":["splash1599141381678"],
      "d":[2020,9,3,15,54,17],
      "db":["**"],
      "_id":"tAIzMdJqDgCXTemI"
    })

    splashUnits.push({
      "c":"c/ In contrast to the so-called \"public forum\" of social media discourse, there is not trending wave which to surf, there is no call to immediate reaction, there is no priority of amplifying the most affective message.",
      "p":{"x":1064,"y":2072},
      "t":0,
      "u":"splash1599141018456",
      "r":["splash1599141257360"],
      "d":[2020,9,3,15,50,18],
      "db":["**"],
      "_id":"tHUqPXN5S8KNrQBG"
    })

    splashUnits.push({
      "c":"c/ There is something very frustrating about this, but inherently anarchic. Everything, even the object you're viewing (stream or state), needs to be negotiated with something else. There is never a simple authority achieved.",
      "p":{"x":530,"y":3324},
      "t":0,
      "u":"splash1599142380851",
      "r":["splash1599142141019","splash1599142592736"],
      "d":[2020,9,3,16,13,0],
      "db":["**"],
      "_id":"vfsu3Sn684oWEIkT"
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
