import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FeedbackComponent } from "./feedback/feedback.component";
import { NotesComponent } from "./notes/notes.component";

const routes: Routes = [
  {
    path: "",
    component: NotesComponent,
  },
  {
    path: "feedback",
    component: FeedbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
