let img;
let pixelSize = 5;
let pixelGrid = [];
let explosionRadius = 0;
let maxExplosionRadius;

function preload() {
  img = loadImage('images/IMG_3094.JPG');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();
  imageMode(CENTER);
  img.resize(150, 150);

 
  maxExplosionRadius = dist(0, 0, img.width / 2, img.height / 2);

  
  let imgX = width / 2 - img.width / 2;
  let imgY = height / 2 - img.height / 2;

  
  let offsetX = imgX;
  let offsetY = imgY;
  //offsetX=0;
//offsetY=0;

  
  for (let x = 0; x < img.width; x++) {
    pixelGrid[x] = [];
    for (let y = 0; y < img.height; y++) {
    
      let posX = offsetX + x * pixelSize;
      let posY = offsetY + y * pixelSize;
      pixelGrid[x][y] = createVector(posX, posY);
    }
  }
}

function draw() {
  background(255);

  // Durchlaufe das Bild und zeichne die Pixel
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Holen Sie sich die Farbe jedes Pixels
      let pixelColor = img.get(x, y);

      // Holen Sie sich die aktuelle Position des Pixels
      let posX = pixelGrid[x][y].x;
      let posY = pixelGrid[x][y].y;
      
      // Setze die Farbe des Pixels
      fill(pixelColor);
      
      // Zeichne das Pixel an seiner aktuellen Position
      rect(posX, posY, pixelSize, pixelSize);
    }
  }

  // Überprüfe, ob das Bild explodieren soll
  if (explosionRadius > 0) {
    // Zentrum der Explosion
    let explosionCenterX = width / 2;
    let explosionCenterY = height / 2;

    // Durchlaufe das Bild und bewege die Pixel radial nach außen
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        // Holen Sie sich die aktuelle Position des Pixels
        let posX = pixelGrid[x][y].x;
        let posY = pixelGrid[x][y].y;

        // Berechne den Winkel zum Zentrum der Explosion
        let angle = atan2(posY - explosionCenterY, posX - explosionCenterX);

        // Berechne die neue Position des Pixels, indem der Explosionradius auf den Abstand zum Zentrum angewendet wird
        let newX = posX + cos(angle) * explosionRadius;
        let newY = posY + sin(angle) * explosionRadius;

        // Setze die Position des Pixels auf die neue Position
        pixelGrid[x][y].x = newX;
        pixelGrid[x][y].y = newY;
      }
    }

    // Erhöhe den Explosionradius, um die Animation zu erzeugen
    explosionRadius += 5;
    
    // Überprüfe, ob die Explosion abgeschlossen ist
    if (explosionRadius > maxExplosionRadius) {
      explosionRadius = 0; // Setze den Explosionradius zurück
    }
  }
}

function mouseClicked() {
  // Starte die Explosion, wenn auf den Bildschirm geklickt wird
  explosionRadius = 1;
}
