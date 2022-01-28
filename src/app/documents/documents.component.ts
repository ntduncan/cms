import { Component, OnInit } from '@angular/core';
import {Document} from './Document.model'

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;
  documents: Document[] = [
    new Document("Doc 1", "https://www.google.com", "This is a test doc"),
    new Document("Doc 2", "https://www.google.com", "This is another test doc"),
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
