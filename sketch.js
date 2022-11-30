
let video;
let detector;
let detections = [];

//sounds
let song_book;
let song_bottle;
let song_bowl;
let song_phone;
let song_cup;
let song_person;
let song_spoon;
let song_toothbrush;

//states
let gameState;

let play_book = false;
let play_bottle = false;
let play_bowl = false;
let play_phone = false;
let play_cup = false;
let play_person = false;
let play_spoon = false;
let play_toothbrush = false;

function preload() {
  detector = ml5.objectDetector('cocossd');

  song_book = loadSound("sounds/book.mp3");
  song_bottle = loadSound("sounds/bottle.mp3");
  song_bowl = loadSound("sounds/bowl.mp3");
  song_phone = loadSound("sounds/cell_phone.mp3");
  song_cup = loadSound("sounds/cup.mp3");
  song_person = loadSound("sounds/person.mp3");
  song_spoon = loadSound("sounds/spoon.mp3");
  song_toothbrush = loadSound("sounds/toothbrush.mp3");
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotDetections);

  gameState = "start";
}

function mousePressed(){
  if (gameState == "start"){
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

    gameState = "play";
  }

  if (gameState == "play"){
    if (play_person == true){
      song_person.setVolume(1);
    }
  }
}

function draw() {
  background(0);
  if (gameState == "start"){
    fill(255);
    textSize(24);
    text("press to start", 500, 500);
  }

  if (gameState == "play"){
    for (let i = 0; i < detections.length; i++) {
      let object = detections[i];
      
      console.log(object.label)


      
      if (object.label == "person"){
        fill(255);
        rect(object.x, object.y, object.width, object.height);

        if((mouseX>object.x)&&(mouseX<object.width)&&(mouseY>object.y)&&(mouseY<object.width)){
          play_person = true;
        }
      }

    }
  }
}



