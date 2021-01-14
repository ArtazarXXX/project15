import { Component, OnInit } from '@angular/core';
import { MyWorker, MyWorkerType } from './shared/worker.model';
import { HttpWorkerService } from './shared/services/http-worker.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Список сотрудников';
  workers: MyWorker[];
  MyWorkerType = MyWorkerType;
  phoneNum = new RegExp('[+][0-9][-][0-9]{3}[-][0-9]{3}[-][0-9]{2}[-][0-9]{2}');
  searchName = '';
  searchSurname = '';
  
  constructor(private HttpWorkerService: HttpWorkerService){}
  
  ngOnInit(): void {
    this.getData();    
  }

  async getData(){
    try{
      this.workers = await this.HttpWorkerService.getWorkers()
    } catch(err){
      console.log(err);
    }
  }

  getByType(type: number){
    return this.workers.filter(worker => worker.type === type)
  }

  async onDeleteWorker(id: number){
    let index = this.workers.findIndex(worker => worker.id === id)
    let worker_del = this.workers[index];
    if (index !== -1){
      try{
        await this.HttpWorkerService.deleteWorkers(worker_del)
      } catch(err){
        console.log(err);
      } finally {
        this.getData()
      }
    }
  }
  
  async onAddWorker(worker: MyWorker){
    let id = this.workers.length > 0
    ? this.workers[this.workers.length - 1].id + 1
    : 0;
    worker.id = id;
    try{
      await this.HttpWorkerService.postWorkers(worker)
    } catch(err){
      console.log(err);
    } finally {
      this.getData()
    }
  }

  async onEditAccept(staffer: MyWorker){ //Редактирование записи
      let id_new = this.workers.length > 0
      ? this.workers[this.workers.length - 1].id + 1
      : 0;
      let id_old = this.workers.findIndex(worker => worker.id === staffer.old_id);
      if (staffer.id == null){ //Меняем введенное пользователем id, если оно уже занято или если пользователь его не ввел
        if(staffer.name != null && staffer.surname != null && staffer.name.length > 0 && staffer.surname.length > 0 && staffer.phone_number.length > 0 && this.phoneNum.test(staffer.phone_number) === true){
          staffer.id = id_new;
          staffer.old_id = id_old;
          try{
            await this.HttpWorkerService.rewriteWorkers(staffer)
          } catch(err){
            console.log(err);
          } finally {
            this.getData()
          }
        }
      }
      else{
        if(staffer.name != null && staffer.surname != null && staffer.name.length > 0 && staffer.surname.length > 0 && staffer.phone_number.length > 0 && this.phoneNum.test(staffer.phone_number) === true){
          staffer.old_id = id_old;
          try{
            await this.HttpWorkerService.rewriteWorkers(staffer)
          } catch(err){
            console.log(err);
          } finally {
            this.getData()
          }
      }
    }
  }
}
