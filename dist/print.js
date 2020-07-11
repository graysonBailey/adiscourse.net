let elements = []
let elementHeights = []
let topMargin = 300
let leftMargin = 30
let inbetweenYMargin = 50
let inbetweenXMargin = 50
let pageWidth = 1180
let pageHeight = 1682.35

async function getBase(url) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    for (let each in body) {
      elements.push(body[each])
      console.log(elements)
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

    curs = p.loadImage("swift.png")
  }


  p.setup = function() {
    cnv = p.createCanvas(p.windowWidth, p.windowHeight)

    setTimeout(() => {

      elements.sort((a, b) => a.p.y - b.p.y)

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
        tempDoc.attribute ('contenteditable', true)
        let quickHeight = tempDoc.size().height

        let tempCite = p.createSpan(spl[1]).class('discourseCitation')
        tempCite.id = "cite" + elements[i].u
        tempCite.position(elements[i].p.x,elements[i].p.y+quickHeight)
        quickHeight+=tempCite.size().height

        elementHeights.push(quickHeight)

        let first = spl[0].charAt(0)+spl[0].charAt(1)
        if(first == 'r/'){
          tempDoc.addClass('response')
        }else if(first == 'q/'){
          tempDoc.addClass('quote')
        }else if(first == 'c/'){
          tempDoc.addClass('comp')
        }
        let ran = Math.random()*25

        if (elements[i].p.x > pageWidth - 550) {
          let xPageDiff = elements[i].p.x - (pageWidth - 550-ran)
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
        tempCite.position(elements[i].p.x+5,elements[i].p.y+tempDoc.size().height+5)

        let tempQualities = p.createSpan("element: " + elements[i].u + "<br>" ).class('discourseCitation')
        tempQualities.id = "qual" + elements[i].u
        tempQualities.position(elements[i].p.x+410,elements[i].p.y)
        quickHeight+=tempCite.size().height

        p.stroke(0, 255, 255)

        if (elements[i].p.y > maxHeight) {
          maxHeight = elements[i].p.y
        }
      }
      maxHeight += 400;
      p.resizeCanvas(p.windowWidth - 100, maxHeight)

      p.stroke(180)
      for (let i = 400; i < cnv.height; i += 20) {
        p.line(0,i,pageWidth,i+80)
      }

      p.stroke(255, 0,180)
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

      for(let i =0; i < cnv.height; i+=40){
        p.stroke(0)
        p.line(1220,i,1220,i+20)
      }
    }, 300)
  }
}, 'print')

window.onload = function() {

  let urlString = window.location.href
  let parts = urlString.split('/')
  let sets = parts[parts.length - 1].split('$-$')

  document.getElementById('XarSets').textContent= sets.join(' , ')
  document.getElementById('time').textContent= Date.now()
}
