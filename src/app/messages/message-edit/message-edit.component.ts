import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MessageService } from 'src/app/message.service';
import { Message } from '../Messages.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subject: ElementRef;
  @ViewChild('msgTextInput') msgText: ElementRef;
  
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

  onSend(event: Event) {
    event.preventDefault();

    let message = new Message(
      '',
      Math.random().toString(),
      this.subject.nativeElement.value,
      this.msgText.nativeElement.value,
      '12'
    );
    console.log(message)
    this.messageService.addMessage(message);

    this.onClear();
  }
}
