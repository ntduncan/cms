import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Document } from '../Document.model';
import {DocumentService} from '../../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Input() documents: Document[];
  constructor(public documentService: DocumentService) { }

  ngOnInit(): void {
  }

  onSelect(document: Document){
    this.documentService.documentEmitter.emit(document);
  }

}
