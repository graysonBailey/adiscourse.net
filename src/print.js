import './print.css'

let idList = []
let origin = []
let plotHeights = []
let topMargin = 600
let leftMargin = 30
let inbetweenYMargin = 50
let inbetweenXMargin = 50
let pageWidth = 1180
let pageHeight = 1682.35
let wholeString = []
let spaceTime = []
let sets

async function getBase(url) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    for (let each in body) {
      origin.push(body[each])
      idList.push(body[each].u)
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

  //document.getElementById('XarSets').textContent = sets.join(' , ')
  //document.getElementById('time').textContent = Date.now()

  wholeString.push("a  d  i  s  c  o  u  r  s  e  .  s  t  a  t  e  :")
  wholeString.push("s p a c e : ")
  wholeString.push("t i m e : ")
  spaceTime.push(sets.join(' , '))
  spaceTime.push(Date.now())







  document.getElementById('PlotterPrint').onclick = () => {
    state.p.save("aDiscourseSTATE" + sets + Date.now() + ".svg")
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
  let plotWidth = 1123
  let plotHeight = 30000
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
    cnv = p.createCanvas(1123, 10000, p.SVG)
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
        //quickHeight += tempCite.size().height

        plotHeights.push(quickHeight)

        let first = spl[0].charAt(0) + spl[0].charAt(1)

        origin[i].p.x = p.map(origin[i].p.x, leftMark, rightMark, 50, 1123 - 450)

        // NEEDS TO BE IMPLEMENTED ONCE THE origin ARE SORTED BY Y VALUE, WHICH SHOULD EVENTUALLY HAPPEN AT THE BEGINNING
        if (i > 0 && origin[i].p.y - origin[i - 1].p.y > inbetweenYMargin) {
          let betweenYDiff = origin[i].p.y - (origin[i - 1].p.y + plotHeights[i - 1]) - inbetweenYMargin
          for (let j = i; j < origin.length; j++) {
            origin[j].p.y -= betweenYDiff
          }
        } else if (i > 0 && origin[i].p.y - origin[i - 1].p.y < plotHeights[i - 1] + (inbetweenYMargin)) {
          let betweenYDiff = (plotHeights[i - 1] + (inbetweenYMargin)) - (origin[i].p.y - origin[i - 1].p.y)
          origin[i].p.y += betweenYDiff
        }

        if (origin[i].p.y % plotHeight > plotHeight - quickHeight - 50) {
          let betweenYDiff = (plotHeight + 50) - (origin[i].p.y % plotHeight)
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

      p.resizeCanvas(1123, maxHeight)

      p.stroke(255, 0, 180)
      p.strokeWeight(.5)

      p.noFill()
      for (let each in origin) {
        if (origin[each].r.length > 0) {
          let theRelated = origin.filter(elem => origin[each].r.includes(elem.u))

          for (let those in theRelated) {



            p.beginShape()
            p.vertex(origin[each].p.x - 15 - 5, origin[each].p.y + 10 + 5)
            p.vertex(origin[each].p.x - 15 + 5, origin[each].p.y + 10 + 5)
            p.vertex(origin[each].p.x - 15, origin[each].p.y + 10 - 5)
            // p.vertex(origin[each].p.x-15,origin[each].p.y+30)
            // p.vertex(theRelated[those].p.x-15,theRelated[those].p.y+30)
            p.vertex(theRelated[those].p.x - 15 - 5, theRelated[those].p.y + 10 + 5)
            p.vertex(theRelated[those].p.x - 15 + 5, theRelated[those].p.y + 10 + 5)
            p.vertex(theRelated[those].p.x - 15, theRelated[those].p.y + 10 - 5)
            p.endShape(p.OPEN)

            //p.line(origin[each].p.x-15,origin[each].p.y+30,theRelated[those].p.x-15,theRelated[those].p.y+30)

          }
        }
      }

      p.textSize(11)
    //  p.stroke(0)
      //p.strokeWeight(.2)


      for (let i = 0; i < origin.length; i++) {
        let spl = origin[i].c.split('^^')

        let ohSets = spl[0].match(/.{1,60}/g);
        let down = 12

        p.stroke(0);
        p.strokeWeight(1)
        //p.fill(255);
        p.rect(origin[i].p.x - 5, origin[i].p.y - 5, 410, plotHeights[i] + 5)
        //p.noFill()
        p.strokeWeight(.2)
        p.text(spl[0], origin[i].p.x, origin[i].p.y, 400, 800)



        if (spl.length > 0) {
          p.stroke(30, 180, 255)
          p.text(spl[1], origin[i].p.x, origin[i].p.y + plotHeights[i] + 5, 400, 30)
        }

        p.stroke(120)
        p.text(origin[i].u + "  : (" + origin[i].d + ")", origin[i].p.x + 16, origin[i].p.y - 18)
      }

p.writeThatTitle()


    }, 300)

  }



  p.writeThatTitle = function() {
    p.textFont(specialFont)
    p.textSize(28)
    p.stroke(0);
    p.strokeWeight(1)
    p.noFill();
    for(let lines in wholeString){
        p.text(wholeString[lines], 50, 100+(lines*34),)
    }
    p.textFont(boldFont)
    p.textSize(22)
    p.strokeWeight(.5)
    p.text(spaceTime[0], 150, 126)
    p.text(spaceTime[1], 130, 160)

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
      cnv = p.createCanvas(1123, state.height)
      p.stroke(0)
      p.strokeWeight(.5)
      p.noFill()
      p.line(p.width, 0,p.width,p.height)
      for (let i = pageHeight; i < cnv.height; i += pageHeight) {
        p.line(10, i, 1123, i)
      }
      for (let i = 0; i < cnv.height; i += 40) {
        p.stroke(0)
        p.line(1125, i, 1125, i + 20)
      }
      p.stroke(180)
      for (let i = 400; i < cnv.height; i += 20) {
        p.line(0, i, pageWidth, i + 80)
      }
      for (let i = 0; i < origin.length; i++) {
        p.fill(255);
        p.rect(origin[i].p.x - 5, origin[i].p.y - 5, 410, plotHeights[i] + 5)
      }
      p.writeThatTitleBack()
    }, 2000)


  }

  p.writeThatTitleBack = function() {
    p.textFont(specialFont)
    p.textSize(28)
    p.noStroke()
    p.fill('#FFCC00')
    for(let lines in wholeString){
        p.text(wholeString[lines], 52, 102+(lines*34),)
    }
    p.textFont(boldFont)
    p.textSize(22)
    p.fill(100)
    p.text(spaceTime[0], 153, 125)
    p.text(spaceTime[1], 133, 165)
  }
}, 'back')









