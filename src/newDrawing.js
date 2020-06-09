




export default newDrawing = function(data, tex) {
  baseSketch.noStroke();
  baseSketch.fill(255, 0, 100);
  baseSketch.fill(230, 47, 240);
  baseSketch.text(data.talk, data.x, data.y);
}
