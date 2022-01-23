import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Message } from '../Messages.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subject: ElementRef;
  @ViewChild('msgTextInput') msgText: ElementRef;
  @Output() addMessage = new EventEmitter<Message>();
  constructor() {}

  ngOnInit(): void {}

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

  onSend(event: Event) {
    event.preventDefault();

    let message = new Message(
      Math.random().toString(),
      this.subject.nativeElement.value,
      this.msgText.nativeElement.value,
      'Nate'
    );
    console.log(message)
    this.addMessage.emit(message);

    this.onClear();
  }
}
