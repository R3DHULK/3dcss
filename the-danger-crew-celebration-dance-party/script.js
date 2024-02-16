//Define frames from the spritesheet
const frames = {

  leftWalkOne: [0, 0],
  leftStand: [0, 128],
  leftWalkTwo: [0, 256],

  rightWalkOne: [256, 0],
  rightStand: [256, 128],
  rightWalkTwo: [256, 256],

  downWalkOne: [128, 0],
  downStand: [128, 128],
  downWalkTwo: [128, 256],

  upWalkOne: [384, 0],
  upStand: [384, 128],
  upWalkTwo: [384, 256] };



//Make chunks of frame sequences
const PersonFrames = {
  StandLeft: [
  frames.leftStand,
  frames.leftStand,
  frames.leftStand,
  frames.leftStand,
  frames.leftStand,
  frames.leftStand,
  frames.leftStand,
  frames.leftStand],

  StandRight: [
  frames.rightStand,
  frames.rightStand,
  frames.rightStand,
  frames.rightStand,
  frames.rightStand,
  frames.rightStand,
  frames.rightStand,
  frames.rightStand],

  StandUp: [
  frames.upStand,
  frames.upStand,
  frames.upStand,
  frames.upStand,
  frames.upStand,
  frames.upStand,
  frames.upStand,
  frames.upStand],

  StandDown: [
  frames.downStand,
  frames.downStand,
  frames.downStand,
  frames.downStand,
  frames.downStand,
  frames.downStand,
  frames.downStand,
  frames.downStand],


  WalkLeft: [
  frames.leftWalkOne,
  frames.leftStand,
  frames.leftWalkTwo,
  frames.leftStand,
  frames.leftWalkOne,
  frames.leftStand,
  frames.leftWalkTwo,
  frames.leftStand],



  WalkRight: [
  frames.rightWalkOne,
  frames.rightStand,
  frames.rightWalkTwo,
  frames.rightStand,
  frames.rightWalkOne,
  frames.rightStand,
  frames.rightWalkTwo,
  frames.rightStand],


  WalkDown: [
  frames.downWalkOne,
  frames.downStand,
  frames.downWalkTwo,
  frames.downStand,
  frames.downWalkOne,
  frames.downStand,
  frames.downWalkTwo,
  frames.downStand],


  WalkUp: [
  frames.upWalkOne,
  frames.upStand,
  frames.upWalkTwo,
  frames.upStand,
  frames.upWalkOne,
  frames.upStand,
  frames.upWalkTwo,
  frames.upStand],




  //DANCE
  DanceLeft: [
  frames.upWalkOne,
  frames.upWalkOne,
  frames.leftStand,
  frames.leftStand,
  frames.downWalkTwo,
  frames.downWalkTwo,
  frames.leftStand,
  frames.leftStand],

  DanceRight: [
  frames.upWalkOne,
  frames.upWalkOne,
  frames.rightStand,
  frames.rightStand,
  frames.downWalkTwo,
  frames.downWalkTwo,
  frames.rightStand,
  frames.rightStand],

  DanceUp: [
  frames.rightWalkOne,
  frames.downWalkOne,
  frames.leftWalkOne,
  frames.downWalkTwo,
  frames.rightWalkOne,
  frames.downWalkOne,
  frames.leftWalkOne,
  frames.downWalkTwo],

  DanceDown: [
  frames.rightWalkOne,
  frames.rightWalkOne,
  frames.downStand,
  frames.downStand,
  frames.leftWalkTwo,
  frames.leftWalkTwo,
  frames.downStand,
  frames.downStand] };



//Define the properties needed by a Person instance
const personSchema = {
  assetId: "placeholderDrew",
  x: 0,
  y: 0,
  walkingSpeed: 2,
  animationSpeed: 8,
  direction: "down",

  isMoving: false,
  isDancing: false,
  isMovingDisabled: false,


  animationFrames: PersonFrames.StandDown,
  animationFrameIndex: 0,
  movementFrameProgress: 0, //This is a frame counting value

  //WALKING
  dtAnimationFrame: 0, //This is a delta in time between frames value

  //DANCING
  dtDanceAnimationFrame: 0,

  behavior: {
    queue: [],

    repeat: false },

  behaviorStepIndex: 0,
  workingOnBehaviorStep: false,
  movingProgressX: 0, //This is a pixel value
  movingProgressY: 0, //This is a pixel value

  currentBehavior: null,
  behaviorCompleteOnTimestamp: 0 };


