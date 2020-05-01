import { Injectable } from "@angular/core";
import { Note } from "../shared/note";
import { Observable, of } from "rxjs";
import { Notebook } from "../shared/notebook";
import { HttpClient } from "@angular/common/http";
import { FeedbackViewModel } from "../feedback/feedback.component";
import { NgxIndexedDBService } from "ngx-indexed-db";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(
    private http: HttpClient,
    private dbService: NgxIndexedDBService
  ) {}

  getAllNotebooks(): Promise<Notebook[]> {
    return this.dbService.getAll<Notebook>("notebook");
  }

  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return new Observable();
  }

  postNotebook(notebook: Notebook): Promise<any> {
    if (notebook.id === null) {
      return this.dbService.add("notebook", {
        name: notebook.name,
      });
    } else {
      return this.dbService.update("notebook", {
        id: notebook.id,
        name: notebook.name,
      });
    }
  }

  deleteNotebook(id: number): Promise<any> {
    return this.dbService.delete("notebook", id);
  }

  getAllNotes() {
    return this.dbService.getAll<Note>("note");
  }

  getNotesByNotebook(notebookId: number): Promise<Note[]> {
    return this.dbService.getByIndex("note", "notebook_id", notebookId);
  }

  saveNote(note: Note): Promise<any> {
    // return this.http.post<Note>(this.SAVE_UPDATE_NOTE_URL, note);
    let result: Observable<Note>;
    if (note.id === null) {
      return this.dbService.add("note", {
        title: note.title,
        text: note.text,
        notebook_id: note.notebook_id,
        last_modified_on: note.last_modified_on,
      });
    } else {
      return this.dbService.update("note", {
        id: note.id,
        title: note.title,
        text: note.text,
        notebook_id: note.notebook_id,
        last_modified_on: note.last_modified_on,
      });
    }

    // return result;

    // return new Observable();
  }

  deleteNote(id: number): Promise<any> {
    return this.dbService.delete("note", id);
  }

  populate() {
    this.dbService
      .add("notebook", {
        id: 1,
        name: "Admin Notebook",
      })
      .then(
        () => {},
        (error) => {
          console.log("Database already exists: " + error);
        }
      );

    this.dbService
      .add("note", {
        id: 1,
        title: "Welcome",
        text:
          "This is your personal PWA Notebook accessible in only this browser",
        notebook_id: 1,
        last_modified_on: Date.now(),
      })
      .then(
        () => {},
        (error) => {
          console.log("Database already exists: " + error);
        }
      );
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
