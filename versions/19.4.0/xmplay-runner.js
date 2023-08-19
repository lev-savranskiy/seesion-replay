// this is local copy for dev purpose only
// use https://ax-sandbox.xmobiletest.com/xm360-play/static/xmplay-runner.js
// or other CDN version

if (typeof XMPLAY === 'function') {
    //use real XMPLAY location
    window.xmplay = new XMPLAY({
        //url: 'https://ax-sandbox.xmobiletest.com/xm360-play',
        url: 'http://localhost:3000',
        //omit whitelist to capture all http requests
        //whitelist: ['codebig2.net', 'mobile.xfinity.com']
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
        // we need replay data before bootstrap
        // replay  executed in xm360 main.browser.ts
        // window.xmplay.getReplayData();
        // add styles for replay
        const linkNode = document.createElement( 'link' );
        linkNode.rel  = 'stylesheet';
        linkNode.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(linkNode);
        const styleNode = document.createElement('style');
        document.head.appendChild(styleNode);
        styleNode.innerHTML = ".xfinity-loader-container {display: none; }\n";

        window.xmplay.console.log('replay started')

    } else {
        window.xmplay.addListeners();
        sessionStorage.setItem('useReplay', 'false');
        window.xmplay.console.log('capture started')
    }

} else {
    console.error('xmplay not found')
}
