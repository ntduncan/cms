import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from '../documents/documents.component';
import { DocumentEditComponent } from '../documents/document-edit/document-edit.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { MessagesComponent } from '../messages/messages.component';
import { DocumentDetailComponent } from '../documents/document-detail/document-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },

  {
    path: 'documents',
    component: DocumentsComponent,
    children: [
      { path: 'new', component: DocumentEditComponent },
      { path: ':id', component: DocumentDetailComponent },
      { path: ':id/edit', component: DocumentEditComponent}
    ],
  },
  { path: 'contacts', component: ContactsComponent },
  { path: 'messages', component: MessagesComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
