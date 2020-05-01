import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DatabaseModule } from "./database/database.module";
import { DatabaseService } from "./database/database.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { NavComponent } from "./nav/nav.component";
import { NotesComponent } from "./notes/notes.component";
import { NoteCardsComponent } from "./notes/note-cards/note-cards.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { NoteTextFilterPipe } from "./shared/note-text-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotesComponent,
    NoteCardsComponent,
    FeedbackComponent,
    NoteTextFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DatabaseModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
