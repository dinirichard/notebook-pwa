import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database/database.service";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"],
})
export class FeedbackComponent implements OnInit {
  model: FeedbackViewModel = {
    name: "",
    email: "",
    feedback: "",
  };

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {}
  sendFeedback(): void {
    this.dbService.postFeedback(this.model).subscribe(
      (response) => {
        location.reload();
      },
      (error) => {
        alert("An error has occured while sending feedback");
      }
    );
  }
}

export interface FeedbackViewModel {
  name: string;
  email: string;
  feedback: string;
}
