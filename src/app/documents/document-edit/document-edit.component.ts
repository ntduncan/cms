import { Component, OnInit } from '@angular/core';
import {Document} from '../Document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    return;
  }

  onSubmit(newDocument: Document){
    return;
  }

}
