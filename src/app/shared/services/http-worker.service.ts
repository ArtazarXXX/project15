import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyWorker } from '../worker.model';

@Injectable({
  providedIn: 'root'
})
export class HttpWorkerService {

  routeApi = 'http://localhost:3000/workers'

  constructor(private http: HttpClient) { }

  getWorkers(): Promise<any>{
    return this.http.get(this.routeApi).toPromise()
  }

  postWorkers(data: MyWorker){
    return this.http.post(this.routeApi, data).toPromise()
  }

  deleteWorkers(data: MyWorker){
    return this.http.delete(this.routeApi + "/" + data.id).toPromise()
  }

  rewriteWorkers(data: MyWorker){
    return this.http.put(this.routeApi + "/" + data.old_id, data).toPromise();
  }
}
