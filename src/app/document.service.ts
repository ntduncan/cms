import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from './documents/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  public documentEmitter = new EventEmitter<Document>();

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents;
  }

  getDocument(id: string): Document {
    let requestedDocument: Document;
    this.documents.map((document) => {
      if (document.id === id) {
        requestedDocument = document;
      }
    });

    if(requestedDocument !== null) return requestedDocument 
      
    return null;
  }

  deleteDocument(document: Document) {
    this.documents.splice(this.documents.indexOf(document),1);
    this.router.navigate(['/documents', {relativeTo: this.route}])

  //   if (!document) {
  //     return;
  //  }
  //  const pos = this.documents.indexOf(document);
  //  if (pos < 0) {
  //     return;
  //  }
  //  this.documents.splice(pos, 1);
  //  this.documentChangedEvent.emit(this.documents.slice();
  }
}
