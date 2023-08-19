if (typeof XMPLAY === 'function') {
  //use real XMPLAY location
  window.xmplay = new XMPLAY({
    //url: 'https://ax-sandbox.xmobiletest.com/xm360-play',
    url: 'http://localhost:3000',
    //omit whitelist to capture all http requests
    //whitelist: ['codebig2.net', 'mobile.xfinity.com']
    blacklist: ['localhost', 'api/apiCache', 'col.eum-appdynamics.com']
  });
  window.xmplay.xm_version = window["xm_version"] || '19.4.0';
  window.xmplay.cacheId = window.xmplay.getUrlParam('cacheId');
  window.xmplay.useReplay = window.xmplay.getUrlParam('useReplay') === 'true';
  if (window.xmplay.cacheId && window.xmplay.useReplay) {
    //stop adrum
    window.ADRUM = {};
    window['adrum-disable'] = true;
    sessionStorage.setItem('useReplay', 'true');
    // sessionStorage.setItem('roleName', 'Einstein Telesales');
    sessionStorage.setItem('env', window.xmplay.getUrlParam('env'));
    sessionStorage.setItem('agentId', window.xmplay.getUrlParam('agentId'));
    sessionStorage.setItem('agentToken', window.xmplay.getUrlParam('agentToken'));
    sessionStorage.setItem('accessToken', window.xmplay.getUrlParam('accessToken'));
    sessionStorage.setItem('AcctGUID', window.xmplay.getUrlParam('AcctGUID'));

    // load replay data async does not work
    // xm360 app start polling before it arrives
    // window.xmplay.getReplayData();

    // // load replay data sync
    // let scriptNode = document.createElement('script');
    // scriptNode.src = `${xmplay.apiUrl}/data.js?cacheId=${window.xmplay.cacheId}`;
    // scriptNode.type = "text/javascript";
    // scriptNode.async = false;
    // scriptNode.defer = true;
    // document.head.appendChild(scriptNode);
    //
    // //load main.js
    // scriptNode = document.createElement('script');
    // scriptNode.src = `main.js`;
    // scriptNode.type = "text/javascript";
    // scriptNode.async = false;
    // scriptNode.defer = true;
    // document.head.appendChild(scriptNode);


    //waitForEl and build player
    // window.xmplay.waitForEl(['nav-1', 'nav-2']);
    window.xmplay.console.log('replay started')

  } else {


    xmplay.getCaptureData = function () {
      return {
        session: sessionStorage.getItem('session'),
        cacheId: sessionStorage.getItem('cacheId'),
        account: {
          id: sessionStorage.getItem('AcctGUID')
        },
        agent: {
          accessToken: sessionStorage.getItem('accessToken'),
          agentToken: sessionStorage.getItem('agentToken'),
          id: sessionStorage.getItem('agentId'),
          roleName: sessionStorage.getItem('roleName'),
          salesChannel: sessionStorage.getItem('salesChannel'),
          env: sessionStorage.getItem('env'),
          destinationUrl:  sessionStorage.getItem('destinationUrl')
        },
        completeUrl: sessionStorage.getItem('completeUrl') ,
        xm_version: window.xmplay.xm_version,
        time_started: window.xmplay.time_started,
        steps: window.xmplay.steps,
        requests: window.xmplay.requests
      }
    };


    window.xmplay.addListeners();
    sessionStorage.setItem('useReplay', 'false');
    window.xmplay.console.log('capture started');


  }

} else {
  console.error('xmplay not found')
}
