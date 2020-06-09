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
    this.wid = 400
    this.centroid = this.p5.createVector(this.p.x + (this.wid / 2), this.p.y + (this.bound.z / 2))
    this.ref = ""
    this.body = this.splitBody()
    this.new = true;
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
    } else {
      return -1
    }
  }

  splitBody() {
    let parts = this.c.split("//")
    if (parts[1] != null) {
      this.ref = parts[1]
    }
    return parts[0]
  }

  buildLines() {
    let rem = 0;
    let lrem = 0;
    let seg = []

    for (let i = 0; i < this.c.length; i++) {
      let cha = this.c.charAt(i);

      let ttemp = this.c.substring(lrem, i)

      if (cha == ' ') {
        rem = i
      }
      if (this.p5.textWidth(ttemp) > 350) {
        seg.push(this.c.substring(lrem, rem))
        lrem = rem
      }
    }
    return seg.length + 2
  }

  constructBound() {
    let lines = this.buildLines()
    let tbound = this.p5.createVector(this.p.x - 5, this.p.y - 5, (lines * 18) + 10)
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
    }
    if (this.new == true) {
      d = 1
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
      default:
        color = this.p5.color(120, 120, 120)
        bcolor = this.p5.color(0)
    }

    this.displayBound(color, bcolor, 2)
    this.p5.fill(color)
    this.p5.noStroke()
    this.p5.textSize(16)
    this.p5.text(this.body, this.p.x, this.p.y + position, this.wid, this.bound.z)
    this.p5.textSize(14)
    this.p5.fill(255)
    this.p5.text(this.ref, this.p.x, this.p.y + position + this.bound.z, this.wid, 300)
    this.p5.textSize(12)
    this.p5.text(this.d, this.p.x - 5, this.p.y - 8 + position)
    this.p5.text(this.db, this.p.x + 395 - this.p5.textWidth(this.db), this.p.y - 8 + position)

  }

  displayBound(color, bcolor, size) {
    this.p5.stroke(color)
    this.p5.fill(bcolor)
    this.p5.strokeWeight(size)
    this.p5.rect(this.p.x - 5, this.p.y - 5 + position, this.wid, this.bound.z)
  }

  concernedHighlight() {
    if (this.isHighlighted == false) {
      this.p5.stroke('#FFFF33')
      this.p5.strokeWeight(1)
      this.p5.noFill()
      let cHx = Array(15).fill().map(() => Math.round(Math.random() * this.wid) + this.bound.x - 50)
      let cHy = Array(15).fill().map(() => Math.round(Math.random() * this.bound.z) + this.bound.y + position - 30)
      this.p5.beginShape()
      for (let i = 0; i < cHx.length; i++) {
        this.p5.vertex(cHx[i], cHy[i])
      }
      this.p5.endShape()
    }
    this.isHighlighted = true
  }

  isInside() {
    let insideScreen = this.p.x > 0 && this.p.x < this.p5.width && this.p.y + position > -30 && this.p.y + position < this.p5.height
    let insideSet
    let fKey = String(document.getElementById("filterKey").textContent)
    if (String(this.db) == fKey || fKey == "0-verbunden") {
      insideSet = true
    } else {
      insideSet = false
    }
    return insideScreen && insideSet
  }

  isOfConcern() {
    let concern = this.p5.mouseX > this.bound.x && this.p5.mouseY > this.bound.y + position && this.p5.mouseX < this.bound.x + this.wid && this.p5.mouseY < this.bound.y + position + this.bound.z
    if (!concern) {
      this.isHighlighted = false
    }
    return this.p5.mouseX > this.bound.x && this.p5.mouseY > this.bound.y + position && this.p5.mouseX < this.bound.x + this.wid && this.p5.mouseY < this.bound.y + position + this.bound.z && this.isInside()
  }
}

export class discourseSet {
  constructor(p5) {
    this.p5 = p5
    this.set = []
    this.pendingRelation = []
    this.nameSpaces = ["0-verbunden"]
  }


  addUnit(c, p, t, u, r, d, db) {
    this.set.push(new discourseUnit(this.p5, c, p, t, u, r, d, db))
    this.checkNameSpaces(db)
    console.log(this.nameSpaces)

  }

  resetPositions(){
    for (let each in this.set) {
      this.set[each].p = this.p5.createVector(this.set[each].rp.x,this.set[each].rp.y)
      this.set[each].bound.x = this.set[each].p.x - 5
      this.set[each].bound.y = this.set[each].p.y - 5
      this.set[each].centroid = this.set[each].p5.createVector(this.set[each].p.x + (this.set[each].wid / 2), this.set[each].p.y + (this.set[each].bound.z / 2))
    }
  }

  checkNameSpaces(db) {
    let cCount = 0;
    for (let each in this.nameSpaces) {
      if (this.nameSpaces[each] == db) {
        cCount++
        break
      }
    }
    if (cCount == 0) {
      this.nameSpaces.push(db)
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

        let fKey = String(document.getElementById("filterKey").textContent)
        if ((connections[those].db == fKey && theRelated[each].db == fKey) || fKey == "0-verbunden") {

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
    let insiders = this.set.filter(item => item.isInside())
    insiders.forEach(e => {
      insiders.forEach(el => {
        let distX = e.p.x - el.p.x

        let distY = e.p.y - el.p.y


        if (Math.abs(distX) > 0 && Math.abs(distX) < 425) {
          if (Math.abs(distY) > 0 && Math.abs(distY) < e.bound.z+25) {
            if (Math.abs(distX) > Math.abs(distY) && e.p.x >400) {
              let vec = Math.sign(distX)*(100)
              e.p.x += vec
              e.bound.x += vec
              e.centroid.x += vec
            } else {
              let vec = Math.sign(distY)*(100)
              e.p.y += vec
              e.bound.y += vec
              e.centroid.y += vec
            }
          }
        }
      })
    })
    return insiders
  }

  vis() {
    //let insiders = this.set.filter(item => item.isInside())
    let insiders = this.checkOverlap()
    this.groupRelations()
    for (let each in insiders) {
      insiders[each].display()
    }

  }

  concern() {
    let theConcerned = this.set.filter(item => item.isOfConcern())
    for (let each in theConcerned) {
      theConcerned[each].concernedHighlight()
      if (!this.pendingRelation.length) {
        this.pendingRelation.push(theConcerned[each])
      } else {
        if (this.pendingRelation[0].u != theConcerned[each].u) {
          this.pendingRelation[0].relatesTo.push(theConcerned[each].u)
          let data = {
            u: this.pendingRelation[0].u,
            r: theConcerned[each].u
          }
          socket.emit('relation', data)
        }
        this.vis()
        this.pendingRelation = []
      }
    }
  }
}
