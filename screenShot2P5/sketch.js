"use strict";
/**
 * Websiten Vernichter
 * Die Extension erstellt ein Muster aus dem Screenshot einer Page
 * Das Muster baut sich von oben kontinuierlich auf
 * Dadurch wird sie schnell unlesbar und ist nur noch zu Teilen zu entziffern
 * 
 */

let head = document.getElementsByTagName('head')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = browser.runtime.getURL("canvas.css");
link.media = 'all';
head.appendChild(link);

let screenshot;

let p5canvas = false;
browser.runtime.onMessage.addListener((request) => {
    screenshot = request.data;
    
    if (p5canvas == false) {
        let myp5 = new p5(s);
    }
    
    //myp5.loadScreenshot();
   
    p5canvas = true;

});

let s = function (sketch) {
    let source;
    //source.loadPixels();
    
    let angle = 10;
    let m = 0;
    let scale = 100;
    let endHeight = 10;
    let colorIndex = 0;
    let colors = [
        [255, 0, 0],    // Red
        [0, 255, 0],    // Green
        [0, 0, 255]     // Blue
        // Add more colors here if needed
    ];

    sketch.preload = function() {
        source = sketch.loadImage(screenshot);
    }

    sketch.setup = function() {
        let c = sketch.createCanvas(window.innerWidth, window.innerHeight);
        c.position(0, 0);
        c.style('z-index', 200);
        
        sketch.pixelDensity(1);
        scale = source.width / sketch.width;
        
    }

    sketch.draw = function() {
        sketch.raster();
    }

    sketch.raster = function() {
        let tilex = 50;
        let tiley = 10;
        sketch.noStroke();
        for (let x = 0; x < sketch.width; x += tilex) {
            for (let y = endHeight - tiley; y < endHeight; y += tiley) {
                let r = colors[colorIndex][0];
                let g = colors[colorIndex][1];
                let b = colors[colorIndex][2];
                sketch.fill(r, g, b);
                let offset = sketch.random(-200, 200);
                sketch.copy(source, x * scale, y * scale, tilex * scale - 10 * scale, 20 * scale, x + 2, y + 2, tilex - 4, 900);
                sketch.copy(source, x * scale, y * scale, tilex * scale - 10 * scale, 20 * scale, x + 2 + offset, y + 2 + offset, tilex - 4, 1000);
                m += 0.5;
                colorIndex = (colorIndex + 1) % colors.length; // Move to the next color
            }
        }
        endHeight += tiley;
    }
}

// This code will run on every page the extension is enabled on
let textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (let i = 0; i < textNodes.snapshotLength; i++) {
    let node = textNodes.snapshotItem(i);
    node.nodeValue = moveText(node.nodeValue);
}

function moveText(text) {
    let x = Math.floor(Math.random() * 11) - 5;
    let y = Math.floor(Math.random() * 11) - 5;
    //return "<span style='position: relative; display: inline-block; transform: translate(" + x + "px, " + y + "px);'>" + text + "</span>";
}