import { Component} from '@angular/core';
import wordsJson from 'src/assets/words.json';
import { ViewEncapsulation } from '@angular/core';
declare let $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class HomeComponent {

  selectedLanguage: String;
  languages: Array<String> = new Array();
  wordsetMarginTop: number = 0;
  public text = new Array();

  private currentWordIndex = 0;

  private wordsPerMinute;
  private rightWordsAmount = 0;
  private rightCharactersAmount = 0;
  private falseWordsAmount = 0;
  private falseCharactersAmount = 0;

  private timerInSeconds = 60;
  private secondsLeftOnTimer;
  private intervalId;

  //for div positioning
  private wordSetMovedAmount = 0; //for repositioning the div


  ngOnInit() {
    this.wordsetMarginTop = 0;
    this.selectedLanguage = "german";

    for (var i = 0; i < wordsJson.sets.length; i++) {
      this.languages.push(wordsJson.sets[i].language);
    }
  }


  

  languageSelected(language: String) {
    this.selectedLanguage = language;
  }

 
  ////restartGame() {


  ////  reset position of div
  ////  var pixelstomove = this.wordSetMovedAmount * 50;
  ////  console.log(pixelstomove);
  ////  $("#wordset").css({ marginTop: '+=' + pixelstomove + 'px' });
  ////  this.wordSetMovedAmount = 0;
  ////  this.currentWordIndex = 0;

  ////  var wordSetChildren = (<HTMLInputElement>document.getElementById("wordset")).children;
  ////  for (var i = 0; i < wordSetChildren.length; i++) {
  ////    var wordElement = (<HTMLInputElement>wordSetChildren[i]);
  ////    this.elementColor(wordElement, "black");
  ////  }


  ////  this.ngOnInit();
  ////  this.ngOnInit();




  ////  this.loadWordSet();


  ////  //reset timer
  ////  clearInterval(this.intervalId);
  ////  (<HTMLInputElement>document.getElementById("timer")).innerHTML = "1:00";
  ////  this.secondsLeftOnTimer = null;

  ////  //reset score stats
  ////  this.falseCharactersAmount = 0;
  ////  this.falseWordsAmount = 0;
  ////  this.rightCharactersAmount = 0;
  ////  this.rightWordsAmount = 0;

  ////  //reset general settings
  ////  this.currentWordIndex = 0;


  ////  reset style of div
   

  ////  //set backgroundcolor of first element
  ////  //this.elementBackgroundColor((<HTMLInputElement>firstWord), "lightgray");

  ////  //reest user input area





  ////}


  //keypress(event) {
  //  console.log("left: " + this.secondsLeftOnTimer);
  //  if (this.secondsLeftOnTimer == null) {
  //    this.startTimer();
  //  }

  //  var userInputElement = (<HTMLInputElement>document.getElementById('userInput'));
  //  var currentWordElement = (<HTMLInputElement>document.getElementById('word' + String(this.currentWordIndex)));
  //  var nextWordElement = (<HTMLInputElement>document.getElementById('word' + String(this.currentWordIndex + 1)));

  //  var submittedTextFromUser = userInputElement.value;
  //  var submittedCurrentWordFromUser = submittedTextFromUser.split(" ")[0];

  //  //if user presses space
  //  if (event.key == " ") {
  //    this.resetUserInputArea(userInputElement, submittedTextFromUser);
  //    this.resetBackgroundForWordElements(currentWordElement, nextWordElement);

  //    if(submittedCurrentWordFromUser == currentWordElement.innerHTML) {
  //      this.elementColor(currentWordElement, "green");
  //      this.rightCharactersAmount += (submittedCurrentWordFromUser.length + 1);
  //      this.rightWordsAmount++;
  //    }
  //    else {
  //      this.elementColor(currentWordElement, "red");
  //      this.falseCharactersAmount += submittedCurrentWordFromUser.length;
  //      this.falseWordsAmount++;
  //    }

  //    //check if the element breaks the line
  //    var positionCurrentWord = $("#" + currentWordElement.id).position();
  //    var positionNextWord = $("#" + nextWordElement.id).position();

  //    if (positionCurrentWord.top != positionNextWord.top) {
  //      //var heightOfWordContainer = (document.getElementById('wordContainer')).offsetHeight;
  //      //var divPadding = 5;

  //      this.wordsetMarginTop -= 50;
  //      //$("#wordset").animate({ marginTop: '-=' + ((heightOfWordContainer / 2) - divPadding) + 'px' });
  //    }

  //    this.currentWordIndex++;
  //  }
  //  else {  //if a normal key is pressed
  //    if (currentWordElement.innerHTML.startsWith(submittedCurrentWordFromUser)) {
  //      this.elementBackgroundColor(currentWordElement, "lightgrey");
  //    }
  //    else {
  //      this.elementBackgroundColor(currentWordElement, "red");
  //    }
  //  }
  //}

  //moveWordSet(direction: String) {
  //  var heightOfWordContainer = (document.getElementById('wordContainer')).offsetHeight;
  //  var divPadding = 5;

  //  $("#wordset").move({ marginTop: direction + '=' + ((heightOfWordContainer / 2) - divPadding) + 'px' });
  //}

  setTimerElement() {
  }

  startTimer() {
    this.secondsLeftOnTimer = this.timerInSeconds;
    var timeElement = (<HTMLInputElement>document.getElementById("timer"));

    this.intervalId = setInterval(() => {
      this.secondsLeftOnTimer--;

      if (this.secondsLeftOnTimer < 10) {
        timeElement.innerHTML = "0:0" + this.secondsLeftOnTimer;
      }
      else {
        timeElement.innerHTML = "0:" + this.secondsLeftOnTimer;
      }
      if (this.secondsLeftOnTimer == 0) {
        this.endGame();
      }
    }, 1000)
  }

  endGame() {

    clearInterval(this.intervalId); //that the times doesn't count to minus

    //calculation for wordPerMinute
    var wordsPerMinuteExactValue = (this.rightCharactersAmount / 5) / (this.timerInSeconds / 60);
    this.wordsPerMinute = Math.floor(wordsPerMinuteExactValue); //round it to the lower number
    $("#resultModal").modal('show');
  }

  resetUserInputArea(userInputElement: HTMLInputElement, submittedText: string) {
    var textAfterSpace = submittedText.split(" ")[1];
    userInputElement.value = textAfterSpace; //if the user enters a text after space it gets inserted
  }

  resetBackgroundForWordElements(currentWordElement: HTMLInputElement, nextWordElement: HTMLInputElement) {
    this.elementBackgroundColor(currentWordElement, "transparent");
    this.elementBackgroundColor(nextWordElement, "lightgray");
  }
 
  //stlye functions
  elementColor(element: HTMLInputElement, color: string) {
    element.style.color = color;
  }

  elementBackgroundColor(element: HTMLInputElement, color: string) {
    element.style.backgroundColor = color;
  }
}