// const overlay = new p5((p) => {
//
//     let cnv;
//
//     p.preload = function() {
//
//     }
//
//     p.setup = function() {
//       cnv = p.createCanvas(p.displayWidth, p.windowHeight)
//
// setTimeout(() => {
//         elements.sort((a, b) => a.p.y - b.p.y)
//         origin = _.cloneDeep(elements)
//
//         let maxHeight = 0;
//         let lowMark = elements[0].p.y;
//         let leftMark = elements[0].p.x;
//         let rightMark = elements[0].p.x;
//
//         for (let each in elements) {
//           if (elements[each].p.y < lowMark) {
//             lowMark = elements[each].p.y
//           }
//           if (elements[each].p.x < leftMark) {
//             leftMark = elements[each].p.x
//           } else if ( elements[each].p.x > rightMark){
//             rightMark = elements[each].p.x
//           }
//         }
//
//         ///let xDist = leftMargin - leftMark
//         let yDist = topMargin - lowMark
//
//         for (let each in elements) {
//           elements[each].p.y += yDist;
//
//         }
//
//         for (let i = 0; i < elements.length; i++) {
//           let spl = elements[i].c.split('^^')
//           let tempDoc = p.createSpan(spl[0]).class('discourseElement')
//           tempDoc.id = elements[i].u
//           tempDoc.position(elements[i].p.x, elements[i].p.y)
//           tempDoc.attribute('contenteditable', true)
//           let quickHeight = tempDoc.size().height
//           let tempCite = p.createSpan(spl[1]).class('discourseCitation')
//           tempCite.id = "cite" + elements[i].u
//           tempCite.position(elements[i].p.x, elements[i].p.y + quickHeight)
//           quickHeight += tempCite.size().height
//           elementHeights.push(quickHeight)
//           let first = spl[0].charAt(0) + spl[0].charAt(1)
//           if (first == 'r/') {
//             tempDoc.addClass('response')
//           } else if (first == 'q/') {
//             tempDoc.addClass('quote')
//           } else if (first == 'c/') {
//             tempDoc.addClass('comp')
//           } else {
//             tempDoc.addClass('gen')
//           }
//
//           elements[i].p.x = p.map(elements[i].p.x,leftMark,rightMark,50,1123-450)
//
//           if (i > 0 && elements[i].p.y - elements[i - 1].p.y > inbetweenYMargin) {
//             let betweenYDiff = elements[i].p.y - (elements[i - 1].p.y + elementHeights[i - 1]) - inbetweenYMargin
//             for (let j = i; j < elements.length; j++) {
//               elements[j].p.y -= betweenYDiff
//             }
//           } else if (i > 0 && elements[i].p.y - elements[i - 1].p.y < elementHeights[i - 1] + 50) {
//             let betweenYDiff = (elementHeights[i - 1] + 50) - (elements[i].p.y - elements[i - 1].p.y)
//             elements[i].p.y += betweenYDiff
//           }
//
//           if (elements[i].p.y % pageHeight > pageHeight - quickHeight - 50) {
//             let betweenYDiff = (pageHeight + 50) - (elements[i].p.y % pageHeight)
//             elements[i].p.y += betweenYDiff
//           }
//
//           tempDoc.position(elements[i].p.x, elements[i].p.y)
//           tempCite.position(elements[i].p.x + 5, elements[i].p.y + tempDoc.size().height + 5)
//
//           let tempUnitName = p.createSpan("element: " + elements[i].u + "  : {" + elements[i].d + "}").class('discourseCitation')
//           tempUnitName.id = "qual" + elements[i].u
//           tempUnitName.position(elements[i].p.x, elements[i].p.y - 15)
//           quickHeight += tempCite.size().height
//
//           if (elements[i].r.length > 0) {
//             let tempString = ""
//            for( let those in elements[i].r){
//              if(idList.includes(elements[i].r[those])){
//                console.log("it's already here")
//              } else {
//                 tempString += elements[i].r[those] + "\r\n"
//               }
//             }
//             if (tempString != "") {
//              let tempRelations = p.createSpan("relates external: \r\n" + tempString).class('discourseRelations')
//              tempRelations.id = "rel" + elements[i].u
//              tempRelations.position(elements[i].p.x + 410, elements[i].p.y)
//             }
//           }
//           p.stroke(0, 255, 255)
//           if (elements[i].p.y > maxHeight) {
//             maxHeight = elements[i].p.y
//           }
//         }
//         maxHeight += 400;
//         maxHeight += pageHeight - (maxHeight % pageHeight)
//
//         p.resizeCanvas(p.displayWidth - 100, maxHeight)
//
//         p.stroke(180)
//         for (let i = 400; i < cnv.height; i += 20) {
//           p.line(0, i, pageWidth, i + 80)
//         }
//
//         p.stroke(255, 0, 180)
//         for (let each in elements) {
//           if (elements[each].r.length > 0) {
//             let theRelated = elements.filter(elem => elements[each].r.includes(elem.u))
//             for (let those in theRelated) {
//               p.line(elements[each].p.x, elements[each].p.y, theRelated[those].p.x, theRelated[those].p.y)
//             }
//           }
//         }
//
//         for (let i = pageHeight; i < cnv.height; i += pageHeight) {
//           p.line(10, i, 1123, i)
//         }
//
//         for (let i = 0; i < cnv.height; i += 40) {
//           p.stroke(0)
//           p.line(1125, i, 1125, i + 20)
//         }
//       }, 300)
//     }
//
//
//
//   }
//   ,'print')
