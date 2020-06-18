import {back} from './threeCanvases.js'
export default function switchModeInstructions(m) {
  let geistInstructions = "Geist Instructions\r\n \r\n...use SPACE to open an input element on the screen at the CURSOR position \r\n \r\n...type to provide a discursive unit of text: reference, response, composition\r\n \r\n...use ENTER to emit the input into the discourse\r\n \r\n...or use ESCAPE to remove yourself from the situation"
  let relationsInstructions = "Relations Instructions\r\n \r\n...MOUSECLICK on two discourse units to manifest a relation between them"
  let switchInstructions = "Discourse Set Instructions\r\n \r\n...CHOOSE\r\n \r\n(+) => to add a key filtered thematic set,\r\n \r\n(0) => interact with the unfiltered complete set,\r\n \r\n(1...) => open a key filtered discourse set from the list"
  let element = document.getElementById('instructions')
  switch (m) {
    case -1:
      element.textContent = switchInstructions
      break;
    case 1:
      element.textContent = geistInstructions
      break;
    case 2:
      element.textContent = relationsInstructions
      break;
    default:
      element.textContent = ""
  }
  back.refreshed(m)
}
