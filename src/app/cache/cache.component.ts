import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.scss']
})
export class CacheComponent implements OnInit {

  showLoading = false;
  stats = {storageSize: 0};
  xmplay = {};
  transactionUrl = 'https://retail.xmobiletest.com/xm-dev-portal/transaction/search/';
  agentid = '';
  accountid = '';
  cacheid = '';
  sessionid = '';
  displayedColumns = ['cacheId', 'account', 'agent', 'steps', 'requests', 'size', 'time_finished', 'iconsColumn'];
  dataSource = new MatTableDataSource([]);
  localUrl = 'http://localhost-ax-01262018.comcast.com:8080';

  constructor(private api: ApiService) {
    this.xmplay = window['xmplay'];
  }

  ngOnInit() {
    this.pullData();
    this.getStat();
  }

  pullData() {

    this.showLoading = true;
    const query = this.getQuery();

    this.api.getData(query).subscribe(data => {
      this.showLoading = false;
      if (!data) {
        return;
      }

      this.dataSource = new MatTableDataSource(data.result);
    });
  }

  clearSearch() {
    this.agentid = '';
    this.accountid = '';
    this.cacheid = '';
    this.sessionid = '';
    this.pullData();
  }

  getSize(cache) {
    let size = 0;
    if (cache && cache.requests && cache.requests.forEach) {
      cache.requests.forEach((el) => {
        if (el && el.size) {
          size += el.size;
        }
      })
    }
    return size;
  }

  buildQueryParam(cache) {
    return `?useReplay=true&cacheId=${cache.cacheId}&env=${cache.agent.env}` +
      `&agentId=${cache.agent.id}&AcctGUID=${cache.account.id}` +
      `&agentToken=${cache.agent.agentToken}&accessToken=${cache.agent.accessToken}`;
  }

  getDestinationUrl(cache) {
    return cache.agent && cache.agent.destinationUrl && cache.agent.destinationUrl.length ?
      '/' + cache.agent.destinationUrl : '';
  }

  goToDevportal(cache) {
    console.log('[goToDevportal]');
    console.log(cache);
    window.open(`${this.transactionUrl}${cache.cacheId}`, '_blank');
  }

  goToReplayOriginal(cache) {
    console.log('[goToReplayOriginal]');
    console.log(cache);
    window.open(`${cache.completeUrl}${this.getDestinationUrl(cache)}${this.buildQueryParam(cache)}`, '_blank');
  }

  goToReplayLocal(cache) {
    console.log('[goToReplayLocal]');
    console.log(cache);
    //window.open(`${this.localUrl}${this.buildQueryParam(cache)}`, '_blank');
    window.open(`${this.localUrl}${this.getDestinationUrl(cache)}${this.buildQueryParam(cache)}`, '_blank');
  }

  goToReplayStatic(cache) {
    console.log('[goToReplayStatic]');
    console.log(cache);
    window.open(`/versions/${cache.xm_version}/${this.getDestinationUrl(cache)}${this.buildQueryParam(cache)}`, '_blank');
  }


  getQuery() {

    let obj = {};

    if (this.agentid) {
      obj["agent.id"] = this.agentid;
    }
    if (this.accountid) {
      obj["account.id"] = this.accountid;
    }
    if (this.cacheid) {
      obj["cacheId"] = this.cacheid;
    }
    if (this.sessionid) {
      obj["session"] = this.sessionid;
    }

    console.log('[getQuery]');
    console.log(obj);
    return obj;
  }

  getStat() {
    this.api.getStats().subscribe(data => {
      this.stats = data;
    });
  }


}
