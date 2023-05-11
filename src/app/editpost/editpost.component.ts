import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

//TODO prefilla fields med tidigare info

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent {
  public dialog: MatDialogRef<EditpostComponent>;
  #backendService: BackendService;

  protected postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required])
  });

  constructor(
    dialog: MatDialogRef<EditpostComponent>,
    backendService: BackendService
  ) {
    this.dialog = dialog;
    this.#backendService = backendService;
  }

  protected onSubmit(): void {
    if (this.postForm.valid) this.dialog.close(this.postForm.value);
  }

  protected onNoClick(): void {
    this.dialog.close();
  }
}
