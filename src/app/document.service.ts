import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from './documents/document.model';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  public documentEmitter = new EventEmitter<Document>();
  public documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
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
    this.http
      .get("https://wdd430-fe5c9-default-rtdb.firebaseio.com/documents.json")
      .subscribe((documents: Document[]) => {
        this.documents = documents;

        this.maxDocumentId = this.getMaxId();

        this.documents.sort((a, b)=> {
          return a.name > b.name ? 1: b.name > a.name ? -1 : 0;
        })
        this.documentListChangedEvent.next(this.documents.slice());
      })
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
    const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
    return;
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
