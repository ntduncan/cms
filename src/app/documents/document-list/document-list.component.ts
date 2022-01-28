import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Document } from '../Document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Input() documents: Document[];
  @Output() documentSelected = new EventEmitter<Document>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(document: Document){
    this.documentSelected.emit(document);
  }

}
