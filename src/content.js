import p5 from 'p5/lib/p5.min.js';
import {
  socket
} from './index.js'
import {
  content
} from './threeCanvases.js'
import {
  position
} from './index.js'


export class discourseUnit {
  constructor(p5, c, p, t, u, r, d, db) {
    this.p5 = p5
    this.c = c
    this.p = p
    this.rp = p
    this.t = this.checkType()
    this.u = u
    this.bound = this.constructBound()
    this.wid = 410
    this.centroid = this.p5.createVector(this.p.x + (this.wid / 2), this.p.y + (this.bound.z / 2))
    this.ref = ""
    this.body = this.splitBody()
    this.new = true
    this.isHighlighted = false
    this.relatesTo = r
    this.d = d
    this.db = db
  }

  checkType() {
    if (this.c.charAt(0) == 'r' && this.c.charAt(1) == '/') {
      return 1
    } else if (this.c.charAt(0) == 'q' && this.c.charAt(1) == '/') {
      return 0
    } else if(this.c.charAt(0) == 'c' && this.c.charAt(1) == '/'){
      return 2
    } else {
      return -1
    }
  }

  splitBody() {
    let parts = this.c.split("^^")
    if (parts[1] != null) {
      this.ref = parts[1]
    }
    return parts[0]
  }

  buildLines() {
    let rem = 0;
    let lrem = 0;
    let seg = []
    let breaks = (this.c.match(/\n/g) || []).length;
    for (let i = 0; i < this.c.length; i++) {
      let cha = this.c.charAt(i);
      let ttemp = this.c.substring(lrem, i)
      if (cha == ' ') {
        rem = i
      }
      if (ttemp.length * 4 > 350) {
        seg.push(this.c.substring(lrem, rem))
        lrem = rem
      }
    }
    return seg.length + 2 + breaks
  }

  constructBound() {
    let lines = this.buildLines()
    let tbound = this.p5.createVector(this.p.x - 5, this.p.y - 5, (lines * 19) + 10)
    return tbound
  }

  display() {
    let color
    let bcolor = this.p5.color(0)
    let d = 0;

    if (this.t == 0) {
      d = 2
    } else if (this.t == 1) {
      d = 3
    } else if (this.t ==2){
      d = 5;
    }
    if (this.t < 0) {
      d = -1
    }
    if (this.new == true) {
      d = 1
    }
    if (this.isHighlighted == true) {
      d = 4
    }

    switch (d) {
      case 1:
        color = this.p5.color('#FFCC00')
        bcolor = this.p5.color(0)
        this.new = false;
        break;
      case 2:
        color = this.p5.color(255)
        bcolor = this.p5.color(0)
        break;
      case 3:
        color = this.p5.color(0)
        bcolor = this.p5.color('#FF0033')
        break
      case 4:
        color = this.p5.color(0)
        bcolor = this.p5.color('#FFCC00')
        break
      case 5:
        color = this.p5.color(0)
        bcolor = this.p5.color('#33FFCC')
        break
      case -1:
        color = this.p5.color(0)
        bcolor = this.p5.color(255)
        break
      default:
        color = this.p5.color(120, 120, 120)
        bcolor = this.p5.color(0)
    }

    this.displayBound(color, bcolor, 2)
    this.p5.fill(color)
    this.p5.noStroke()
    this.p5.textSize(16)
    this.p5.text(this.body, this.p.x, this.p.y + position, this.wid - 5, this.bound.z)
    this.p5.textSize(14)
    this.p5.fill(255)
    this.p5.text(this.ref, this.p.x, this.p.y + position + this.bound.z, this.wid, 300)
    this.p5.textSize(14)
    this.p5.text(this.d, this.p.x - 5, this.p.y - 8 + position)
    this.p5.text(this.db, this.p.x + 395 - this.p5.textWidth(this.db), this.p.y - 8 + position)
    //  this.p5.text("relations : "+ this.relatesTo, this.p.x + 200 - this.p5.textWidth(this.db), this.p.y - 8 + position)
  }

  displayBound(color, bcolor, size) {
    this.p5.stroke(color)
    this.p5.fill(bcolor)
    this.p5.strokeWeight(size)
    this.p5.rect(this.bound.x, this.bound.y + position, this.wid, this.bound.z)
  }

