import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database/database.service";
import { Notebook } from "../shared/notebook";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  notebooks: Notebook[] = [];

  constructor(private noteService: DatabaseService) {
    // this.notebooks = this.noteService.getAllNotebooks();
  }

  ngOnInit() {
    this.noteService.getAllNotebooks().then(
      (res) => {
        this.notebooks = res;
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.notebooks);
    if (this.notebooks.length < 1) {
      this.noteService.populate();
    }
  }
}
