import p5 from 'p5/lib/p5.min.js';
import {
  discourses,
  overlay
} from './index.js'

export class searchOverlay {
  constructor(p5) {
    this.p5 = p5
  }

  searchUnits() {

    let searchInput = this.p5.createInput();
    let searchBut = this.p5.createButton('submit').class('geistButton')
    searchInput.position(100,overlay.height/2-20)
    searchBut.position(280,overlay.height/2-15)

    let searchDiv = this.p5.createDiv().id('searchDiv').class('seachingArea')
    searchDiv.parent("body")




  }
}
