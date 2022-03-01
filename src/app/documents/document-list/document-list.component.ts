import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Document } from '../Document.model';
import {DocumentService} from '../../document.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[];
  subscription: Subscription;

  constructor(public documentService: DocumentService) { }

  ngOnInit(): void {
    
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    })
    this.documents = this.documentService.getDocuments();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelect(document: Document){
    this.documentService.documentEmitter.emit(document);
  }

}
