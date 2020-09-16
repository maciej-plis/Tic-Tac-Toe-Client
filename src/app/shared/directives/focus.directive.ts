import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[focusThis]'
})
export class FocusDirective implements AfterViewInit{

  constructor(private host: ElementRef) { }

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }

}
