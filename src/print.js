import './print.css'


let elements = []
let origin
let elementHeights = []
let topMargin = 300
let leftMargin = 30
let inbetweenYMargin = 50
let inbetweenXMargin = 50
let pageWidth = 1180
let pageHeight = 1682.35
let wholeString

async function getBase(url) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    for (let each in body) {
      elements.push(body[each])
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
    for (let each in sets) {
      getBase('/sets/' + sets[each])
    }

  } catch (error) {
    console.log(error)
  }
}

alrighty()

const overlay = new p5((p) => {

  let cnv;

  p.preload = function() {


  }


  p.setup = function() {
    cnv = p.createCanvas(p.displayWidth, p.windowHeight)

    setTimeout(() => {

      elements.sort((a, b) => a.p.y - b.p.y)
      origin = _.cloneDeep(elements)

      let maxHeight = 0;
      let lowMark = elements[0].p.y;
      let leftMark = elements[0].p.x;

      for (let each in elements) {
        if (elements[each].p.y < lowMark) {
          lowMark = elements[each].p.y
        }
        if (elements[each].p.x < leftMark) {
          leftMark = elements[each].p.x
        }
      }


      let xDist = leftMargin - leftMark
      let yDist = topMargin - lowMark

      for (let each in elements) {
        elements[each].p.y += yDist;
        elements[each].p.x += xDist;
      }


      for (let i = 0; i < elements.length; i++) {

        let spl = elements[i].c.split('//')

        let tempDoc = p.createSpan(spl[0]).class('discourseElement')

        tempDoc.id = elements[i].u

        tempDoc.position(elements[i].p.x, elements[i].p.y)
        tempDoc.attribute('contenteditable', true)
        let quickHeight = tempDoc.size().height

        let tempCite = p.createSpan(spl[1]).class('discourseCitation')
        tempCite.id = "cite" + elements[i].u
        tempCite.position(elements[i].p.x, elements[i].p.y + quickHeight)
        quickHeight += tempCite.size().height

        elementHeights.push(quickHeight)

        let first = spl[0].charAt(0) + spl[0].charAt(1)
        if (first == 'r/') {
          tempDoc.addClass('response')
        } else if (first == 'q/') {
          tempDoc.addClass('quote')
        } else if (first == 'c/') {
          tempDoc.addClass('comp')
        }
        let ran = Math.random() * 25

        if (elements[i].p.x > pageWidth - 550) {
          let xPageDiff = elements[i].p.x - (pageWidth - 550 - ran)
          elements[i].p.x -= xPageDiff
        }


        // NEEDS TO BE IMPLEMENTED ONCE THE ELEMENTS ARE SORTED BY Y VALUE, WHICH SHOULD EVENTUALLY HAPPEN AT THE BEGINNING
        if (i > 0 && elements[i].p.y - elements[i - 1].p.y > inbetweenYMargin) {
          let betweenYDiff = elements[i].p.y - (elements[i - 1].p.y + elementHeights[i - 1]) - inbetweenYMargin
          for (let j = i; j < elements.length; j++) {
            elements[j].p.y -= betweenYDiff
          }
        } else if (i > 0 && elements[i].p.y - elements[i - 1].p.y < elementHeights[i - 1] + 50) {
          let betweenYDiff = (elementHeights[i - 1] + 50) - (elements[i].p.y - elements[i - 1].p.y)
          elements[i].p.y += betweenYDiff
        }

        if (elements[i].p.y % pageHeight > pageHeight - quickHeight - 50) {
          let betweenYDiff = (pageHeight + 50) - (elements[i].p.y % pageHeight)
          elements[i].p.y += betweenYDiff
        }

        tempDoc.position(elements[i].p.x, elements[i].p.y)
        tempCite.position(elements[i].p.x + 5, elements[i].p.y + tempDoc.size().height + 5)

        let tempUnitName = p.createSpan("element: " + elements[i].u + "  : {" + elements[i].d + "}").class('discourseCitation')
        tempUnitName.id = "qual" + elements[i].u
        tempUnitName.position(elements[i].p.x, elements[i].p.y - 15)
        quickHeight += tempCite.size().height

        if (elements[i].r.length > 0) {
          let tempRelations = p.createSpan("relates to: " + elements[i].r).class('discourseRelations')
          tempRelations.id = "rel" + elements[i].u
          tempRelations.position(elements[i].p.x + 410, elements[i].p.y)
        }

        p.stroke(0, 255, 255)

        if (elements[i].p.y > maxHeight) {
          maxHeight = elements[i].p.y
        }
      }
      maxHeight += 400;
      maxHeight += pageHeight-(maxHeight%pageHeight)
      console.log(maxHeight)

      p.resizeCanvas(p.displayWidth - 100, maxHeight)

      p.stroke(180)
      for (let i = 400; i < cnv.height; i += 20) {
        p.line(0, i, pageWidth, i + 80)
      }

      p.stroke(255, 0, 180)
      for (let each in elements) {
        if (elements[each].r.length > 0) {
          let theRelated = elements.filter(elem => elements[each].r.includes(elem.u))

          for (let those in theRelated) {
            p.line(elements[each].p.x, elements[each].p.y, theRelated[those].p.x, theRelated[those].p.y)

          }
        }
      }

      for (let i = pageHeight; i < cnv.height; i += pageHeight) {
        p.line(10, i, 1175, i)
      }

      for (let i = 0; i < cnv.height; i += 40) {
        p.stroke(0)
        p.line(1220, i, 1220, i + 20)
      }
    }, 300)
  }
}, 'print')

