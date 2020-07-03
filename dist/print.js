let elements = []
let topMargin = 60
let leftMargin = 30
let inbetweenMargin = 800

async function getBase(url) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    for(let each in body){
      elements.push(body[each])
      console.log(elements.length)
    }
  } catch (error) {
    console.log(error)
    console.log("failure at database retrieval - client")
  }
}




async function alrighty() {

  try{

    let urlString = window.location.href
    let parts = urlString.split('/')
    let sets = parts[parts.length-1].split('&')

    for(let each in sets){
     getBase('/sets/'+sets[each])
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
    console.log("overlay canvas set up")
    // socket.on('mouseRep', p.newDrawing)
    // socket.on('unit', p.logUnit)
    //p.background(255,0,0)

    for(let i = 0; i < cnv.height; i +=25){
      p.stroke(0)
      p.noFill()
      p.ellipse(100,i,20,20)

    }




    setTimeout(() =>{
      let maxHeight = 0;
      let lowMark = elements[0].p.y;
      let leftMark = elements[0].p.x;
      console.log(leftMark)

      for(let each in elements){
        if(elements[each].p.y < lowMark){
          lowMark = elements[each].p.y
        }
        if(elements[each].p.x < leftMark){
          leftMark = elements[each].p.x
        }
      }
      console.log(leftMark)

      let xDist = leftMargin - leftMark
      let yDist = topMargin - lowMark

      for(let each in elements){
        elements[each].p.y += yDist;
        elements[each].p.x += xDist;
      }
      console.log(elements[0].p.x)

      for(let i = 0; i < elements.length; i++){
        if(elements[i].p.y > maxHeight){
          maxHeight = elements[i].p.y
        }
        // NEEDS TO BE IMPLEMENTED ONCE THE ELEMENTS ARE SORTED BY Y VALUE, WHICH SHOULD EVENTUALLY HAPPEN AT THE BEGINNING
        // if(i>0 && elements[i].p.y-elements[i-1].p.y > inbetweenMargin){
        //   let betweenDiff = elements[i].p.y-elements[i-1].p.y-800
        //   for(let j = i; j < element.length; j++){
        //     elements[j].p.y -= betweenDiff
        //   }
        // }
      }
      maxHeight+=400;
      p.resizeCanvas(p.windowWidth-100, maxHeight)





      p.stroke(255,0,0)
      p.line(elements[2].p.x,elements[2].p.y,elements[1].p.x,elements[1].p.y)
      p.line(elements[4].p.x,elements[4].p.y,elements[0].p.x,elements[0].p.y)

      for(let each in elements){

        let tempDoc = p.createElement('textarea').class('discourseElement')
        tempDoc.id = elements[each].u

        tempDoc.position(elements[each].p.x,elements[each].p.y);
        tempDoc.value(elements[each].c)
        // tempDoc.style('height', 5 +"px")
        // tempDoc.style('height',tempDoc.scroll+ "px")
      }
      console.log("what....")

      // for(let each in elements){
      //   if(elements[each].p.y > maxHeight){
      //     maxHeight = elements[each].p.y
      //   }
      // }
      //
      // maxHeight+=400;
      //
      // p.resizeCanvas(p.windowWidth-100, maxHeight)
      console.log("resized")

      console.log(elements)

    },300)
    // p.intSetStart();
  }




}, 'print')





console.log(elements)
