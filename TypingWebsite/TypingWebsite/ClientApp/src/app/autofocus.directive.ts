import { Directive, ElementRef, Input } from '@angular/core';



@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {
  @Input() appAutofocus: boolean;
  private el: any;
  constructor(
    private elementRef: ElementRef,
  ) {
    this.el = this.elementRef.nativeElement;

  }
  ngOnInit() {
    this.el.focus();
  }

}