window.onload = function() {



  let urlString = window.location.href
  let parts = urlString.split('/')
  let sets = parts[parts.length - 1].split('$-$')

  document.getElementById('XarSets').textContent = sets.join(' , ')
  document.getElementById('time').textContent = Date.now()

  wholeString = " adiscourse.net => discourse State: { set : "+sets.join(' , ')+" },{ timeStamp : "+Date.now()+" }"


  document.getElementById('PlotterPrint').onclick = () => {
    document.getElementById('JSONoutput').classList.add('away')
    document.getElementById('PDFprint').classList.add('away')
    overlay.clear()
    document.getElementById('print').remove()
    overOrganize()
  }

  document.getElementById('JSONoutput').onclick = () => {
    let stringData = JSON.stringify(origin)
    let a = document.createElement("a")
    let file = new Blob([stringData], {
      type: 'text/plain'
    })
    a.href = URL.createObjectURL(file)
    a.download = 'STATE' + Date.now() + '.json'
    a.click();
    URL.revokeObjectURL(a.href)
  }



}

const overOrganize = function() {

  new p5((p) => {

      let plotHeights = []
      let plotMargin = 150
      let inbetweenYMargin = 80
      let inbetweenXMargin = 50
      let plotWidth = 1123
      let plotHeight = 30000
      let cnv;
      let tFont;



      p.preload = function() {
        tFont = p.loadFont("machtgth.ttf")
      }


      p.setup = function() {
        cnv = p.createCanvas(1123, 10000, p.SVG)
        p.textFont(tFont)



        let maxHeight = 0;
        let lowMark = origin[0].p.y;
        let leftMark = origin[0].p.x;


        for (let each in origin) {
          if (origin[each].p.y < lowMark) {
            lowMark = origin[each].p.y
          }
          if (origin[each].p.x < leftMark) {
            leftMark = origin[each].p.x
          }
        }


        let xDist = plotMargin - leftMark
        let yDist = plotMargin - lowMark

        for (let each in origin) {
          origin[each].p.y += yDist;
          origin[each].p.x += xDist;
        }


        for (let i = 0; i < origin.length; i++) {

          let spl = origin[i].c.split('//')

          let tempDoc = p.createSpan(spl[0]).class('discourseElement')

          tempDoc.id = origin[i].u

          tempDoc.position(origin[i].p.x, origin[i].p.y)
          tempDoc.attribute('contenteditable', true)
          let quickHeight = tempDoc.size().height

          let tempCite = p.createSpan(spl[1]).class('discourseCitation')
          tempCite.id = "cite" + origin[i].u
          tempCite.position(origin[i].p.x, origin[i].p.y + quickHeight)
          quickHeight += tempCite.size().height

          plotHeights.push(quickHeight)

          let first = spl[0].charAt(0) + spl[0].charAt(1)
          if (first == 'r/') {
            tempDoc.addClass('response')
          } else if (first == 'q/') {
            tempDoc.addClass('quote')
          } else if (first == 'c/') {
            tempDoc.addClass('comp')
          }
          let ran = Math.random() * 25

          if (origin[i].p.x > plotWidth - 550) {
            let xPageDiff = origin[i].p.x - (plotWidth - 550 - ran)
            origin[i].p.x -= xPageDiff
          }

          // NEEDS TO BE IMPLEMENTED ONCE THE origin ARE SORTED BY Y VALUE, WHICH SHOULD EVENTUALLY HAPPEN AT THE BEGINNING
          if (i > 0 && origin[i].p.y - origin[i - 1].p.y > inbetweenYMargin) {
            let betweenYDiff = origin[i].p.y - (origin[i - 1].p.y + plotHeights[i - 1]) - inbetweenYMargin
            for (let j = i; j < origin.length; j++) {
              origin[j].p.y -= betweenYDiff
            }
          } else if (i > 0 && origin[i].p.y - origin[i - 1].p.y < plotHeights[i - 1] + 50) {
            let betweenYDiff = (plotHeights[i - 1] + 50) - (origin[i].p.y - origin[i - 1].p.y)
            origin[i].p.y += betweenYDiff
          }

          if (origin[i].p.y % plotHeight > plotHeight - quickHeight - 50) {
            let betweenYDiff = (plotHeight + 50) - (origin[i].p.y % plotHeight)
            origin[i].p.y += betweenYDiff
          }

          tempDoc.remove()
          tempCite.remove()

          quickHeight += tempCite.size().height

          // if (origin[i].r.length > 0) {
          //   let tempRelations = p.createSpan("relates to: " + origin[i].r).class('discourseRelations')
          //   tempRelations.id = "rel" + origin[i].u
          //   tempRelations.position(origin[i].p.x + 410, origin[i].p.y)
          // }

          p.stroke(0, 255, 255)

          if (origin[i].p.y > maxHeight) {
            maxHeight = origin[i].p.y
          }




        }

        maxHeight += 400;
        console.log(maxHeight)

        p.resizeCanvas(1123, maxHeight)

        p.stroke(180)
        for (let i = 400; i < cnv.height; i += 20) {
          p.line(0, i, pageWidth, i + 80)
        }

        p.stroke(255, 0, 180)
        for (let each in origin) {
          if (origin[each].r.length > 0) {
            let theRelated = origin.filter(elem => origin[each].r.includes(elem.u))

            for (let those in theRelated) {
              p.line(origin[each].p.x, origin[each].p.y, theRelated[those].p.x, theRelated[those].p.y)
            }
          }
        }

      p.textSize(12)
      p.noFill()
      p.stroke(0)
      p.strokeWeight(.5)
      for(let i = 0; i < origin.length; i++){
        let spl = origin[i].c.split('//')

        let ohSets = spl[0].match(/.{1,60}/g);
        let down =12


        p.text(spl[0],origin[i].p.x,origin[i].p.y,400,800)


        if(spl.length>0){
            p.text(spl[1],origin[i].p.x+16,origin[i].p.y+plotHeights[i]+10)
        }
        p.text("element: " + origin[i].u + "  : {" + origin[i].d + "}",origin[i].p.x+16,origin[i].p.y-18)
      }

      p.text(wholeString,100,100,400,200)

      p.save("test.svg")
      }



    p.drawBorders = function() {


    }




  }, 'shoeGazer')

}
