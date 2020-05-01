import { Component, OnInit } from "@angular/core";
import { Notebook } from "../shared/notebook";
import { Note } from "../shared/note";
import { DatabaseService } from "../database/database.service";
import { not } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  allNotes: Note[] = [];
  searchText: string;
  selectedNotebook: Notebook;

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.getAllNotes();
    this.getAllNotebooks();
  }

  public getAllNotebooks() {
    this.dbService.getAllNotebooks().then(
      (res) => {
        this.notebooks = res;
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.notebooks);
  }

  public createNotebook() {
    let newNotebook: Notebook = {
      name: "New Notebook",
      id: null,
    };

    this.dbService.postNotebook(newNotebook).then(
      (response) => {
        newNotebook.id = response.id;
        this.notebooks.push(newNotebook);
        this.getAllNotebooks();
      },
      (error) => {
        alert("An error has occured while sending feedback");
      }
    );
  }

  public updateNotebook(updatedNotebook: Notebook) {
    this.dbService.postNotebook(updatedNotebook).then(
      (response) => {},
      (error) => {
        alert("An error has occured while sending feedback");
      }
    );
  }

  public deleteNotebook(notebook: Notebook) {
    if (confirm("Are you sure you want to delete notebook?")) {
      this.dbService.deleteNotebook(notebook.id).then(
        (response) => {
          const indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
          (notes) => notes.forEach((nt) => this.delNoteDirect(nt));
        },
        (error) => {
          alert("An error has occured while sending feedback");
        }
      );
    }
  }

  // NOTE METHODS

  public getAllNotes() {
    this.dbService.getAllNotes().then(
      (res) => {
        this.notes = res;
        this.allNotes = res;
      },
      (error) => {
        alert("An error has occured while getting notes");
      }
    );
  }

  public createNote(nb_id: number) {
    let newNote: Note = {
      id: null,
      title: "New note",
      text: "Write some text in here",
      notebook_id: nb_id,
      last_modified_on: Date.now(),
    };

    this.dbService.saveNote(newNote).then(
      (response) => {
        newNote.id = response.id;
        this.notes.push(newNote);
        this.getAllNotes();
      },
      (error) => {
        alert("An error has occured while saving a note");
      }
    );
  }

  public selectNotebook(notebook: Notebook) {
    console.log(this.notes);
    this.selectedNotebook = notebook;
    console.log(this.selectedNotebook);
    this.notes = this.allNotes.filter(
      (note) => note.notebook_id === notebook.id
    );
    //TODO: grab all the notes for this notebook only
  }

  public updateNote(updatedNote: Note) {
    updatedNote.last_modified_on = Date.now();
    this.dbService.saveNote(updatedNote).then(
      () => {},
      (error) => {
        console.log(error);
      }
    );
  }

  public selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }

  public deleteNote(note: Note) {
    if (confirm("Are you sure you want to delete this note?")) {
      this.delNoteDirect(note);
    }
  }

  private delNoteDirect(note: Note) {
    this.dbService.deleteNote(note.id).then(
      (response) => {
        let index = this.notes.indexOf(note);
        this.notes.splice(index, 1);
        index = this.allNotes.indexOf(note);
        this.allNotes.splice(index, 1);
      },
      (error) => {
        alert("An error occurred while deleting the note");
      }
    );
  }
}