//Create some preset behavior arrays, because most of the people do the same routine
const staticDancerOnLeft = [
{ fn: "dance", args: { direction: "down", timeout: 5000 } },
{ fn: "stand", args: { direction: "right", timeout: 2000 } },
{ fn: "dance", args: { direction: "right", timeout: 4000 } }];

const staticDancerOnRight = [
{ fn: "dance", args: { direction: "down", timeout: 5000 } },
{ fn: "stand", args: { direction: "left", timeout: 2000 } },
{ fn: "dance", args: { direction: "left", timeout: 4000 } }];


//Specific character behaviors
const hankBehavior = [
{ fn: "dance", args: { direction: "down", timeout: 4000 } },
{ fn: "stand", args: { direction: "down", timeout: 600 } },
{ fn: "move", args: { direction: "down" } },
{ fn: "move", args: { direction: "down" } },
{ fn: "move", args: { direction: "down" } },
{ fn: "stand", args: { direction: "down", timeout: 200 } },
{ fn: "stand", args: { direction: "left", timeout: 400 } },
{ fn: "stand", args: { direction: "down", timeout: 200 } },
{ fn: "stand", args: { direction: "right", timeout: 400 } },
{ fn: "dance", args: { direction: "down", timeout: 7000 } },
{ fn: "stand", args: { direction: "up", timeout: 200 } },
{ fn: "move", args: { direction: "up" } },
{ fn: "move", args: { direction: "up" } },
{ fn: "move", args: { direction: "up" } },
{ fn: "stand", args: { direction: "up", timeout: 400 } },
{ fn: "stand", args: { direction: "left", timeout: 200 } }];

const jacobBehavior = [
{ fn: "dance", args: { direction: "down", timeout: 10000 } },
{ fn: "stand", args: { direction: "down", timeout: 200 } },
{ fn: "move", args: { direction: "down" } },
{ fn: "move", args: { direction: "down" } },
{ fn: "dance", args: { direction: "down", timeout: 2000 } },
{ fn: "stand", args: { direction: "up", timeout: 200 } },
{ fn: "move", args: { direction: "up" } },
{ fn: "move", args: { direction: "up" } },
{ fn: "stand", args: { direction: "up", timeout: 400 } },
{ fn: "stand", args: { direction: "left", timeout: 200 } }];

const zaniBehavior = [
{ fn: "dance", args: { direction: "down", timeout: 10000 } },
{ fn: "stand", args: { direction: "down", timeout: 200 } },
{ fn: "move", args: { direction: "down" } },
{ fn: "move", args: { direction: "down" } },
{ fn: "dance", args: { direction: "down", timeout: 4000 } },
{ fn: "stand", args: { direction: "up", timeout: 200 } },
{ fn: "move", args: { direction: "up" } },
{ fn: "move", args: { direction: "up" } },
{ fn: "stand", args: { direction: "up", timeout: 400 } },
{ fn: "stand", args: { direction: "left", timeout: 200 } }];



//Define the initial state of the scene
const initialState = {
  gridCellSize: 80,
  //Create our people, extending off of the personSchema
  mapPeople: {
    "p1": {
      ...personSchema,
      x: 2,
      y: 6,
      assetId: "constructionA", behavior: { queue: staticDancerOnLeft } },

    "p2": {
      ...personSchema,
      x: 2,
      y: 5,
      assetId: "drew", behavior: { queue: staticDancerOnLeft } },

    "p3": {
      ...personSchema,
      x: 3,
      y: 4,
      assetId: "leslie", behavior: { queue: staticDancerOnLeft } },

    "p4": {
      ...personSchema,
      x: 4,
      y: 3,
      assetId: "jacob", behavior: { queue: jacobBehavior } },


    "p5": {
      ...personSchema,
      x: 5,
      y: 2,
      assetId: "male-hank", behavior: { queue: hankBehavior } },



    "p6": {
      ...personSchema,
      x: 6,
      y: 3,
      assetId: "female-hank", behavior: { queue: zaniBehavior } },

    "p7": {
      ...personSchema,
      x: 7,
      y: 4,
      assetId: "mark", behavior: { queue: staticDancerOnRight } },

    "p8": {
      ...personSchema,
      x: 8,
      y: 5,
      assetId: "danny", behavior: { queue: staticDancerOnRight } },

    "p9": {
      ...personSchema,
      x: 8,
      y: 6,
      assetId: "jessie", behavior: { queue: staticDancerOnRight } },


    "suit": {
      ...personSchema,
      x: 1,
      y: 3,
      assetId: "suit",
      direction: "right" },

    "berg": {
      ...personSchema,
      x: 2,
      y: 3,
      assetId: "berg",
      direction: "left" } } };




