import { Directive, ElementRef, Input} from '@angular/core';


@Directive({
  selector: '[readonly],[readOnly]',
  host: {
    '[attr.readonly]': '_isReadonly ? "" : null'
  }
})
export class ReadOnlyDirective {
  _isReadonly = false;

  @Input() set readonly(v) {
    this._isReadonly = Boolean(v);
  };

  ngOnChanges(changes) {
    console.log(changes);
  }
}
