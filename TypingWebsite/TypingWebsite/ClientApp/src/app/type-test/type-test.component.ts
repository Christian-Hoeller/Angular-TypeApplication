import { Component, Input, SimpleChanges } from '@angular/core';
import wordsJson from 'src/assets/words.json';
declare let $: any;



@Component({
  selector: 'app-type-test',
  templateUrl: './type-test.component.html',
})
export class TypeTestComponent {

  @Input() language;
  words: Array<string> = new Array();
  inputAreaReadonly: boolean = false;
  isReadonly: boolean = false;

  //styles
  wordsStyle: Array<style> = new Array();
  //user input
  userInput: string;

  //indexing and margin
  wordsetMarginTop: number = 0;
  currentWordIndex: number = 0;

  //user stats
  resultStats: gameStats;
  rightWordsAmount: number;
  rightCharactersAmount: number;
  falseWordsAmount: number;
  falseCharactersAmount: number;
  wordsPerMinute;

  //timer
  timerText: string;
  timerInSeconds: number;
  secondsLeftOnTimer: number;
  intervalId;



  console() {
    console.log("weeeelll i think this works fine");
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.language.firstChange == false && changes.language != null) {
      this.ngOnInit();
    }
  }

  ngOnInit() {



    this.currentWordIndex = 0;
    this.wordsetMarginTop = 0;
    this.resetStats();
    this.timerInSeconds = 3;
    this.timerText = "1:00";
    this.userInput = "";

    this.loadWordSet();

    this.inputAreaReadonly = true;
  }

  resetStats() {
    this.rightWordsAmount = 0;
    this.rightCharactersAmount = 0;
    this.falseWordsAmount = 0;
    this.falseCharactersAmount = 0;
  }

  restartGame() {


    this.isReadonly = false;

    clearInterval(this.intervalId); //that the times doesn't count to minus
    this.secondsLeftOnTimer = null;
    this.ngOnInit();
  }

  loadWordSet() {

    var wordset;
    for (var i = 0; i < wordsJson.sets.length; i++) {
      if (wordsJson.sets[i].language == this.language) {
        wordset = wordsJson.sets[i].wordset.split(" ");   //splits the wordset into the text array
        break;
      }
    }

    this.wordsStyle = [];
    this.words = [];

    //select random words
    for (var i = 0; i < 400; i++) {
      var randomIndex = Math.floor(Math.random() * wordset.length);
      this.wordsStyle.push({ color: "black", backgroundColor: "transparent" });

      this.words.push(wordset[randomIndex]);
    }

    this.wordsStyle[0].backgroundColor = "lightgray";
    console.log(this.wordsStyle);
  }

  keypress(event) {
    if (this.secondsLeftOnTimer == null) {
      this.startTimer();
    }

    var currentWordElement = (<HTMLInputElement>document.getElementById('word' + String(this.currentWordIndex)));
    var nextWordElement = (<HTMLInputElement>document.getElementById('word' + String(this.currentWordIndex + 1)));

    var currentWordInput = this.userInput.split(" ")[0];

    //if user presses space
    if (event.key == " ") {

      if (currentWordInput == this.words[this.currentWordIndex]) {
        this.wordsStyle[this.currentWordIndex].color = "green";
        this.rightCharactersAmount += (currentWordInput.length + 1);
        this.rightWordsAmount++;
      }
      else {
        this.wordsStyle[this.currentWordIndex].color = "red";
        this.falseCharactersAmount += currentWordInput.length;
        this.falseWordsAmount++;
      }

      //check if the element breaks the line
      var positionCurrentWord = $("#" + currentWordElement.id).position();
      var positionNextWord = $("#" + nextWordElement.id).position();

      if (positionCurrentWord.top != positionNextWord.top) {
        //var heightOfWordContainer = (document.getElementById('wordContainer')).offsetHeight;
        //var divPadding = 5;

        this.wordsetMarginTop -= 50;
        //$("#wordset").animate({ marginTop: '-=' + ((heightOfWordContainer / 2) - divPadding) + 'px' });
      }

      this.userInput = this.userInput.split(" ")[1];  //the user writes more than the space so every other character gets added

      this.wordsStyle[this.currentWordIndex].backgroundColor = "transparent";
      this.wordsStyle[this.currentWordIndex + 1].backgroundColor = "lightgray";

      this.currentWordIndex++;
    }
    else {  //if a normal key is pressed
      if (currentWordElement.innerHTML.startsWith(currentWordInput)) {
        this.wordsStyle[this.currentWordIndex].backgroundColor = "lightgray";

      }
      else {
        this.wordsStyle[this.currentWordIndex].backgroundColor = "red";
      }

    }
  }

  startTimer() {
    this.secondsLeftOnTimer = this.timerInSeconds;
    this.intervalId = setInterval(() => {
      this.secondsLeftOnTimer--;

      if (this.secondsLeftOnTimer < 10) {
        this.timerText = "0:0" + this.secondsLeftOnTimer;
      }
      else {
        this.timerText = "0:" + this.secondsLeftOnTimer;
      }
      if (this.secondsLeftOnTimer == 0) {
        this.timeIsUp();
      }
    }, 1000)
  }

  timeIsUp() {



    this.userInput = "";
    this.isReadonly = true;

    clearInterval(this.intervalId); //that the times doesn't count to minus

    //calculation for wordPerMinute
    var wordsPerMinuteExactValue = (this.rightCharactersAmount / 5) / (this.timerInSeconds / 60);
    this.wordsPerMinute = Math.floor(wordsPerMinuteExactValue); //round it to the lower number


    $("#resultModal").modal('show');
  }

  closeModal() {

  }
}

interface style {
  color: string;
  backgroundColor: string;
}

interface gameStats {
  rightWordsAmount: number;
  rightCharactersAmount: number;
  falseWordsAmount: number;
  falseCharactersAmount: number;
  wordsPerMinute;
}
