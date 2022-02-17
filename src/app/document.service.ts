import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from './documents/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  public documentEmitter = new EventEmitter<Document>();
  public documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  addDocument(newDoc: Document) {
    if (newDoc === undefined || newDoc === null) return;

    this.maxDocumentId += 1;
    newDoc.id = this.maxDocumentId.toString();
    this.documents.push(newDoc);
    const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
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

    if (requestedDocument !== null) return requestedDocument;

    return null;
  }

  updatedDocument(originalDocument: Document, newDocument: Document) {
    if(!originalDocument || !newDocument) return

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return; //Null Check

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  deleteDocument(document: Document) {
    this.documents.splice(this.documents.indexOf(document), 1);
    this.router.navigate(['/documents', { relativeTo: this.route }]);
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.map((document: Document) => {
      const currentId = parseInt(document.id);
      if (currentId > maxId) maxId = currentId;
    });
    return maxId;
  }
}
