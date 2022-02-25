import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild("f") addDocumentForm: NgForm;

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
