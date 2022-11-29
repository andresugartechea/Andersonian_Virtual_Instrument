
let video;
let detector;
let detections = [];

let song_book;
let song_bottle;
let song_bowl;
let song_phone;
let song_cup;
let song_person;
let song_spoon;
let song_toothbrush;

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotDetections);

  song_book = loadSound("sounds/book.mp3", loaded);
  song_bottle = loadSound("sounds/bottle.mp3", loaded);
  song_bowl = loadSound("sounds/bowl.mp3", loaded);
  song_phone = loadSound("sounds/cell_phone.mp3", loaded);
  song_cup = loadSound("sounds/cup.mp3", loaded);
  song_person = loadSound("sounds/person.mp3", loaded);
  song_spoon = loadSound("sounds/spoon.mp3", loaded);
  song_toothbrush = loadSound("sounds/toothbrush.mp3", loaded);
}

function loaded(){
  song_book.loop();
  song_bottle.loop();
  song_bowl.loop();
  song_phone.loop();
  song_cup.loop();
  song_person.loop();
  song_spoon.loop();
  song_toothbrush.loop();

  song_book.setVolume(0);
  song_bottle.setVolume(0);
  song_bowl.setVolume(0);
  song_phone.setVolume(0);
  song_cup.setVolume(0);
  song_person.setVolume(0);
  song_spoon.setVolume(0);
  song_toothbrush.setVolume(0);
}

function draw() {
  //image(video, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(0);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
    
    if (object.label == "person"){
      song_person.setVolume(1);
    }
  }
}

