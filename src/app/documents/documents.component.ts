import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import {Document} from './Document.model';


@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;
  documents: Document[];
  constructor(public documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
   }

  ngOnInit(): void {
    this.documentService.documentEmitter.subscribe((document: Document) => {
      this.selectedDocument = document;
    })
  }

}
