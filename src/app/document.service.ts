import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  public documentEmitter = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents;
  }

  getDocument(id: string): Document {
    this.documents.map((document) => {
      if (document.id === id) {
        return document;
      }
    });
    return null;
  }

  deleteDocument(document: Document) {
    return; //TODO: This still need to be build
  }
}
