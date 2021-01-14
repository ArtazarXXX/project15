import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.model';

@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css']
})
export class AddformWorkerComponent implements OnInit {

  myWorkertype = MyWorkerType;
  mask: Array<string | RegExp>;
  workersForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone_number: new FormControl('+7-000-000-00-00', [Validators.required, Validators.pattern("[+][0-9][-][0-9]{3}[-][0-9]{3}[-][0-9]{2}[-][0-9]{2}")]),
    type: new FormControl('', [Validators.required])
  });

  @Output() addWorker = 
  new EventEmitter<MyWorker>();

  constructor() { }

  ngOnInit(): void {
    this.mask = ['+', /[1-9]/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  }

  onAddWorker(){
    let worker: MyWorker = {
      name: this.workersForm.get("name").value,
      surname: this.workersForm.get("surname").value,
      phone_number: this.workersForm.get("phone_number").value,
      type: this.workersForm.get("type").value,
    };
    this.addWorker.emit(worker)
    console.log(worker);
    } 
  }

