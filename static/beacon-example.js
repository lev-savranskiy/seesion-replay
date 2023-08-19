// todo decide if we doing beacon. it does not seem reliable
// add it to  @HostListener('window:beforeunload', ['$event'])
if (this.statusService.isUseCapture()) {

  log.log(this, 'Capture started');
  const sessionStorageCopy = this.statusService.xmplay.sessionStorageCopy;
  log.log(this, sessionStorageCopy);
  if (sessionStorageCopy.session) {
    const data = {
      session: sessionStorageCopy.session,
      cacheId: sessionStorageCopy.cacheId,
      account: {
        id: sessionStorageCopy.AcctGUID
      },
      agent: {
        accessToken: sessionStorageCopy.accessToken,
        agentToken: sessionStorageCopy.agentToken,
        id: sessionStorageCopy.agentId,
        roleName: sessionStorageCopy.roleName,
        salesChannel: sessionStorageCopy.salesChannel,
        env: sessionStorageCopy.env
      },
      completeUrl: sessionStorageCopy.completeUrl,
      xm_version: this.statusService.xmplay['xm_version'],
      time_started: this.statusService.xmplay['time_started'],
      steps: this.statusService.xmplay['steps'],
      requests: this.statusService.xmplay['requests']
    };
    // https://www.w3.org/TR/beacon/
    // json not allowed in CORS beacon
    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain; charset=UTF-8'});
    navigator.sendBeacon(this.statusService.xmplay.apiUrl, blob);
  }
}
