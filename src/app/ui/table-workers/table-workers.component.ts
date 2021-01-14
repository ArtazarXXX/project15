import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.model';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css']
})
export class TableWorkersComponent implements OnInit {

  name = '';
  surname = '';
  Name: string;
  Surname: string;
  worker_id: number;
  phone: string;
  type = 0;

  nameStr = '';
  surnameStr = '';



  myWorkertype = MyWorkerType;

  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Output() deleteWorker = 
  new EventEmitter<number>();
  @Output() editAccept = 
  new EventEmitter<MyWorker>();
  id = -1;
  old_id: number;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteWorker(id: number){
    this.deleteWorker.emit(id)
  }

  onEditWorker(id: number){
    this.old_id = id;
    this.id = id;
  }

  onEditAccept(){
    if (this.name != null && this.surname != null){
      let staffer: MyWorker = {
        name: this.Name,
        surname: this.Surname,
        type: this.type,
        id: this.worker_id,
        phone_number: this.phone,
        old_id: this.old_id
      }
      this.editAccept.emit(staffer);
      this.id = -1;
    }
  }
}
