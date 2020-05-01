import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Note } from "../../shared/note";

@Component({
  selector: "app-note-cards",
  templateUrl: "./note-cards.component.html",
  styleUrls: ["./note-cards.component.scss"],
})
export class NoteCardsComponent implements OnInit {
  @Input() note: Note;
  @Output() noteUpdated: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() noteDeleted: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() {}

  ngOnInit(): void {}

  updateNote(): void {
    this.noteUpdated.emit(this.note);
  }

  deleteNote() {
    this.noteDeleted.emit(this.note);
  }
}
