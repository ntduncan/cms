import { Component, Input, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/document.service';
import { Document } from '../Document.model';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document;
  
  constructor(public documentService: DocumentService) { }

  ngOnInit(): void {

  }

}
