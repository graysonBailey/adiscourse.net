import './print.css'

let idList = []
let origin = []
let plotHeights = []
let topMargin = 600
let leftMargin = 30
let inbetweenYMargin = 50
let inbetweenXMargin = 50
let plotWidth = 1123
let plotHeight = 1589
let wholeString = []
let spaceTime = []
let sets

async function getBase(url) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    for (let each in body) {
      if(!idList.includes(body[each].u)){
        origin.push(body[each])
        idList.push(body[each].u)
      }
    }
  } catch (error) {
    console.log(error)
    console.log("failure at database retrieval - client")
  }
}

async function alrighty() {
  try {
    let urlString = window.location.href
    let parts = urlString.split('/')
    let sets = parts[parts.length - 1].split('$-$')
    if (sets[0] == "[entire]-vollstaendig") {
      console.log("its the complete one")
      getBase('/aTE/all')
    } else {
      for (let each in sets) {
        getBase('/sets/' + sets[each])
      }
    }
  } catch (error) {
    console.log(error)
  }
}

alrighty()


window.onload = function() {

  let urlString = window.location.href
  let parts = urlString.split('/')
  sets = parts[parts.length - 1].split('$-$')

  document.getElementById('XarSets').textContent = sets.join(' , ')
  document.getElementById('time').textContent = Date.now()

  wholeString.push("a  d  i  s  c  o  u  r  s  e  .  s  t  a  t  e  ")
  wholeString.push("{ s p a c e : ")
  wholeString.push(",t i m e :                         }")
  spaceTime.push(sets.join(' , '))
  spaceTime.push(Date.now())







  document.getElementById('PlotterPrint').onclick = () => {
    state.writeNotes()
    state.save("aDiscourseSTATE" + sets + Date.now() + ".svg")
  }

  document.getElementById('PDFprint').onclick = () => {
    document.getElementById('JSONoutput').classList.add('away')
    document.getElementById('PDFprint').classList.add('away')
    document.getElementById('PlotterPrint').classList.add('away')
    window.print()
  }

  document.getElementById('JSONoutput').onclick = () => {
    let stringData = JSON.stringify(origin)
    let a = document.createElement("a")
    let file = new Blob([stringData], {
      type: 'text/plain'
    })
    a.href = URL.createObjectURL(file)
    a.download = 'aDiscourseSTATE'+ sets + Date.now() + '.json'
    a.click();
    URL.revokeObjectURL(a.href)
  }
}



