/*
sNOw_PAPER
by Louisa Izydorczak
17 December 2019
This code allows you to create virtual paper snowflakes
by cutting triangles into a small square, then opening
up the paper to reveal your masterpiece.
*/

var currentVertex = 0;


function setup() {
	/*
	Draw a white square on a black background and instructions
	in the top left corner.
	*/
	createCanvas(1000, 500);
	background(0, 0, 0); //black
	textSize(20);
	fill(255, 255, 255); //white
	text("click x3 to cut a triangle", 10, 30);
	text("press enter to unfold", 10, 60);
	text("try cutting in unfolded mode", 10, 90);
	noStroke();
	rect(width/2, height/2-200, 200, 200); //folded square
	fill(0, 0, 0);

	// Create an array of Vertices.
	theVertices = new Array(300);
}


function draw() {
	/*
	If the user has not pressed enter, go through the list of vertices they've
	clicked in threes and draw triangles on the white folded square. If they have
	pressed enter, draw a larger, unfolded white square and then draw every
	triangle 4 times, one in each quarter, reflected along the x and/or y axis.
	*/
	if (keyCode != ENTER){
      for (var i = 0; i < currentVertex-(currentVertex%3); i = i+3) {
        triangle(theVertices[i].x, theVertices[i].y, theVertices[i+1].x,
								theVertices[i+1].y, theVertices[i+2].x, theVertices[i+2].y);
      }
    }
    else {
      //unfold
      fill(255, 255, 255);
      rect(width/2-200, height/2-200, 400, 400);
      fill(0, 0, 0);

      for (var j = 0; j < currentVertex-(currentVertex%3); j = j+3) {
        triangle(theVertices[j].x, theVertices[j].y, theVertices[j+1].x,
								theVertices[j+1].y, theVertices[j+2].x, theVertices[j+2].y);
        triangle(1000-(theVertices[j].x), theVertices[j].y,
								1000-(theVertices[j+1].x), theVertices[j+1].y,
								1000-theVertices[j+2].x, theVertices[j+2].y);
        triangle(1000-(theVertices[j].x), 500-theVertices[j].y,
								1000-(theVertices[j+1].x), 500-theVertices[j+1].y,
								1000-theVertices[j+2].x, 500-theVertices[j+2].y);
        triangle(theVertices[j].x, 500-theVertices[j].y, theVertices[j+1].x,
					 			500-theVertices[j+1].y, theVertices[j+2].x,
								500-theVertices[j+2].y);
      }
    }
}


function mouseClicked(){
	/*
	If the user clicks, add the point they clicked on to the vertices list and
	increment currentVertex.
	*/
	theVertices[currentVertex] = new Vertex(mouseX, mouseY);
	currentVertex++;
}

class Vertex{
	/*
	Class of vertices. Each vertex has an x and y coordinate.
	*/
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
