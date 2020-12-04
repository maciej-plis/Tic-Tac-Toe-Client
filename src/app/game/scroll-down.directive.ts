import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollDown]'
})
export class ScrollDownDirective {
  observer;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new MutationObserver(mutations => {
      mutations.forEach((mutation) => {
        this.scrollDown();
      });   
    });

    this.observer.observe(this.elRef.nativeElement, {childList: true});
  }

  private scrollDown() {
    this.elRef.nativeElement.scrollTop = this.elRef.nativeElement.scrollHeight;
  }

}
