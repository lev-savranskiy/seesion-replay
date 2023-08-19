let

  data = {
    session: sessionStorage.getItem('session'),
    cacheId:sessionStorage.getItem('cacheId'),
    account: {
      id: sessionStorage.getItem('AcctGUID')

    },
    agent: {
      accessToken: sessionStorage.getItem('accessToken'),
      agentToken: sessionStorage.getItem('agentToken'),
      id: sessionStorage.getItem('agentId'),
      roleName: sessionStorage.getItem('roleName'),
      salesChannel: sessionStorage.getItem('salesChannel'),
      env: sessionStorage.getItem('env')
    },
    completeUrl: sessionStorage.getItem('completeUrl'),
    xm_version: 19.2,
    time_started:  xmplay['time_started'],
    steps: xmplay['steps'],
    requests: xmplay['requests']
  };

blob = new Blob([JSON.stringify(data)], { type: 'text/plain; charset=UTF-8' });
navigator.sendBeacon(xmplay.apiUrl, blob);
//xmplay['post'](data);


// https://stackoverflow.com/questions/31355128/how-to-receive-data-posted-by-navigator-sendbeacon-on-node-js-server

//	http://localhost-ax-01262018.comcast.com:8080/Care/Overview?useReplay=true&cacheId=1550178094198&env=ci&agentId=lsavra472&AcctGUID=490114010730042018Comcast.RTVE&agentToken=SDRzSUFBQUFBQUFBQUsyUXdXN0NNQkJFZnlYeUdZSU5VU2pjVWdnaUpRMklwbFNWY3JFY0J5d0ZPN0lOYW92NDl4cHZ5Nkhubml6dg0Kekw2ZDNRdWlleTV0VnFNcGFnMDlheHFOaDZpSDJNbFlkZVRhQzlFRUV4Smhnc2NqaktNaEpnOHpkV1RVMkhCYjdsTG5Cb1pzbEROZg0KS3RScDFZaVd2K3EyUXRNS0hhenR6SFF3ME54UzBZNWkzR2VpTC9tSGRWM2hmaGpTcmd0WnEwNTF5SDZ3a3R0QmhYcXUxV1g0QjR4Ug0KSjgyNHA3eXR0NnVYTWltemRlRWxkcUJTOHRzRUY5elFscHZadlZLaGJWb21XZTZOdEhFN0NXcjVUTldBSWhoamtHN3JBMEhVWHJxZg0KMHV0YXRkQ1JDbWtzRnpJb3VSdDBHK1oxU1kvOGI5dlYxVnZGcUJWS1pnQ040OWpiZjh0SlhXdHVEQXltOENHUWJJeEo4TFJlRnNFaQ0KV0tWRmtjN2ZnOGQ4Tnc4V2VVQUF3b1Q5OU43Tk1zdVRlWnE3TjRGaldiY2tTRkQ0RWgxUUp3U1BJTm1aYTlFSWlQSE03VUZCd2cwMQ0KcGxQYTNlSjZSZGR2dVlyNVZWd0NBQUE9DQo