//Simple mechanism for knowing when our canvas assets are loaded
var AssetManager = {
  AssetsRepo: {},
  assetCount: 0,
  loadedCount: 0,
  loadAssets(urls = [], callback = function () {}) {

    this.assetCount = this.assetCount + urls.length;

    //Escape hatch for loading 0 assets
    if (urls.length === 0) {
      callback();
      return;
    }

    urls.forEach(assetModel => {

      this.AssetsRepo[assetModel.id] = new Image();
      this.AssetsRepo[assetModel.id].src = assetModel.src;


      this.AssetsRepo[assetModel.id].onload = () => {
        this.loadedCount = this.loadedCount + 1;
        if (this.loadedCount === this.assetCount) {//Should never go over
          callback();
        }
      };
    });
  } };




//Draw the scene using whatever the state is right now!
function draw(canvas, ctx, state) {
  canvas.width = canvas.width; //reset

  //For each person in state, run him/her through a specific function for drawing a Person.
  for (var personId in state.mapPeople) {
    const personModel = state.mapPeople[personId];
    drawPerson(ctx, personModel, state.gridCellSize);
  }
}

//Draw one character
function drawPerson(ctx, personModel, gridSize) {

  let personX = personModel.x * gridSize + personModel.movingProgressX;
  let personY = personModel.y * gridSize + personModel.movingProgressY;

  //Draw shadow below character
  ctx.drawImage(AssetManager.AssetsRepo["shadow"], personX, personY - gridSize / 2, gridSize, gridSize);


  //Pull the [x, y] array from whichever frame is currently active. This "active frame index" is changed in the state step fn
  const animationFrame = personModel.animationFrames[personModel.animationFrameIndex];

  ctx.drawImage(AssetManager.AssetsRepo[personModel.assetId],
  animationFrame[0], animationFrame[1], //top left corner of which point the spritesheet (relative to size of the asset)
  128, 128, //width/height of the crop (relative to the size of the asset)

  //Where do we put her/him
  personX, personY - gridSize / 2,
  gridSize, gridSize //width/height of the spreadsheet
  );

}

//State Changes!

//Get the next frame of state
function getNextStateStep(state = {}, dt, now) {

  let updatedPeople = {};
  for (var personId in state.mapPeople) {
    const personModel = state.mapPeople[personId];

    const updatedPerson = getPerson(personModel, state, dt, now);
    updatedPeople[personId] = {
      ...updatedPerson };

  }

  //Return a new state with updated people
  return {
    ...state,
    mapPeople: updatedPeople };

}

