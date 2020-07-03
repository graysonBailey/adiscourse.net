
async function getBase(url) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    for(let each in body){
      elements.push(body[each])
    }
  } catch (error) {
    console.log(error)
    console.log("failure at database retrieval - client")
  }
}

let elements = []




const overlay = new p5((p) => {

  let cnv;

  p.preload = function() {

    curs = p.loadImage("swift.png")
  }


  p.setup = function() {
    cnv = p.createCanvas(p.windowWidth, p.windowHeight+1000)
    console.log("overlay canvas set up")
    // socket.on('mouseRep', p.newDrawing)
    // socket.on('unit', p.logUnit)
    p.background(255,0,0)

    for(let i = 0; i < cnv.height; i +=25){
      p.stroke(0)
      p.noFill()
      p.ellipse(100,i,20,20)

    }
    // p.intSetStart();
  }




}, 'print')



 let urlString = window.location.href
 let parts = urlString.split('/')
 let sets = parts[parts.length-1].split('&')

for(let each in sets){
  getBase('/sets/'+sets[each])
}

console.log(elements)
