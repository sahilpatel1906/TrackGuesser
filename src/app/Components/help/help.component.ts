import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  @Input() show: boolean = false;
  @Output() helpState = new EventEmitter<boolean>();
  constructor() { }

  closeModal() {
    this.show = false;
    this.helpState.emit(false)
  }

  closeByClickOutside(event: any) {
    if(event.target.id == "outside-modal"){
      this.closeModal();
    }
  }
}
