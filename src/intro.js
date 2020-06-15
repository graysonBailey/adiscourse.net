


export let splashUnits = [
  {"c":"r/ as it rm.","p":{"x":600,"y":1000},"t":0,"u":0,"r":[],"d":[2020,6,13,6,33,30],"db":"**"},
  {"c":"q/ \"But ch are 'inscribed'.\" // Deborah Cameron, & Ivan Panovic, Working With Written Discourse, 2014, 97","p":{"x":1412,"y":-482},"t":0,"u":1,"r":[],"d":[2020,6,13,6,33,30],"db":"**"},
  {"c":"q/ \"There.\" // Friedrich Kittler, Discourse Networks 1800/1900, 1990, 21","p":{"x":896,"y":-469},"t":0,"u":3,"r":[],"d":[2020,6,13,6,33,30],"db":"**"},
  {"c":"r/ this Herring method provides a good method to work.","p":{"x":734,"y":-800},"t":0,"u":2,"r":[],"d":[2020,6,13,6,33,30],"db":"**"},
  {"c":"q/ \"Conservationists,uch momentary \"seismological cracks.\" The meta...\" // Ines Weizman, \"Documentary Architecture: the Digital Historiographies of Modernism\", FAKTUR 01 (2018), 23","p":{"x":175,"y":-1180},"t":0,"u":4,"r":[],"d":[2020,6,13,6,33,30],"db":"**"},
  {"c":"q/ \"Hence they do ractices that form the identities of social actors.\" // David Howarth, Discourse, 2000, 101","p":{"x":331,"y":710},"t":0,"u":5,"r":[],"d":[2020,6,13,6,33,30],"db":"**"},
  {"c":"r/ David Howarthm of languages","p":{"x":891,"y":-136},"t":0,"u":6"r":[],"d":[2020,6,13,6,33,30],"db":"**"}
]

let introScreen = new p5((intro) => {
  let tFont;
  let curs;
  let pointers = [intro.createVector(0,0),intro.createVector(0,0)];
  let cnv;

  intro.preload = function() {
    tFont = p.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
  }

  intro.setup = function() {
    cnv = intro.createCanvas(intro.windowWidth, intro.windowHeight)
    intro.textFont(tFont)
    intro.cursor("228ed835800150758bdcfe3a458531a8.png")
    intro.fill(255)
  }

  intro.mouseDragged = function() {
    intro.noStroke();
    intro.fill(47, 230, 240)
    intro.ellipse(intro.mouseX, intro.mouseY, 20, 20);
  }

  intro.mouseClicked = function() {
    if (document.getElementById('rp-b').classList.contains('current')) {
      splash.concern()
    }
  }

  intro.submitUnit = function() {
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
        d: [intro.year(), intro.month(), intro.day(), intro.hour(), intro.minute(), intro.second()],
        db: document.getElementById('filterKey').textContent
      }
      console.log(tDisc.d)
      temp.remove()
      tempButton.remove()
      escButton.remove()
      splash.addUnit(tDisc.c, tDisc.p, tDisc.t, tDisc.u, [], tDisc.d, tDisc.db)
      socket.emit('unit', tDisc);
      splash.vis()
    } else {
      temp.placeholder = '!!! empty unit cannot be submitted \r\n \r\n fill the area with discursive content \r\n \r\n ...or press ESCAPE to remove the input area'
    }
  }

  intro.escapeUnit = function() {
    let temp = document.getElementById('tempGeist')
    let tempButton = document.getElementById('tempGeistButton')
    let tempEscButton = document.getElementById('escapeGeistButton')
    if (temp != null) {
      temp.remove()
      tempButton.remove()
      tempEscButton.remove()
    }
  }

  intro.keyPressed = function() {
    if (intro.keyCode === 32) {
      if (document.getElementById('gp-b').classList.contains('current')) {
        if (document.getElementsByClassName('geist').length < 1) {
          let input = intro.createElement("textarea").class('geist')
          let inputButton = intro.createButton('submit').class('geistButton')
          let escButton = intro.createButton('X').class('geistButton')
          inputButton.position(intro.mouseX, intro.mouseY - 20)
          escButton.position(intro.mouseX + 380, intro.mouseY - 20)
          input.position(intro.mouseX, intro.mouseY)
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

  intro.setPositions = function() {
    document.getElementById("vertPos").innerHTML = position
  }

  intro.windowResized = function(){
    intro.resizeCanvas(p.windowWidth,p.windowHeight);
    splash.vis()
  }
}, 'intro')
