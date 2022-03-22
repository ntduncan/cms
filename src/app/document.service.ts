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


  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    console.log("The eagle has landed")
    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          // this.sortAndSend();
        }
      );
  }

  getDocuments(): Document[] {
    this.http
      .get("http://localhost:3000/documents")
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

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          // this.sortAndSend();
        }
      );
  }


  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          // this.sortAndSend();
        }
      );
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
