var cols, rows;
var w = 5;
var cells = [];
var currentCell;
var route = [];
var updated = [];
var counted;

function setup() {
    createCanvas(innerWidth-20,innerHeight-20);
    init();
}

function init() {
    cells = [];
    route = [];
    updated = [];
    cols = floor(width/w);
    rows = floor(height/w);
    counted = 0;

    for (r = 0; r < rows; r++) {
        for (c = 0; c < cols; c++) {
            var cell = new Cell(r,c);
            cells.push(cell);
            //updated.push(cell.index);
        }
    }
    counted++;
    currentCell = random(cells);
    currentCell.visited = true;
    currentCell.current = true;
    route.push(currentCell);
    background(255);
}

function draw() { //loop
    updated.push(currentCell.index);
    var unvisited = GetUnvisitedNeighbours(currentCell);
    var next = random(unvisited);
    currentCell.current = false;
    if (next) {
        counted++;
        updated.push(next.index);
        RemoveWallBetween(next, currentCell);
        currentCell = next;
        currentCell.visited = true;
        route.push(currentCell);
    } else {
        currentCell = route.pop();
        updated.push(currentCell.index);
    }
    currentCell.current = true;

    for(i = 0; i < updated.length; i++) {
        cells[updated[i]].show();
    }
    if (counted == cells.length) {
        init();
    }
    updated = [];
}

function Cell(r,c) {
    this.r = r;
    this.c = c;
    this.leftWall = true;
    this.topWall = true;
    this.visited = false;
    this.current = false;
    this.index = this.r*cols + this.c

    this.show = function() {
        var x = this.c*w;
        var y = this.r*w;
        if (this.visited) {
            noStroke();
            fill(20,20,200,255);
            if (this.current)
                fill(255,255,0,255);
            rect(x,y,w,w);
        }
        stroke(255); //255
        if (this.topWall)
            line(x,y,x+w,y);
        if (this.leftWall)
            line(x,y,x,y+w);
    }

    this.status = function() {
        console.log("this.r : " + this.r);
        console.log("this.c : " + this.c);
        console.log("this.leftWall : " + this.leftWall);
        console.log("this.topWall : " + this.topWall);
        console.log("this.visited : " + this.visited);
        console.log("this.current : " + this.current);
        console.log("this.index : " + this.index);
    }
}

function GetUnvisitedNeighbours(cell) {
    var unvisitedCells = [];
    var r = cell.r;
    var c = cell.c;
    var index = r*cols + c;

    //above
    if (r != 0 && !cells[index-cols].visited)
        unvisitedCells.push(cells[index-cols]);
    //left
    if (c != 0 && !cells[index-1].visited)
        unvisitedCells.push(cells[index-1]);
    //below
    if (r != rows-1 && !cells[index+cols].visited)
        unvisitedCells.push(cells[index+cols]);
    //right
    if (c != cols-1 && !cells[index+1].visited)
        unvisitedCells.push(cells[index+1]);

    return unvisitedCells;
}

function RemoveWallBetween(a,b) {
    if (a.r < b.r) {
        cells[b.index].topWall = false;
    }
    if (a.r > b.r) {
        cells[a.index].topWall = false;
    }
    if (a.c < b.c) {
        cells[b.index].leftWall = false;
    }
    if (a.c > b.c) {
        cells[a.index].leftWall = false;
    }
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