//Look at my properties and figure out what I should be doing on the NEXT frame
function getPerson(currentPersonModel, state, dt, now) {

  let personModel = { ...currentPersonModel };
  const CELL_SIZE = state.gridCellSize;

  /* What is my behavior? */
  if (!personModel.currentBehavior) {

    let behavior = null; //Start with a blank behavior

    /* What is my routine behavior? */
    //If not, no behavior will be set, and the NPC should just wait.
    personModel.isWorkingOnBehaviorStep = false;

    if (personModel.behavior.queue.length) {
      //Reset behavior step to 0 if the incrementer went past our last option.
      if (!personModel.behavior.queue[personModel.behaviorStepIndex]) {
        personModel.behaviorStepIndex = 0;
      }
      //Use behaviorStepIndex to get the current behavior we should be doing.
      behavior = personModel.behavior.queue[personModel.behaviorStepIndex];
      personModel.isWorkingOnBehaviorStep = true; //Mark this is as a behavior step so we can up our queue on completion.
    }



    /* I have decided on a behavior. Set it as my currentBehavior object */
    if (behavior) {
      personModel.currentBehavior = behavior;

      //My new behavior is MOVING
      if (behavior.fn === "move") {
        const direction = behavior.args.direction; //Make sure you reserve in the updated direction
        personModel.direction = direction;
        personModel.isMoving = true;
        personModel.isDancing = false;
      }

      //My new behavior is STANDING
      if (behavior.fn === "stand") {
        //Change directions:
        personModel.direction = behavior.args.direction;
        personModel.isMoving = false;
        personModel.isDancing = false;
        personModel.behaviorCompleteOnTimestamp = now + (behavior.args.timeout || 0);
      }

      //My new behavior is DANCING
      if (behavior.fn === "dance") {
        //Change directions:
        personModel.direction = behavior.args.direction;
        personModel.isMoving = false;
        personModel.isDancing = true;
        personModel.behaviorCompleteOnTimestamp = now + (behavior.args.timeout || 0);
      }

    }
  }


  /* What do I look like? */
  /* Update me to look like the right thing for the behavior */
  if (personModel.isMoving) {
    if (personModel.direction === "left") {personModel.animationFrames = PersonFrames.WalkLeft;}
    if (personModel.direction === "right") {personModel.animationFrames = PersonFrames.WalkRight;}
    if (personModel.direction === "up") {personModel.animationFrames = PersonFrames.WalkUp;}
    if (personModel.direction === "down") {personModel.animationFrames = PersonFrames.WalkDown;}
  }
  if (personModel.isDancing) {
    if (personModel.direction === "left") {personModel.animationFrames = PersonFrames.DanceLeft;}
    if (personModel.direction === "right") {personModel.animationFrames = PersonFrames.DanceRight;}
    if (personModel.direction === "up") {personModel.animationFrames = PersonFrames.DanceUp;}
    if (personModel.direction === "down") {personModel.animationFrames = PersonFrames.DanceDown;}
  }
  if (!personModel.isMoving && !personModel.isDancing) {
    if (personModel.direction === "left") {personModel.animationFrames = PersonFrames.StandLeft;}
    if (personModel.direction === "right") {personModel.animationFrames = PersonFrames.StandRight;}
    if (personModel.direction === "up") {personModel.animationFrames = PersonFrames.StandUp;}
    if (personModel.direction === "down") {personModel.animationFrames = PersonFrames.StandDown;}
  }


  //MOVING------------------------------------------
  const MOVEMENT_FRAMES = 70; //TWEAK THE PACE OF ALL MOVEMENT WITH THIS VALUE. Higher frame count = takes longer for character to get through a whole cell.
  const MOVEMENT_PER_FRAME = CELL_SIZE / MOVEMENT_FRAMES * personModel.walkingSpeed;
  if (personModel.isMoving) {
    //Incr moving progress if we are moving
    personModel.movementFrameProgress += 1;
    if (personModel.direction === "left") {personModel.movingProgressX -= MOVEMENT_PER_FRAME;}
    if (personModel.direction === "right") {personModel.movingProgressX += MOVEMENT_PER_FRAME;}
    if (personModel.direction === "up") {personModel.movingProgressY -= MOVEMENT_PER_FRAME;}
    if (personModel.direction === "down") {personModel.movingProgressY += MOVEMENT_PER_FRAME;}
  }



  /* Fires while personModel has a currentBehavior object */
  /* Am I WORKING on an existing behavior? */
  if (personModel.currentBehavior) {

    let isBehaviorComplete = false; //Assume "No, I'm not done"

    /* Done with "move" (Have I reached a new cell?) */
    if (personModel.isMoving) {
      //This is the "done callback frame", so to speak
      if (personModel.movingProgressX >= CELL_SIZE || personModel.movingProgressX <= -CELL_SIZE ||
      personModel.movingProgressY >= CELL_SIZE || personModel.movingProgressY <= -CELL_SIZE) {

        personModel.movementFrameProgress = 0; //No more nudging

        const updatedCoords = getUpdatedCoords(personModel.x, personModel.y, personModel.direction);
        personModel.x = updatedCoords.x;
        personModel.y = updatedCoords.y;

        personModel.movingProgressX = 0;
        personModel.movingProgressY = 0;
        personModel.workingOnBehaviorStep = false;
        personModel.isMoving = false;

        isBehaviorComplete = true;
      }
    }
    /* Done with "stand" (Is my timeout ready?)*/
    if (personModel.currentBehavior.fn === "stand" || personModel.currentBehavior.fn === "dance") {
      if (now > personModel.behaviorCompleteOnTimestamp) {
        //console.log('done stand or dance');
        isBehaviorComplete = true;

        //If we were dancing, we're no longer dancing
        if (personModel.currentBehavior.fn === "dance") {
          personModel.isDancing = false;
        }
      }
    }


    if (isBehaviorComplete) {
      personModel.currentBehavior = null;

      if (personModel.isWorkingOnBehaviorStep) {
        //Behavior step completed!
        personModel.isWorkingOnBehaviorStep = false;
        personModel.behaviorStepIndex += 1;
      }
    }
    /* ----------------------------------------- */
  }


  /* Which animation Frame am I on? ------------- */
  personModel.dtAnimationFrame += dt; //Add dt to my animation frame count
  personModel.dtDanceAnimationFrame += dt; //Add dt to my animation frame count


  //Maybe change sprite index based on dtAnimationFrame
  //WALKING
  if (personModel.dtAnimationFrame >= 0.12 && !personModel.isDancing) {
    //Get the next index for the frame [x,y] that should show up. Either the next one, or back to the first
    personModel.animationFrameIndex = personModel.animationFrameIndex < personModel.animationFrames.length - 1 ?
    personModel.animationFrameIndex + 1 : 0;
    personModel.dtAnimationFrame = 0;
  }

  //Dancing
  const isAlmostDoneDancing = now > personModel.behaviorCompleteOnTimestamp - 100; //small buffer to not allow rapid change from dance
  if (personModel.dtDanceAnimationFrame >= 0.12 && personModel.isDancing && !isAlmostDoneDancing) {
    personModel.animationFrameIndex = personModel.animationFrameIndex < personModel.animationFrames.length - 1 ?
    personModel.animationFrameIndex + 1 : 0;
    personModel.dtDanceAnimationFrame = 0;
  }
  /* -------------------------------------------- */


  /* Finally, return our model! */
  return personModel;
}