  concernedHighlight() {
    if (this.isHighlighted == false) {
      this.isHighlighted = true
      this.display()
    } else {
      this.isHighlighted = false
      this.display()
    }

  }

  screenDirection() {
    if (this.p.y + position > -30 && this.p.y + position < this.p5.height) {
      return 0
    } else if (this.p.y + position < -30) {
      return 1
    } else {
      return -1
    }



  }

  isInsideSet() {
    let insideSet
    let fKey = String(document.getElementById("filterKey").textContent).split('|')

    if (this.db.some(r => fKey.includes(r)) || fKey == "[complete]-verbunden") {
      insideSet = true
    } else {
      insideSet = false
    }
    return this.screenDirection() == 0 && insideSet
  }

  isOfConcern() {
    let concern = this.p5.mouseX > this.bound.x && this.p5.mouseY > this.bound.y + position && this.p5.mouseX < this.bound.x + this.wid && this.p5.mouseY < this.bound.y + position + this.bound.z
    if (!concern) {
      this.isHighlighted = false
    }
    return this.p5.mouseX > this.bound.x && this.p5.mouseY > this.bound.y + position && this.p5.mouseX < this.bound.x + this.wid && this.p5.mouseY < this.bound.y + position + this.bound.z && this.isInsideSet() && this.screenDirection() == 0
  }
}

export class discourseSet {
  constructor(p5) {
    this.p5 = p5
    this.set = []
    this.pendingRelation = []
    this.nameSpaces = ["[complete]-verbunden"]
  }

  addUnit(c, p, t, u, r, d, db) {
    this.set.push(new discourseUnit(this.p5, c, p, t, u, r, d, db))
    this.checkNameSpaces(db)
  }

  resetPositions() {
    for (let i = 0; i < this.set.length; i++) {
      this.set[i].p.x = this.set[i].rp.x
      this.set[i].p.y = this.set[i].rp.y
      this.set[i].bound.x = this.set[i].constructBound()
      this.set[i].centroid = this.set[i].p5.createVector(this.set[i].bound.x + (this.set[i].wid / 2), this.set[i].bound.y + (this.set[i].bound.z / 2))
    }
  }

  checkNameSpaces(db) {

   for(let each in db){
      if(!this.nameSpaces.includes(db[each])){
        this.nameSpaces.push(db[each])
      }
   }
   this.nameSpaces.sort()
  }

  groupRelations() {
    let theRelated = this.set.filter(item => item.relatesTo.length)
    for (let each in theRelated) {
      let ties = theRelated[each].relatesTo
      let connections = this.set.filter(item => {
        return ties.includes(item.u)
      })
      for (let those in connections) {

        let fKey = String(document.getElementById("filterKey").textContent).split('|')


        if ((connections[those].db.some(r => fKey.includes(r))&&theRelated[each].db.some(r => fKey.includes(r))) || fKey == "[complete]-verbunden") {
          this.p5.noFill()
          this.p5.stroke('#ffA908')
          if (document.getElementById('rp-b').classList.contains('current')) {
            this.p5.strokeWeight(3)
          } else {
            this.p5.strokeWeight(.8)
          }
          this.p5.line(theRelated[each].p.x + 200, theRelated[each].centroid.y + position, connections[those].p.x + 200, connections[those].centroid.y + position)
        }
      }
    }
  }

