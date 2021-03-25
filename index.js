/*seq will store the answer pattern*/
var seq = [1];
var level = 1;
var roundCount = 0;
var btn = ["r","b","g","y"];
var roundClear = false;
var index = 0;

$(document).ready(()=>{
  $(document).on("keydown", startGame);
  $("h1").on("change", startRound);
});



function startGame(event){
if($("#msg").text() === "Press a key to Start."){
  level = 1;
  roundCount = 1;
  $("#countMsg").toggleClass("hidden");
  startRound();
}
}

function startRound(){
  //seq.length = 0; //clear old seq
  index = 0;

  $("button").off("mousedown", checkSeq);
  if(roundCount > 5){
    roundCount = 1;
    level++;
  }

  $("#msg").text("Level " + level + ": Round " + roundCount);
  $("#countMsg").text(level + " colour sequence.");

  generateSequence();

setTimeout(function () {$("button").on("mousedown", checkSeq);}, 1000 * (level - 0.5) );

}

function generateSequence(){

  var count = 0; //each delayed function call has to sequentially blink a button
  //generate sequence
  for(var i = 0; i < level; i++)
  setTimeout(function () { //delay each iteration by 1 s
    seq[count] = btn[Math.floor(Math.random() * 4)];
    $("#" + seq[count] + "-btn").animate({opacity: 0.0});
    $("#" + seq[count++] + "-btn").animate({opacity: 1});
  }, 1000 * i);
}

function checkSeq(){
  if(roundCount === 0 || index === level)
  return;

  if(!isRightBtn(this)){
    $("body").css("background-color", "#F06830");
  endGame();
}else {

  playAudio(this);
}

  if(roundClear){
    roundCount++;
    roundClear = false;
    setTimeout(function () {
      $("h1").trigger("change");
    }, 500);
  }
}


function isRightBtn(triggerBtn){

  if(seq[index++] + "-btn" === triggerBtn.id){
    if(seq.length === index)
    roundClear = true;
    return true;
  }else {
    return false;
  }
}

function endGame(){
  seq.splice(0);
  roundCount = 0;
  index = 0;
  level = 0;
  var obj = {id: "wrong"}
  playAudio(obj);

setTimeout(function () {
  $("#countMsg").toggleClass("hidden");
    if(confirm("Game Over! Do you want to Restart?")){
      pressStartMsg();
      startGame();
    }else {
      pressStartMsg();
    }
$("body").css("background-color", "black");
  }, 80);


}

function pressStartMsg(){
  $("#msg").text("Press a key to Start.");
}

function playAudio(obj){

   var aud = new Audio("./sounds/" + obj.id.split("-")[0] + ".mp3");
   aud.play();
}