//Helper for figuring out my next x/y pair according to direction
function getUpdatedCoords(oldX = 0, oldY = 0, direction = "left") {
  let newX = oldX;
  let newY = oldY;

  if (direction === "left") {newX -= 1;}
  if (direction === "right") {newX += 1;}
  if (direction === "up") {newY -= 1;}
  if (direction === "down") {newY += 1;}

  return {
    x: newX,
    y: newY };

}

// Putting it all together!
// Set up the loop
function initGameLoop() {
  //Set up canvas
  var canvas = document.getElementById("main-canvas");
  var ctx = canvas.getContext("2d");


  //Do this step of the loop in every function
  function gameLoopStep(lastTime, state) {

    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    //Draw the state
    draw(canvas, ctx, state);

    //Do the process
    const nextState = getNextStateStep(state, dt, now);

    //Repeat the game loop
    lastTime = now;

    requestAnimationFrame(() => {
      gameLoopStep(lastTime, nextState);
    });
  }

  //Kick off the game loop:
  gameLoopStep(Date.now(), initialState);
}

//Load the assets, then kick init the scene!
AssetManager.loadAssets([

//people
{ id: "male-hank", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/hank-spritesheet-512.svg?v=11" },
{ id: "jacob", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jacob-spritesheet-512.svg?v=4" },
{ id: "female-hank", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/zani-spritesheet-512.svg?v=48" },
{ id: "jessie", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie-spritesheet-512.svg?v=66" },
{ id: "leslie", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/leslie-spritesheet-512.svg" },
{ id: "danny", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/danny-spritesheet-512.svg?v=2" },
{ id: "drew", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-spritesheet-test-512.svg?v=10" },
{ id: "constructionA", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/construction-worker-spritesheet-512.svg" },
{ id: "mark", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/mark-spritesheet-512.svg?v=5" },

{ id: "suit", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/suit-spritesheet-512.svg" },
{ id: "berg", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/berg-spritesheet-512.svg?v=2" },

//things
{ id: "shadow", src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/canvas-char-shadow.svg" }],
() => {
  console.log('loaded!');
  initGameLoop();
});


//Optional sound!
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function () {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
    request.response,
    function (buffer) {
      if (!buffer) {
        alert('error decoding file data: ' + url);
        return;
      }
      loader.bufferList[index] = buffer;
      if (++loader.loadCount == loader.urlList.length)
      loader.onload(loader.bufferList);
    },
    function (error) {
      console.error('decodeAudioData error', error);
    });

  };

  request.onerror = function () {
    alert('BufferLoader: XHR error');
  };

  request.send();
};

BufferLoader.prototype.load = function () {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
};

var context;
var bufferLoader;
var bufferList;
var song;
var songLoaded = false;

function initAudio() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
  context,
  [
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/party.mp3'],

  finishedLoading);


  bufferLoader.load();
}

function finishedLoading(data) {
  songLoaded = true;
  bufferList = data;
}

function startSong() {
  if (songLoaded) {
    var source = context.createBufferSource();
    source.buffer = bufferList[0];
    source.loop = true;
    source.loopEnd = 24;

    source.connect(context.destination);
    song = source;

    song.start();
  }
}

function stopSong() {
  if (songLoaded) {
    song.stop();
  }
}

initAudio();
//Bind click for music button
const button = document.getElementById("js-music-button");
button.addEventListener("click", function () {
  //Flip the class on or off
  button.classList.toggle("off");

  //If we now are "on", play some jams
  if (!button.classList.contains("off")) {
    startSong();
    button.innerHTML = "Music: On :)";
  } else {
    stopSong();
    button.innerHTML = "Press for Music!";
  }
});

function stopMusic() {
  stopSong();
}