  checkOverlap() {
    // let up = 0
    // let down = 0
    let insiders = this.set.filter(item => {
      // if(item.screenDirection()>0){
      //   up++
      // } else if(item.screenDirection()<0){
      //   down++
      // }
      return item.isInsideSet()
    })

    // if(up > 0){
    //   this.p5.stroke(255);
    //   this.p5.strokeWeight(2);
    //   this.p5.line(this.p5.width-20,40,this.p5.width-20,80)
    //   this.p5.line(this.p5.width-20,40,this.p5.width-15,50)
    // }
    // if(down >0){
    //
    // }
    for (let i = 0; i < insiders.length; i++) {

      let distVec
      let minDist = Math.sqrt(Math.pow(insiders[i].wid, 2) + Math.pow(insiders[i].bound.z, 2))

      if (insiders[i].p.x < 200) {
        insiders[i].p.x += 20
        insiders[i].bound = insiders[i].constructBound()
        insiders[i].centroid = insiders[i].p5.createVector(insiders[i].bound.x + (insiders[i].wid / 2), insiders[i].bound.y + (insiders[i].bound.z / 2))
      } else if (insiders[i].p.x > content.windowWidth - 600) {
        insiders[i].p.x -= 20
        insiders[i].bound = insiders[i].constructBound()
        insiders[i].centroid = insiders[i].p5.createVector(insiders[i].bound.x + (insiders[i].wid / 2), insiders[i].bound.y + (insiders[i].bound.z / 2))
      }



      for (let j = 0; j < insiders.length; j++) {
        if (i != j) {
          let distSimp = insiders[i].centroid.dist(insiders[j].centroid)

          if (Math.abs(insiders[i].p.x - insiders[j].p.x) < insiders[i].wid + 20 && Math.abs(insiders[i].p.y - insiders[j].p.y) < insiders[i].bound.z + 16) {

            let distDiff = minDist - distSimp

            distVec = this.p5.createVector(insiders[i].p.x - insiders[j].p.x, insiders[i].p.y - insiders[j].p.y)

            if(insiders[i].relatesTo.length > 0){
              let bleh = this.set.filter(item =>  insiders[i].relatesTo.includes(item.u) && item.isInsideSet())
              for(let beep in bleh){

                let blehDist = this.p5.dist(insiders[i].p.x,bleh[beep].p.x,insiders[i].p.y,bleh[beep].p.y)
                if(blehDist > minDist){

                distVec.add(this.p5.createVector(insiders[i].p.x-bleh[beep].p.x,insiders[i].p.y-bleh[beep].p.y))
              }
              }
            }

            distVec.normalize()
            distVec.x = distVec.x * -1
            distVec.y = distVec.y * -1
            distVec.mult(distDiff)

            this.p5.stroke(255, 0, 0)
            //this.p5.line(insiders[i].centroid.x, insiders[i].centroid.y+position, insiders[j].centroid.x, insiders[j].centroid.y+position)


            if (insiders[j].p.x < 200) {
              distVec.x = 10
              distVec.y = distVec.y * 2
            } else if (insiders[j].p.x > content.windoWidth - 600) {
              distVec.x = -10
              distVec.y = distVec.y * 2
            }

            insiders[j].p.x += distVec.x
            insiders[j].p.y += distVec.y
            insiders[j].bound = insiders[j].constructBound()
            insiders[j].centroid = insiders[j].p5.createVector(insiders[j].bound.x + (insiders[j].wid / 2), insiders[j].bound.y + (insiders[j].bound.z / 2))
          }
        }
      }
    }

    return insiders
  }

  vis() {
    this.p5.clear();
    let insiders = this.checkOverlap()
    this.groupRelations()
    for (let each in insiders) {
      insiders[each].display()
    }
  }

  unhighlight(){
    let theConcerned = this.set.filter(item => item.isOfConcern())
    for (let each in theConcerned) {
      theConcerned[each].isHighlighted = false
    }
    this.vis()

  }

  concern() {
    let theConcerned = this.set.filter(item => item.isOfConcern())
    for (let each in theConcerned) {

      if (!this.pendingRelation.length) {
        theConcerned[each].concernedHighlight()
        this.pendingRelation.push(theConcerned[each])
      } else {
        if ((this.pendingRelation[0].u != theConcerned[each].u) && (!this.pendingRelation[0].relatesTo.includes(theConcerned[each].u) && !theConcerned[each].relatesTo.includes(this.pendingRelation[0].u))) {
          theConcerned[each].concernedHighlight();
          theConcerned[each].isHighlighted = false
          let data = {
            u: this.pendingRelation[0].u,
            r: theConcerned[each].u
          }
          if (document.getElementById('filterKey').textContent !== "**") {
            socket.emit('relation', data);
          }

          setTimeout(() => {
            this.pendingRelation[0].relatesTo.push(theConcerned[each].u)
            this.pendingRelation = []
            this.vis()
          }, 20)


        } else if (this.pendingRelation[0].u == theConcerned[each].u) {
          this.pendingRelation = []
          this.vis()
        } else {
          alert("There is already a relation between these two elements - (1) you can click on another element to create a different relation, (2) you can click on the original element to void the operation")
        }
      }
    }
  }
}
