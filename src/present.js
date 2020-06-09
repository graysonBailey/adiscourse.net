import p5 from 'p5/lib/p5.min.js';
import {
  overlay
} from './index.js'
import {
  discourses,
  getBase
} from './content.js';

export class discursiveOverlay {
  constructor(p5) {
    this.p5 = p5
    this.filterKey = "don't"
  }

  giveChoices() {

    let newBut = this.p5.createButton('_new discourse space').class('spatialChoice').id('newDSpace')
    newBut.position(210,140)



      for(let each in discourses.nameSpaces){
        let text = discourses.nameSpaces[each]
         let tempBut = this.p5.createButton(text).class('spatialChoice').id(each).value(each)
         tempBut.position(210,160+(each*20))
         tempBut.mousePressed(() => {
           document.getElementById("filterKey").textContent = discourses.nameSpaces[tempBut.value()]
           while(document.getElementsByClassName("spatialChoice")[0] != null){
             document.getElementsByClassName("spatialChoice")[0].remove()
           }
           newBut.remove()
           discourses.vis();
           document.getElementById('discourseLoad').classList.add('away')
           document.getElementById('switchLoad').classList.remove('away')
           document.getElementById('rp-b').classList.remove('away')
           document.getElementById('gp-b').classList.remove('away')
           overlay.clear()

         })
      }
      newBut.mousePressed(() => {
        let newDisc = this.p5.createInput()

        newDisc.position(210,140)
        while(document.getElementsByClassName("spatialChoice")[0] != null){
          document.getElementsByClassName("spatialChoice")[0].remove()
        }
        let nDBut = this.p5.createButton('submit').class("spatialChoice")
        nDBut.position(400,140)

        nDBut.mousePressed(() => {

          let text = newDisc.value()
          let check = 0
          for(let each in discourses.nameSpaces){
            if(discourses.nameSpaces[each] == text){
              check++
            }

          }
          if(check == 0){
            document.getElementById("filterKey").textContent = text
            newDisc.remove()
            nDBut.remove()
            discourses.vis();
            document.getElementById('discourseLoad').classList.add('away')
            document.getElementById('switchLoad').classList.remove('away')
            document.getElementById('rp-b').classList.remove('away')
            document.getElementById('gp-b').classList.remove('away')
            overlay.clear()
          }else{
            this.text("already in use // provide a new input",210,125)
          }
        })


      })
  }
}
