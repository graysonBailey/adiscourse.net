import {
  discourses,
  overlay
} from './index.js'
import switchModeInstructions from './modeSwitch.js'

export class discursiveOverlay {
  constructor(p5) {
    this.p5 = p5
    this.filterKey = "don't"
  }

  giveChoices() {
    switchModeInstructions(-1)

    while (document.getElementsByClassName("spatialChoice")[0] != null) {
      document.getElementsByClassName("spatialChoice")[0].remove()
    }

    while (document.getElementsByClassName("nameInput")[0] != null) {
      document.getElementsByClassName("nameInput")[0].remove()
    }

    let newBut = this.p5.createButton('+ new discourse space').class('spatialChoice').id('newDSpace')
    let subBut = this.p5.createButton('submit selected').class('spatialChoice').id('subBoxes')
    let verBut = this.p5.createButton('0-[entire]-vollstaendig').class('spatialChoice').id('verButton')
    newBut.position(210, 180)
    subBut.position(80, 252)
    verBut.position(210, 200)

    let par = document.createElement("div")
    document.body.appendChild(par)
    par.classList.add('checkParent')

    for (let each = 1; each < discourses.nameSpaces.length; each++) {
      let text = discourses.nameSpaces[each]

      let tempCheck = this.p5.createCheckbox(each + "-" + text, false).class('spatialChoice').id(discourses.nameSpaces[each]).value(discourses.nameSpaces[each])
      tempCheck.parent(par)
      tempCheck.addClass('checks')
      tempCheck.changed(() => {
        if (tempCheck.checked()) {
          tempCheck.addClass('checked')
        } else {
          tempCheck.removeClass('checked')
        }
      })
    }

    verBut.mousePressed(() => {
      while (document.getElementsByClassName("spatialChoice")[0] != null) {
        document.getElementsByClassName("spatialChoice")[0].remove()
      }
      document.getElementById("filterKey").textContent = "[entire]-vollstaendig"
      discourses.vis()
      document.getElementById('discourseLoad').classList.add('away')
      document.getElementById('switchLoad').classList.remove('away')
      document.getElementById('printData').classList.remove('away')
      document.getElementById('rp-b').classList.remove('away')
      document.getElementById('gp-b').classList.remove('away')
      overlay.clear()
      switchModeInstructions(0)
    })

    subBut.mousePressed(() => {

      let sets = []

      while (document.getElementsByClassName("checks")[0] != null) {
        if (document.getElementsByClassName("checks")[0].classList.contains("checked")) {
          console.log("checked")
          let simpStr = String(document.getElementsByClassName("checks")[0].id)
          sets.push(simpStr)
        }
        document.getElementsByClassName("checks")[0].remove()
      }

      if (sets.length > 0) {

        document.getElementById("filterKey").textContent = sets.join('|')
        newBut.remove()
        subBut.remove()
        verBut.remove()
        discourses.vis()
        document.getElementById('discourseLoad').classList.add('away')
        document.getElementById('switchLoad').classList.remove('away')
        document.getElementById('rp-b').classList.remove('away')
        document.getElementById('gp-b').classList.remove('away')
        document.getElementById('printData').classList.toggle('away')
        overlay.clear()
        switchModeInstructions(0)
      } else {
        alert("you must select one or more discourse sets to open - Otherwise, create a new discourse set or open the entire database ([entire]-vollstaendig)")

        for (let each = 1; each < discourses.nameSpaces.length; each++) {
          let text = discourses.nameSpaces[each]
          let tempCheck = this.p5.createCheckbox(each + "-" + text, false).class('spatialChoice').id(discourses.nameSpaces[each]).value(discourses.nameSpaces[each])
          tempCheck.addClass('checks')
          tempCheck.position(200, 230 + (each * 22))
          tempCheck.changed(() => {
            if (tempCheck.checked()) {
              tempCheck.addClass('checked')
            } else {
              tempCheck.removeClass('checked')
            }
          })
        }
      }
    })

    newBut.mousePressed(() => {
      let newDisc = this.p5.createInput()
      newDisc.position(210, 140)
      newDisc.class('nameInput')
      while (document.getElementsByClassName("spatialChoice")[0] != null) {
        document.getElementsByClassName("spatialChoice")[0].remove()
      }
      let nDBut = this.p5.createButton('submit').class("spatialChoice")
      nDBut.position(400, 140)
      nDBut.mousePressed(() => {
        let text = newDisc.value()
        let check = 0
        for (let each in discourses.nameSpaces) {
          if (discourses.nameSpaces[each] == text) {
            check++
          }
        }
        if (check == 0) {
          let fixText = text.charAt(0).toLowerCase() + text.slice(1);
          fixText = fixText.replace(/ /g,"")
          fixText = fixText.replace(/\//g,'-')
          document.getElementById("filterKey").textContent = fixText
          newDisc.remove()
          nDBut.remove()
          discourses.vis();
          document.getElementById('discourseLoad').classList.add('away')
          document.getElementById('switchLoad').classList.remove('away')
          document.getElementById('rp-b').classList.remove('away')
          document.getElementById('gp-b').classList.remove('away')
          document.getElementById('printData').classList.toggle('away')


          overlay.clear()
          switchModeInstructions(-2)
        } else {
          this.text("already in use // provide a new input", 210, 125)
        }
      })
    })
  }
}
