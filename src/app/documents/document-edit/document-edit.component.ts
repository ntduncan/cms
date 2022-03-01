import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from 'src/app/document.service';

import { Document } from '../Document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      if (id === undefined || id === null) return; //Null Check

      this.originalDocument = this.documentService.getDocument(id);
      if (!this.originalDocument) return; //Null Check

      this.editMode = true;
      this.document = Object.assign({}, this.originalDocument);
    });
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    const newDocument = new Document('1', form.value.name, form.value.description, form.value.url, null);

    if (!this.editMode) {
      this.documentService.addDocument(newDocument);
    } else {
      this.documentService.updatedDocument(this.originalDocument, newDocument)
    }
    
    this.router.navigate(['/documents']);
  }
}
