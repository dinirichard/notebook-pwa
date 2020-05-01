import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxIndexedDBModule, DBConfig } from "ngx-indexed-db";
import { DatabaseService } from "./database.service";

const dbConfig: DBConfig = {
  name: "NotesDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "note",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        {
          name: "title",
          keypath: "title",
          options: { unique: false },
        },
        {
          name: "text",
          keypath: "text",
          options: { unique: false },
        },
        {
          name: "notebook_id",
          keypath: "notebook_id",
          options: { unique: false },
        },
        {
          name: "last_modified_on",
          keypath: "last_modified_on",
          options: { unique: false },
        },
      ],
    },
    {
      store: "notebook",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "text", keypath: "text", options: { unique: false } },
      ],
    },
  ],
};
@NgModule({
  declarations: [],
  imports: [CommonModule, NgxIndexedDBModule.forRoot(dbConfig)],
  providers: [],
})
export class DatabaseModule {}
