import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class NdcserviceService {
  private url = 'http://localhost:8080/SpringRestfulWebServicesWithJSONExample/';
  private result: any;
  constructor(private http: HttpClient) { }

  getAll() {
    // this.http.get(this.url + 'ndcreceiveds').subscribe(data => {
    //   this.result = data;
    // });
    // return this.result;
    return this.http.get(this.url + 'ndcreceiveds');
  }

  searchData(frameNo: string, receivedDate: string) {
    return this.http.get(this.url + 'ndcreceiveds' + '?frameno=' + frameNo + '&receivedDate=' + receivedDate );
  }

  saveStatus(frameNo: string, status: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.put(this.url + 'saveNdcreceivedStatus', { 'frameno': frameNo, 'status': status }, httpOptions)
    //     .subscribe (data => {
    //         console.log(data);
    //         this.result = data;
    //       },
    //       error => {
    //         console.error('Error !');
    //         return Observable.throw(error);
    //       });
    return this.http.put(this.url + 'saveNdcreceivedStatus', { 'frameno': frameNo, 'status': status }, httpOptions);
  }


  createData(frameNo: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + 'createNdcreceived', { 'frameno': frameNo }, httpOptions)
        .subscribe (data => {
            console.log(data);
            this.result = data;
          },
          error => {
            console.error('Error !');
            return Observable.throw(error);
          });
  }

  deleteData(frameNo: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete(this.url + 'deleteNdcreceived/' + frameNo);
  }

}

