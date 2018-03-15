import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { NdcserviceService } from '../services/ndcservice.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-ndcreceived',
  templateUrl: './ndcreceived.component.html',
  styleUrls: ['./ndcreceived.component.css']
})
export class NdcreceivedComponent implements OnInit {
  public dataList: any;
  public p = 1;

  constructor(private ndcserviceService: NdcserviceService, private router: Router, public progress: NgProgress) {
  }

  ngOnInit() {
    this.ndcserviceService.getAll()
    .subscribe(data => {
        this.dataList = data;
      }
    );
  }

  searchData(frameNo: string, receivedDate: string) {
    console.log('frameNo' + frameNo);
    console.log('receivedDate' + receivedDate);
    this.progress.start();
    this.ndcserviceService.searchData(frameNo, receivedDate)
    .subscribe(data => {
      this.progress.complete();
      this.dataList = data;
    }
    );
  }

  saveRec(frameNo: string, status: string) {
    this.progress.start();
    this.ndcserviceService.saveStatus(frameNo, status)
    .subscribe( data => {
      console.log(data);
      // Get Data AfterDelete
      this.ndcserviceService.getAll()
      .subscribe( data2 => {
          this.progress.complete();
          this.dataList = data2;
        }
      );
    });
  }

  createRec(frameNo: string, status: string) {
    this.ndcserviceService.createData(frameNo);
  }

  deleteRec(result) {
    if (confirm('Are you sure you want to delete ' + result.frameno + '?')) {
      this.progress.start();
      this.ndcserviceService.deleteData(result.frameno)
      .subscribe (data => {
        console.log(data);
        // Get Data AfterDelete
        this.ndcserviceService.getAll()
        .subscribe( data2 => {
            this.progress.complete();
            this.dataList = data2;
          }
        );
      },
      error => {
        console.error('Error !');
      });
    }
  }

}
