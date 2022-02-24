import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/document.service';
import { WindRefService } from 'src/app/wind-ref-service.service';
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

  constructor(
    public documentService: DocumentService, 
    private route: ActivatedRoute,
    private windRefService: WindRefService) { }

  ngOnInit(): void {
    //Initialize edit mode based on the path
  }

  onCancel() {
    return;
  }

  onSubmit(form: NgForm){
    const newDocument = new Document('1', form.value.name, form.value.url)
    this.documentService.addDocument(newDocument);
  }

}
