"use strict";
var diceButton;
var bankarea;
var bankAmount;

function dice_initialize(container) {
    //$t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = window.innerWidth - 1 + 'px';
    canvas.style.height = window.innerHeight - 1 + 'px';
    

    $t.dice.use_true_random = false;
    



//set width of dice area here
    var box = new $t.dice.dice_box(canvas, { w: 300, h: 700});
    box.animate_selector = false;
    $t.bind(window, 'resize', function() {
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        box.reinit(canvas, { w: 300, h: 700 });
    });

    function before_roll(vectors, notation, callback) {
       // info_div.style.display = 'none';
        //selector_div.style.display = 'none';
        // do here rpc call or whatever to get your own result of throw.
        // then callback with array of your result, example:
         //callback([4, 5, 6]); // for testing only.
             
            // bankAmount = getBA();
            // console.log("Wala wala "+ bankAmount);
             allWagers = parent.getWagers();
             console.log("AW before roll" + allWagers.length);
        diceButton = document.getElementById("throw");
        diceButton.style.visibility="hidden";
        bankarea = parent.document.getElementById("playersbank");
                bankarea.style.visibility="hidden";
            var  bankLabel = bankarea.getElementsByTagName("label")[0];
            var bankImg = bankarea.getElementsByTagName("img")[0];
            ////var bankLabel = bankarea.getElementById("bankroll");
            bankLabel.style.visibility = "hidden";
             bankImg.style.visibility = "hidden";

         var clatter = new Audio("media/diceroll2.wav");
        clatter.play();
        callback(getDValues());
        
        
    }

    function notation_getter() {
        return $t.dice.parse_notation("3d6");
    }

    function after_roll(notation, result) {
        var res = result.join(' ');
        if (notation.constant) res += ' +' + notation.constant;
        if (result.length > 1) res += ' = ' + 
                (result.reduce(function(s, a) { return s + a; }) + notation.constant);
        
       // showPostRoll();
     //  setBA(bankAmount);
     var winlose = displayResults();
     console.log(winlose);
     if(winlose===true){
                 var ching = new Audio("media/kaching.wav");
                 ching.play();
     }
       resetTable();
  //      if (displayResults() === true){
            
//        console.log("complete");}
         // reloadIframe();}
         //var m = $t.dices.
      //  var d = $t.dice.
       
       // info_div.style.display = 'inline-block';
    }

function showPostRoll(){
    //var repLastBet = parent.document.getElementById("repeatLast");
   // repLastBet.style.visibility = "visible";
    
  
    
    //dice_initialize(document.body);
}

function showPreRoll()
{
    var diceButton = document.getElementById("throw");
}
    //box.bind_mouse(container, notation_getter, before_roll, after_roll);
    box.bind_throw($t.id('throw'), notation_getter, before_roll, after_roll);

    $t.bind(container, ['mouseup'], function(ev) {
        ev.stopPropagation();
        //if (selector_div.style.display == 'none') {
          //  if (!box.rolling) show_selector();
            //box.rolling = false;
          //  return;
        //}
      // var name = box.search_get_by_mouse(ev);
     //   console.log(name);
  
       // if (name !== undefined) {
            var notation = $t.dice.parse_notation("3d6");
            notation.set.push(name);
           // set.value = $t.dice.stringify_notation(notation);
           // on_set_change();
        //}
    });


/*
    var params = $t.get_url_params();
    if (params.notation) {
        set.value = params.notation;
    }
    //calls the throw the dice
   // Set the roll dice to this
    if (params.roll) {
        $t.raise_event($t.id('throw'), 'mouseup');
    }
    else {
        show_selector();
    }*/
}