const state = new p5((p) => {


  let plotMargin = 150
  let inbetweenYMargin = 120
  let inbetweenXMargin = 50

  let cnv;
  let tFont;
  let specialFont;
  let boldFont;

  p.preload = function() {
    tFont = p.loadFont("1CamBam_Stick_3.ttf")
    specialFont = p.loadFont("f7f26928c6b1edc770c616475459ecc8.otf")
    boldFont = p.loadFont("miso-bold.otf")

  }

  p.setup = function() {
    cnv = p.createCanvas(plotWidth, 10000, p.SVG)
    p.textFont(tFont)


    setTimeout(() => {
      origin.sort((a, b) => a.p.y - b.p.y)

      let maxHeight = 0;
      let lowMark = origin[0].p.y;
      let leftMark = origin[0].p.x;
      let rightMark = origin[0].p.x;

      for (let each in origin) {
        if (origin[each].p.y < lowMark) {
          lowMark = origin[each].p.y
        }
        if (origin[each].p.x < leftMark) {
          leftMark = origin[each].p.x
        } else if (origin[each].p.x > rightMark) {
          rightMark = origin[each].p.x
        }
      }

      let yDist = topMargin - lowMark

      for (let each in origin) {
        origin[each].p.y += yDist;
      }


      for (let i = 0; i < origin.length; i++) {

        origin[i].c = origin[i].c.replace(/\n\n/g, ' ')

        let spl = origin[i].c.split('^^')

        let tempDoc = p.createSpan(spl[0]).class('discourseElementSVG')

        tempDoc.id = origin[i].u

        tempDoc.position(origin[i].p.x, origin[i].p.y)
        tempDoc.attribute('contenteditable', true)
        let quickHeight = tempDoc.size().height

        let tempCite = p.createSpan(spl[1]).class('discourseCitationSVG')
        tempCite.id = "cite" + origin[i].u
        tempCite.position(origin[i].p.x, origin[i].p.y + quickHeight)

        plotHeights.push(quickHeight)

        let first = spl[0].charAt(0) + spl[0].charAt(1)

        origin[i].p.x = p.map(origin[i].p.x, leftMark, rightMark, 50, 1123 - 450)

        if (i > 0 && origin[i].p.y - origin[i - 1].p.y > inbetweenYMargin) {
          let betweenYDiff = origin[i].p.y - (origin[i - 1].p.y + plotHeights[i - 1]) - inbetweenYMargin
          for (let j = i; j < origin.length; j++) {
            origin[j].p.y -= betweenYDiff
          }
        } else if (i > 0 && origin[i].p.y - origin[i - 1].p.y < plotHeights[i - 1] + (inbetweenYMargin)) {
          let betweenYDiff = (plotHeights[i - 1] + (inbetweenYMargin)) - (origin[i].p.y - origin[i - 1].p.y)
          origin[i].p.y += betweenYDiff
        }

        let margy = 50
        if (origin[i].p.y % plotHeight > plotHeight - quickHeight - margy) {
          let betweenYDiff = (plotHeight + margy) - (origin[i].p.y % plotHeight)
          origin[i].p.y += betweenYDiff
        } else if (origin[i].p.y % plotHeight < margy){
          let betweenYDiff = margy - (origin[i].p.y % plotHeight)
          origin[i].p.y += betweenYDiff
        }

        tempDoc.remove()
        tempCite.remove()

        quickHeight += tempCite.size().height

        p.stroke(0, 255, 255)

        if (origin[i].p.y > maxHeight) {
          maxHeight = origin[i].p.y
        }
      }

      maxHeight += 400;
      maxHeight += plotHeight - (maxHeight % plotHeight)

      p.resizeCanvas(1123, maxHeight)

      p.stroke(255,0,51)
      p.strokeWeight(1)

      p.noFill()
      for (let each in origin) {
        if (origin[each].r.length > 0) {
          let theRelated = origin.filter(elem => origin[each].r.includes(elem.u))

          for (let those in theRelated) {
            p.beginShape()
            p.vertex(origin[each].p.x - 15 - 5, origin[each].p.y + 10 + 5)
            p.vertex(origin[each].p.x - 15 + 5, origin[each].p.y + 10 + 5)
            p.vertex(origin[each].p.x - 15, origin[each].p.y + 10 - 5)
            p.vertex(theRelated[those].p.x - 15 - 5, theRelated[those].p.y + 10 + 5)
            p.vertex(theRelated[those].p.x - 15 + 5, theRelated[those].p.y + 10 + 5)
            p.vertex(theRelated[those].p.x - 15, theRelated[those].p.y + 10 - 5)
            p.endShape(p.OPEN)
          }
        }
      }

      p.textSize(14)
      p.stroke(0)
      p.strokeWeight(.4)
      p.text("s t a t e . n o t e s :",400,187)

      p.textSize(11)

      for (let i = 0; i < origin.length; i++) {
        let spl = origin[i].c.split('^^')

        let ohSets = spl[0].match(/.{1,60}/g);
        let down = 12

        p.stroke(0);
        p.strokeWeight(1)
        p.rect(origin[i].p.x - 5, origin[i].p.y - 5, 410, plotHeights[i] + 5)
        p.strokeWeight(.4)
        p.text(spl[0], origin[i].p.x, origin[i].p.y, 400, 800)

        if (spl.length > 0) {
          p.stroke(30, 180, 255)
          p.text(spl[1], origin[i].p.x, origin[i].p.y + plotHeights[i] + 5, 400, 30)
        }

        p.stroke(120)
        p.text(origin[i].u + "  : (" + origin[i].d + ")", origin[i].p.x + 16, origin[i].p.y - 18)
      }


      for (let i = 0; (i*200)+400 < cnv.height; i ++) {
        p.strokeWeight(2)
        p.line(0, (i*200)+400, 25, (i*200)+400)
        p.strokeWeight(.5)
        p.text(i,20,(i*200)+395)

      }

      p.writeThatTitle()
      let input = p.createElement("textarea").class('notes')
      input.id('notes')
      document.getElementById('loading').remove()

    }, 300)

  }

  p.writeNotes = function(){
    p.textFont(tFont)
    p.textSize(12)
    p.stroke(0)
    p.strokeWeight(.3)
    p.noFill()
    let notesText = document.getElementById('notes').value
    p.text(notesText,400,205,600,400)
    p.line(390,200,390,400)
    p.line(380,200,380,400)
    document.getElementById('notes').remove()
  }



  p.writeThatTitle = function() {
    p.textFont(specialFont)
    p.textSize(36)
    p.stroke(0);
    p.strokeWeight(.5)
    p.noFill();
    for(let lines in wholeString){
        p.text(wholeString[lines], 50, 100+(lines*40),)
    }
    p.textFont(boldFont)
    p.textSize(22)
    p.text(spaceTime[0], 180, 132)
    p.text(spaceTime[1], 160, 172)

  }


}, 'statecraft')


const back = new p5((p) => {
  let cnv

  let tFont;
  let specialFont;
  let boldFont;

  p.preload = function() {
    tFont = p.loadFont("1CamBam_Stick_3.ttf")
    specialFont = p.loadFont("f7f26928c6b1edc770c616475459ecc8.otf")
    boldFont = p.loadFont("miso-bold.otf")

  }


  p.setup = function() {
    setTimeout(() => {
      cnv = p.createCanvas(plotWidth, state.height)
      p.stroke(0)
      p.strokeWeight(.5)
      p.noFill()
      p.line(p.width, 0,p.width,p.height)
      // for (let i = plotHeight; i < cnv.height; i += plotHeight) {
      //   p.line(10, i, 1123, i)
      // }
      for (let i = 0; i < cnv.height; i += 40) {
        p.stroke(0)
        p.line(1125, i, 1125, i + 20)
      }
      p.stroke(180)
      for (let i = 400; i < cnv.height; i += 20) {
        p.strokeWeight(.1)
        p.line(0, i, plotWidth, i)
        if(i % 10 == 0){

          p.line
        }
      }
      for (let i = 0; i < origin.length; i++) {
        p.noStroke();
        p.fill(255);
        p.rect(origin[i].p.x - 5, origin[i].p.y - 5, 410, plotHeights[i] + 5)
      }
      p.writeThatTitleBack()
    }, 2000)


  }

  p.writeThatTitleBack = function() {
    p.textFont(specialFont)
    p.textSize(36)
    p.noStroke()
    p.fill('#FFCC00')
    for(let lines in wholeString){
        p.text(wholeString[lines], 52, 102+(lines*40),)
    }
    p.textFont(boldFont)
    p.textSize(22)
    p.fill(0)
    p.text(spaceTime[0], 183, 137)
    p.text(spaceTime[1], 163, 177)
  }
}, 'back')
