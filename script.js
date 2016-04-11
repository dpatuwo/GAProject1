$(document).ready(function(){
  console.log('Script loaded!')

  var kills = 0;

  var fail = 0

  var appear = 0//new Audio('')

  //var shoot = new Audio('shoot.wav') //put sound here

  //var hit = new Audio('hit.wav')

  var loseSound = new Audio('lose.mp3') //put sound here

  $('#bg').click(function() {
    if(fail !== 1){
      //if (shoot) shoot.pause();
      var shoot = new Audio('shoot.wav');
      shoot.play();
      setTimeout(function(){
          $('.overlay').css('visibility', 'visible');
        }, 1);
      setTimeout(function(){
          $('.overlay').css('visibility', 'hidden');
        }, 50);
    }
  })

  $('.shoot').click(function(){
    if(fail !== 1){

      var loc = $(this).attr('id');
      console.log('You shot at: '+loc);
      if ($(this).css('backgroundColor')=="rgb(0, 128, 0)"){
        var loc = $(this).attr('id');
        var hit = new Audio('hit.wav')
        hit.play();
        ++kills;
        $("#footer").text("Kills: " + kills);
        $(this).css("backgroundColor", "red");
        console.log("Enemy found and shot!");
        setTimeout(function(){
          $('#'+loc).css('backgroundColor','white');
        }, 750);
      }
      else{
        console.log('No one shot!');
      }
    }
  })

  function pickRandTarget(){
    var t = Math.floor(Math.random() * 5);
    var arr = [tl, tr, bl, door, br];
    var chosen = arr[t];

    if(($(chosen).css("backgroundColor") === "rgb(0, 128, 0)")/* || ($(chosen).css("backgroundColor") !== "rgb(255, 0, 0)") */){
      pickRandTarget();
    }
    else if(($(chosen).css("backgroundColor") === "rgb(255, 0, 0)")){
      pickRandTarget();
    }
    else{
      $(chosen).css("backgroundColor", "green");
      enemy(chosen);
    }
  }

function time() {
  return Math.random() * 1500 + 500;
}

function enemy(div){
  var wait = (Math.random() * 1000 + 500);
  setTimeout(function(){
    console.log('Enemy is preparing to shoot from ' + $(div).attr('id') + '!')
  },1)

  setTimeout(function(){
    if($(div).css("backgroundColor") === "rgb(0, 128, 0)"){
      fail = 1;
      console.log('Enemy at ' + $(div).attr('id') + ' has shot!')
      $(div).css("backgroundColor", 'brown')
    }
  }, 2000 /*wait*/)
}

//Dunno if useful or not
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

  var play = window.setInterval(function(){
    if(fail === 1){
      $('#popup').css('visibility', 'visible');
      loseSound.play();
      clearInterval(play);
    }
    else{
      pickRandTarget();
    }
  }, /*time()*/(Math.random() * 1500 + 500))

  if ( window.addEventListener ) {
  var state = 0, konami = [38,38,40,40,37,39,37,39,66,65];
  window.addEventListener("keydown", function(e) {
    if ( e.keyCode == konami[state] ) state++;
    else state = 0;
    if ( state == 10 ){
      //you can write your own code here
      clearInterval(play);
      popup("https://youtu.be/dQw4w9WgXcQ");
    }
    }, true);

  function popup(url) {
  newwindow=window.open(url,'name','height=720,width=1280');
  if (window.focus) {newwindow.focus()}
  return false;
}

}

})
