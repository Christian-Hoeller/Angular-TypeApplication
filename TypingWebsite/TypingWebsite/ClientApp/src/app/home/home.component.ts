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
    this.selectedLanguage = "english";

    for (var i = 0; i < wordsJson.sets.length; i++) {
      this.languages.push(wordsJson.sets[i].language);
    }
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



