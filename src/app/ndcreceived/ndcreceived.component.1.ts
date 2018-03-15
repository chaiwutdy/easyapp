import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { NdcserviceService } from '../services/ndcservice.service';

@Component({
  selector: 'app-ndcreceived',
  templateUrl: './ndcreceived.component.html',
  styleUrls: ['./ndcreceived.component.css']
})
export class NdcreceivedComponent implements OnInit {
  public results: any; // กำหนดตัวแปร เพื่อรับค่า

  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า variable
  public iPage: number[] = [];
  public iPageStart = 1;
  public prevPage: number;
  public nextPage: number;
  public activePage: number;
  public totalItem = 100; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage = 10; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage: number;
  public maxShowPage: number;
  public useShowPage = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd: number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล

  public datatest: any;
  constructor(private ndcserviceService: NdcserviceService,
    private route: ActivatedRoute,
    private router: Router) { }

  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า
  changePage(page: number) {
    this.activePage = page;
    this.router.navigate(['/ndc'], {queryParams: {page: page}});
  }

  pagination() {
    if (this.activePage > this.useShowPage) {
      if (this.activePage + 2 <= this.totalPage) {
        this.iPageStart = this.activePage - 2;
        this.maxShowPage = this.activePage + 2;
      } else {
        if (this.activePage <= this.totalPage) {
          this.iPageStart = (this.totalPage + 1) - this.useShowPage;
          this.maxShowPage = (this.iPageStart - 1) + this.useShowPage;
        }
      }
      this.iPage = [];
      for (let i = this.iPageStart; i <= this.maxShowPage; i++) {
        this.iPage.push(i);
      }
    } else {
      this.iPageStart = 1;
      this.iPage = [];
      for (let i = this.iPageStart; i <= this.useShowPage; i++) {
        this.iPage.push(i);
      }
    }
  }
  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า

  ngOnInit() {
    // ส่วนจัดการเกี่ยวกับการแบ่งหน้า
    this.activePage = 1;
    this.nextPage = 2;
    this.pointEnd = this.perPage * this.activePage;

    this.totalPage = Math.ceil(this.totalItem / this.perPage);
    if (this.totalPage > this.useShowPage) {
      this.useShowPage = 5;
    } else {
      this.useShowPage = this.totalPage;
    }

    for (let i = this.iPageStart; i <= this.useShowPage; i++) {
      this.iPage.push(i);
    }

    this.route
    .queryParams
    .subscribe((data: { page: any }) => {
      if (data != null && data.page != null) {
        this.activePage = +data.page;
        this.prevPage = this.activePage - 1;
        this.nextPage = this.activePage + 1;
        this.pointStart = (this.activePage - 1) * this.perPage;
        this.pointEnd = this.perPage * this.activePage;
        this.pagination();
      }
    });


    // ส่วนของการดึงข้อมูลด้วย HttpClient get() method
    this.datatest = this.ndcserviceService.getAll();
    this.totalItem = this.datatest.length;
    // this.useShowPage = Math.round(this.totalItem / this.perPage);
    this.results = this.datatest;
  }

}
