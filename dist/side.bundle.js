!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=67)}({10:function(e,n,t){"use strict";e.exports=function(e,n){return n||(n={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},11:function(e,n,t){"use strict";t.r(n),n.default=t.p+"f7f26928c6b1edc770c616475459ecc8.otf"},12:function(e,n,t){"use strict";t.r(n),n.default=t.p+"6ae1f379bef576068eb292be30fdb167.otf"},67:function(e,n,t){"use strict";t.r(n);t(68);let r,o,i,l=[],a=[];async function c(e){try{const n=await fetch(e),t=await n.json();for(let e in t)l.push(t[e])}catch(e){console.log(e),console.log("failure at database retrieval - client")}}!async function(){try{let e=window.location.href.split("/"),n=e[e.length-1].split("$-$");if("[entire]-vollstaendig"==n[0])console.log("its the complete one"),c("/aTE/all");else for(let e in n)c("/sets/"+n[e])}catch(e){console.log(e)}}();const s=new p5(e=>{let n;e.preload=function(){},e.setup=function(){n=e.createCanvas(e.displayWidth,e.windowHeight),setTimeout(()=>{l.sort((e,n)=>e.p.y-n.p.y),r=_.cloneDeep(l);let t=0,o=l[0].p.y,c=l[0].p.x;for(let e in l)l[e].p.y<o&&(o=l[e].p.y),l[e].p.x<c&&(c=l[e].p.x);let s=30-c,d=300-o;for(let e in l)l[e].p.y+=d,l[e].p.x+=s;for(let n=0;n<l.length;n++){let r=l[n].c.split("^^"),o=e.createSpan(r[0]).class("discourseElement");o.id=l[n].u,o.position(l[n].p.x,l[n].p.y),o.attribute("contenteditable",!0);let c=o.size().height,s=e.createSpan(r[1]).class("discourseCitation");s.id="cite"+l[n].u,s.position(l[n].p.x,l[n].p.y+c),c+=s.size().height,a.push(c);let d=r[0].charAt(0)+r[0].charAt(1);"r/"==d?o.addClass("response"):"q/"==d?o.addClass("quote"):"c/"==d?o.addClass("comp"):o.addClass("gen");let p=25*Math.random();if(l[n].p.x>630){let e=l[n].p.x-(630-p);l[n].p.x-=e}if(n>0&&l[n].p.y-l[n-1].p.y>50){let e=l[n].p.y-(l[n-1].p.y+a[n-1])-50;for(let t=n;t<l.length;t++)l[t].p.y-=e}else if(n>0&&l[n].p.y-l[n-1].p.y<a[n-1]+50){let e=a[n-1]+50-(l[n].p.y-l[n-1].p.y);l[n].p.y+=e}if(l[n].p.y%1682.35>1682.35-c-50){let e=1732.35-l[n].p.y%1682.35;l[n].p.y+=e}o.position(l[n].p.x,l[n].p.y),s.position(l[n].p.x+5,l[n].p.y+o.size().height+5);let u=e.createSpan("element: "+l[n].u+"  : {"+l[n].d+"}").class("discourseCitation");if(u.id="qual"+l[n].u,u.position(l[n].p.x,l[n].p.y-15),c+=s.size().height,l[n].r.length>0)for(let t in i)if(!l[n].r.includes(i[t])){let t="";for(let e in l[n].r)t+=l[n].r[e]+"\r\n";if(""!=t){let r=e.createSpan("relates external: \r\n"+t).class("discourseRelations");r.id="rel"+l[n].u,r.position(l[n].p.x+410,l[n].p.y)}}e.stroke(0,255,255),l[n].p.y>t&&(t=l[n].p.y)}t+=400,t+=1682.35-t%1682.35,e.resizeCanvas(e.displayWidth-100,t),e.stroke(180);for(let t=400;t<n.height;t+=20)e.line(0,t,1180,t+80);e.stroke(255,0,180);for(let n in l)if(l[n].r.length>0){let t=l.filter(e=>l[n].r.includes(e.u));for(let r in t)e.line(l[n].p.x,l[n].p.y,t[r].p.x,t[r].p.y)}for(let t=1682.35;t<n.height;t+=1682.35)e.line(10,t,1175,t);for(let t=0;t<n.height;t+=40)e.stroke(0),e.line(1220,t,1220,t+20)},300)}},"print");window.onload=function(){let e=window.location.href.split("/");i=e[e.length-1].split("$-$"),document.getElementById("XarSets").textContent=i.join(" , "),document.getElementById("time").textContent=Date.now(),o=" adiscourse.net --- discourse State: ( set : "+i.join(" , ")+" ),( timeStamp : "+Date.now()+" )",document.getElementById("PlotterPrint").onclick=()=>{document.getElementById("JSONoutput").classList.add("away"),document.getElementById("PDFprint").classList.add("away"),document.getElementById("PlotterPrint").classList.add("away"),s.clear(),document.getElementById("print").remove(),document.getElementById("leftCascade").remove(),d()},document.getElementById("PDFprint").onclick=()=>{document.getElementById("JSONoutput").classList.add("away"),document.getElementById("PDFprint").classList.add("away"),document.getElementById("PlotterPrint").classList.add("away"),window.print()},document.getElementById("JSONoutput").onclick=()=>{let e=JSON.stringify(r),n=document.createElement("a"),t=new Blob([e],{type:"text/plain"});n.href=URL.createObjectURL(t),n.download="STATE"+Date.now()+".json",n.click(),URL.revokeObjectURL(n.href)}};const d=function(){new p5(e=>{let n,t,i=[];e.preload=function(){t=e.loadFont("1CamBam_Stick_3.ttf")},e.setup=function(){n=e.createCanvas(1123,1e4,e.SVG),e.textFont(t);let l=0,a=r[0].p.y,c=r[0].p.x;for(let e in r)r[e].p.y<a&&(a=r[e].p.y),r[e].p.x<c&&(c=r[e].p.x);let s=150-c,d=150-a;for(let e in r)r[e].p.y+=d,r[e].p.x+=s;for(let n=0;n<r.length;n++){let t=r[n].c.split("^^"),o=e.createSpan(t[0]).class("discourseElementSVG");o.id=r[n].u,o.position(r[n].p.x,r[n].p.y),o.attribute("contenteditable",!0);let a=o.size().height,c=e.createSpan(t[1]).class("discourseCitationSVG");c.id="cite"+r[n].u,c.position(r[n].p.x,r[n].p.y+a),a+=c.size().height,i.push(a);t[0].charAt(0),t[0].charAt(1);let s=25*Math.random();if(r[n].p.x>573){let e=r[n].p.x-(573-s);r[n].p.x-=e}if(n>0&&r[n].p.y-r[n-1].p.y>120){let e=r[n].p.y-(r[n-1].p.y+i[n-1])-120;for(let t=n;t<r.length;t++)r[t].p.y-=e}else if(n>0&&r[n].p.y-r[n-1].p.y<i[n-1]+120){let e=i[n-1]+120-(r[n].p.y-r[n-1].p.y);r[n].p.y+=e}if(r[n].p.y%3e4>3e4-a-50){let e=30050-r[n].p.y%3e4;r[n].p.y+=e}o.remove(),c.remove(),a+=c.size().height,e.stroke(0,255,255),r[n].p.y>l&&(l=r[n].p.y)}l+=400,e.resizeCanvas(1123,l),e.stroke(255,0,180);for(let n in r)if(r[n].r.length>0){let t=r.filter(e=>r[n].r.includes(e.u));for(let o in t)e.line(r[n].p.x,r[n].p.y,t[o].p.x,t[o].p.y)}e.textSize(11),e.stroke(0),e.strokeWeight(.5),e.noFill();for(let n=0;n<r.length;n++){let t=r[n].c.split("^^");t[0].match(/.{1,60}/g);e.stroke(0),e.text(t[0],r[n].p.x,r[n].p.y,400,800),t.length>0&&(e.stroke(30,180,255),e.text(t[1],r[n].p.x+16,r[n].p.y+i[n],400,30)),e.stroke(180,30,30),e.text("element: "+r[n].u+"  : ("+r[n].d+")",r[n].p.x+16,r[n].p.y-18)}e.textSize(20),e.stroke(0),e.text(o,50,50,800,200),e.save("aDiscourseNet"+Date.now()+".svg")},e.drawBorders=function(){}},"shoeGazer")}},68:function(e,n,t){var r=t(8),o=t(69);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},69:function(e,n,t){var r=t(9),o=t(10),i=t(12),l=t(11);n=r(!1);var a=o(i),c=o(l);n.push([e.i,"body {\r\n  padding: 0;\r\n  margin: 10;\r\n  overflow-y:scroll;\r\n  height:100%;\r\n}\r\n\r\n@font-face {\r\n  font-family: OCRA;\r\n\r\n  src: url("+a+");\r\n}\r\n\r\n@font-face{\r\n  font-family: miso;\r\n  src : url("+c+");\r\n}\r\n\r\n.discourseElement {\r\n  width: 400;\r\n  overflow: hidden;\r\n  background-color: rgba(255,255,255,.8);\r\n  color:black;\r\n  font-size: 16;\r\n  font-family: miso;\r\n}\r\n\r\n.discourseQualities {\r\n  width: 100;\r\n  overflow: hidden;\r\n  background-color: rgba(150,150,150);\r\n  color:black;\r\n  font-size: 13;\r\n  font-family: miso;\r\n}\r\n\r\n.discourseCitationSVG {\r\n  width: 400 ;\r\n  overflow: hidden;\r\n  color:black;\r\n  font-size: 16;\r\n  font-family: miso;\r\n\r\n}\r\n\r\n.discourseElementSVG {\r\n  width: 400;\r\n  overflow: hidden;\r\n  background-color: rgba(255,255,255,.8);\r\n  color:black;\r\n  font-size: 16;\r\n  font-family: miso;\r\n}\r\n\r\n.discourseCitation {\r\n  width: 400 ;\r\n  overflow: hidden;\r\n  color:black;\r\n  font-size: 13;\r\n  font-family: miso;\r\n}\r\n\r\n.discourseRelations {\r\n  width: 100 ;\r\n  overflow: hidden;\r\n  color:black;\r\n  font-size: 13;\r\n  font-family: miso;\r\n  overflow-wrap: break-word;\r\n}\r\n\r\n\r\n.letsHeadIt{\r\n  font-family: OCRA;\r\nbackground-color: rgba(45,45,45);\r\n  color:white;\r\n  font-size: 13;\r\n  letter-spacing: 8px;\r\n}\r\n\r\n.ohLookItsData{\r\n  font-family: miso;\r\n  color:black;\r\n  font-size: 16;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.gen{\r\n  padding:3;\r\n  border-style: solid;\r\n  border-color: black;\r\n  border-width: thin;\r\n}\r\n\r\n\r\n.quote {\r\n  color:blue;\r\n  border-style: solid;\r\n  border-color: blue;\r\n  border-width: thin;\r\n}\r\n\r\n.response {\r\n\r\n  background-color: rgba(255,0,51);\r\n  padding: 3;\r\n  color:white;\r\n}\r\n\r\n.comp {\r\n  background-color: #33FFCC;\r\n  color:black;\r\n  padding:3;\r\n}\r\n\r\n.printButton {\r\n  position: fixed;\r\n  color:black;\r\n  font-family: OCRA;\r\n  position: fixed;\r\n  z-index:1;\r\n  border-style: solid;\r\n  border-width: thick;\r\n  border-color:black;\r\n  outline: none;\r\n  background-color:white;\r\n  font-size: 16;\r\n  right :50;\r\n  top: 50;\r\n  z-index:2\r\n}\r\n\r\n.printButton:hover {\r\n  background-color:#33FFCC;\r\n    border-color:#FFCC00;\r\n  color:#FFCC00;\r\n}\r\n\r\n.away{\r\ndisplay: none;\r\n}\r\n\r\n.right-cascade {\r\n  user-select: none;\r\n  position: fixed;\r\n  top: 0;\r\n  height:100vh;\r\n  right: 100;\r\n  font-family: OCRA;\r\n  font-size: 8pt;\r\n  padding: 5px 5px;\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: left;\r\n  justify-content: left;\r\n  z-index:1;\r\n}\r\n\r\n.lc-load {\r\n  top: 15vh;\r\n}\r\n.lc-low {\r\n  top: 45vh;\r\n}\r\n\r\n.lc-top {\r\n  top: 35vh;\r\n}\r\n\r\n.lc-mid {\r\n  top: 40vh;\r\n}\r\n",""]),e.exports=n},8:function(e,n,t){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),l=[];function a(e){for(var n=-1,t=0;t<l.length;t++)if(l[t].identifier===e){n=t;break}return n}function c(e,n){for(var t={},r=[],o=0;o<e.length;o++){var i=e[o],c=n.base?i[0]+n.base:i[0],s=t[c]||0,d="".concat(c," ").concat(s);t[c]=s+1;var p=a(d),u={css:i[1],media:i[2],sourceMap:i[3]};-1!==p?(l[p].references++,l[p].updater(u)):l.push({identifier:d,updater:m(u,n),references:1}),r.push(d)}return r}function s(e){var n=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){n.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(n);else{var l=i(e.insert||"head");if(!l)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");l.appendChild(n)}return n}var d,p=(d=[],function(e,n){return d[e]=n,d.filter(Boolean).join("\n")});function u(e,n,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=p(n,o);else{var i=document.createTextNode(o),l=e.childNodes;l[n]&&e.removeChild(l[n]),l.length?e.insertBefore(i,l[n]):e.appendChild(i)}}function f(e,n,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var y=null,h=0;function m(e,n){var t,r,o;if(n.singleton){var i=h++;t=y||(y=s(n)),r=u.bind(null,t,i,!1),o=u.bind(null,t,i,!0)}else t=s(n),r=f.bind(null,t,n),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else o()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=o());var t=c(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<t.length;r++){var o=a(t[r]);l[o].references--}for(var i=c(e,n),s=0;s<t.length;s++){var d=a(t[s]);0===l[d].references&&(l[d].updater(),l.splice(d,1))}t=i}}}},9:function(e,n,t){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=function(e,n){var t=e[1]||"",r=e[3];if(!r)return t;if(n&&"function"==typeof btoa){var o=(l=r,a=btoa(unescape(encodeURIComponent(JSON.stringify(l)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(c," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[t].concat(i).concat([o]).join("\n")}var l,a,c;return[t].join("\n")}(n,e);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var l=this[i][0];null!=l&&(o[l]=!0)}for(var a=0;a<e.length;a++){var c=[].concat(e[a]);r&&o[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),n.push(c))}},n}}});