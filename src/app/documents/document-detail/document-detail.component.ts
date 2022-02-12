import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DocumentService } from 'src/app/document.service';
import { Document } from '../Document.model';
import {WindRefService} from '../../wind-ref-service.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;
  
  constructor(
    public documentService: DocumentService, 
    private route: ActivatedRoute,
    private windRefService: WindRefService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.document = this.documentService.getDocument(this.id);
      console.log(this.document)
    })
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
  }

  onView() {
    if(this.document.url){
      this.nativeWindow.open(this.document.url)
    }
  }

}
