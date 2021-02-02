//Function for landscape by 
// Daniel Shiffman
// http://codingtra.in
// Edited by SacrificeProductions

// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let c1, c2, c3;
let b1, b2, b3;
let l1, l2;

let cols, rows;
let scl = 40;
let w = 1400;
let h = 1000;

let flying = 0;

let terrain = [];



function setup() {
   createCanvas(400, 400, WEBGL);
   
   
   c1 = color(252, 38, 192);
   c2 = color(245, 129, 150);
   c3 = color(244, 250, 10);
   
   b1 = color(0, 20, 88);
   b2 = color(183, 118, 198);
   b3 = color(255, 44, 160);

   
   l1 = color(0, 220, 220);
   l2 = color(29,0,41);
   
   cols = w / scl;
   rows = h / scl;

   for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
   
}


function draw() {
  flying -= 0.05;
  var yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  
 
  setGradient(-width*0.5, height * -0.5 , width, height * 0.5, b1, b2, b3, Y_AXIS);
  setGradient(-width*0.5,0, width, height*0.8, b3, b3, b1,Y_AXIS);
  

  
  push();
  translate(0,0,1);
  rotateZ(-HALF_PI);
  setCircle(0, 0, width * 0.6, c1, c2, c3);
  pop();
  
 
  
  
  push();
  translate(0, height * 0.15);
  rotateX(PI / 2);
  noFill();
  stroke(l1);
  translate(-w / 2, 0);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    
    for (let x = 0; x < cols; x++) {
      fill(l2);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  pop();
  
  save("20210202.png");
  noLoop();
  
  
}

function setGradient(x, y, w, h, c1, c2, c3, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, (y + h) - ((h/2)), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (y + h) - ((h/2)) ,  y + h , 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(x, i, x + w, i);
      
      if ( i <= (y + h) - ((h/2))){
        stroke(c);
        line(x, i, x + w, i);
      }else{
        stroke(p);
        line(x, i, x + w, i);
      }
      
      
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x,(x + w) - (w/2), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (x + w) - (w/2), x + w, 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(i, y, i, y + h);
      if ( i <= (x + w) - (w/2)){
        stroke(c);
        line(i, y, i, y + h);
      }else{
        stroke(p);
        line(i, y, i, y + h);
      }
      
    }
  }
}
function setCircle(x, y, d, c1, c2, c3) {
 let c = 100;
 //circle(x,y,d);
 
 
 for (let i=0; i<c; i++) {
   let col = lerpColor(c1, c2, (i/c)*2 );
   let col02 = lerpColor(c2, c3, ((i - (c/2))/(c/2)));
   let a = lerp(PI, 0, i/c);
   
   if ( i <= c/2){
      fill(col);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }else{
      fill(col02);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }   

 }
}
