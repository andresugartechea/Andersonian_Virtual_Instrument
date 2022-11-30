
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

//images
let book;
let bottle;
let bowl;
let phone;
let cup;
let person;
let spoon;
let toothbrush;

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

  //images
  book = loadImage("/media/book.png");
  bottle = loadImage("/media/bottle.png");
  bowl = loadImage("/media/bowl.png");
  cup = loadImage("/media/cup.png");
  person = loadImage("/media/person.png");
  phone = loadImage("/media/phone.png");
  spoon = loadImage("/media/spoon.png");
  toothbrush = loadImage("/media/toothbrush.png");
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
    if (play_book == true){
      song_book.setVolume(1);
    }
    if (play_bottle == true){
      song_bottle.setVolume(1);
    }
    if (play_bowl == true){
      song_bowl.setVolume(1);
    }
    if (play_phone == true){
      song_phone.setVolume(1);
    }
    if (play_cup == true){
      song_cup.setVolume(1);
    }
    if (play_person == true){
      song_person.setVolume(1);
    }
    if (play_spoon == true){
      song_spoon.setVolume(1);
    }
    if (play_toothbrush == true){
      song_toothbrush.setVolume(1);
    }
  }
}

function draw() {
  background(255);
  if (gameState == "start"){
    fill(0);
    textAlign(CENTER);
    textSize(24);
    text("Wait to start...", width/2, height/2);
  }

  if (gameState == "play"){
    for (let i = 0; i < detections.length; i++) {
      let object = detections[i];

      if (object.label == "book"){
        fill(255);
        image(book, object.x, object.y);
        play_book = true;
      }

      if (object.label == "bottle"){
        fill(255);
        image(bottle, object.x, object.y);
        play_bottle = true;
      }

      if (object.label == "bowl"){
        fill(255);
        image(bowl, object.x, object.y);
        play_bowl = true;
      }

      if (object.label == "cell phone"){
        fill(255);
        image(phone, object.x, object.y);
        play_phone = true;
      }

      if (object.label == "cup"){
        fill(255);
        image(cup, object.x, object.y);
        play_cup = true;
      }

      if (object.label == "person"){
        fill(255);
        image(person, object.x, object.y);
        play_person = true;
      }

      if (object.label == "spoon"){
        fill(255);
        image(spoon, object.x, object.y);
        play_spoon = true;
      }

      if (object.label == "toothbrush"){
        fill(255);
        image(toothbrush, object.x, object.y);
        play_toothbrush = true;
      }

    }
  }
}



