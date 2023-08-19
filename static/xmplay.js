/**
 * XMPLAY class
 *
 * This class enabled session data capture and replay at any website
 *
 * @link   https://github.comcast.com/XfinityMobile/XM360-play
 * @file   xmplay.js
 * @author XM360 UI team
 * @version 0.0.1
 */

class XMPLAY {

  /***
   *  constructor
   * @param config
   * url is required
   * all other config params are optional
   */
  constructor(config) {
    this.selfUrl = config.url || 'http://localhost:8080';
    this.name = config.name || "xmplay";
    this.whitelist = config.whitelist || null;
    this.blacklist = config.blacklist || null;
    this.stepTimeout = config.stepTimeout || 1500;
    this.apiUrl = this.selfUrl + '/api';
    this.lookupUrl = this.selfUrl + '/api/lookup';
    this.initialUrl = window.location.href;
    this.time_started = new Date().toString();
    this.interval = null;
    this.cacheId = null;
    this.timer = null;
    this.xm_version = null;
    this.lastX = 0;
    this.lastY = 0;
    this.curstep = 0;
    this.curRequest = 0;
    this.state = 'initial';
    this.sessionStorageCopy = {};
    this.replayData = null;
    this.captureData = null;
    this.steps = [];
    this.requests = [];

    this.cursorUrl64 = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAAUWSURBVHicfZdriFVVFMd/53H1ztxx5jbjKDk+0DInFIsCtVIrApNBbEyJ/BK9I0FFxIbC8kMoQoFkYlHalxCihsSUlJ4ShFFKReKjoPFR+JqH451x7r3nsftwz75nnX3PtGFx9uPs9V/rv9d+LEt1o3AAOxI3+jqAJfrtqK37VFSXJYz65TcUbR8IonZUd6tKtGINwijAsi6LMuaaY3pcGx993YSXTiS2+JpsmOCWAJASGE4E4n9hlFsFlcAmuBtJKLwcjX7LANdzVKRLg0dOxAyYhgjwgZsTGPYUk9uugSfApTcO8bpLcL/Wa2mAjWuAa9H99XDqygxWb+vg/NUp0BCNZQQzGfHNiLlaj166FBw7QaklfhQM+F6BRxZOY/eBx7lyfRbkjKXRgBa1DtiGTiOg7YSVsm7HSkphPTNavuHpziN07VzKiD0PsilGZEgGsDYmk8JuhGEntpy0Tka8rRgoZLhz/lk6F+1n05ZMhYWs8NRkQ4O4hi4niWP/72GjhaivAJ2rLzP99tvYvHUh5B1qYshkwB5Fv6WXIO2gkWso184FbpTZuOEAw8Xx7Nm7CiY0J/93DeC0A0xjWNo/85AxTkfLtnBcNx4rDvLW1gN8fXSQIwfnwPhkzKR6bfZjxoAuJv220e8AIbh1ip07enln9wRO/TYR8ilOpFBuHtnJbegkB7USz/cIwyAZxT5MbDvO29t76HpjCX1990K9U+t52v2SiAFSQJXRJmXMrhgx+64TvPTcd6xdPxulnMqWk95i6DIYTy6BSg7qsTAMUUrV0hsdv8s6b7BgnuKVV++GcU48Xy+fNMTAsBMdpvdR3fM8gjCMJ+szX186QYF1Gz6j5N3CuzuWQktD8l6Q+oxiVwcUSQBRfN8nDCI0ea1aDWC1gTMFaGXnrmMc/2My3x55EhrFna1qdcbXcdpdLl81CrySh+d7sUdOBsU4Tv6+kK7NY2luaSRXlyPf3E2+8QbLV5/k2MHpzJ11DoaCpGOGMXaN55K6qL9YKlIu+hW+Ghp4eW07y1fOpD47laM/nGbJg70svq+bqc0OM289xGsbZ1BSHRA6Nc4k6qqyoSolJH4uyfccUC55WOomjMmw5vk2Ll6axpk/+3AYYtmjYxgYKLJ+Ux8US5Geo9BfgKGQhH4zhhTYNQ9H/Q1iCcv9YDXStW4aVwcf4NChSzy0aCIffHSCtS9M4sOPy9DXBP1AL3B5EEYicF8wKrHQBpjvuNAQK4fVsIptu/q5NryMT/dcgsKvPPVYD/u/dFhwT5YgtPjq+3aoy8SGSx26nbIcdvUHSbtchhGflty/rOhoZ+/209iDh2EgZPH884zNNvHzLwM8+8RN3t/XBFY2CRqIuh+J4aylDkd5gbzT5S2o+3JjoFyuUGcB43Ns2XoHf11sY8+bF2hfYvHTJ0UmtZ6FsqA+MAwwDLKr1kivTcp8oFCOFQdA/zDPrGzhxxND1DdOpePhPLu7Z0K2sfJwVYYeM7ijtqUOohJXadoj1Tx+NQv5PMtfnMOkVpu/e3o4c66OC4cvgjdSS39giC9jwEyj9ERPUKcneUJK11mz4h/2fTECY+fy3utNUC7F476hMwXHUp9HMWB6rj12qb2uZWbk2FwbuZ/W1l4onYFhA0zuCOG5ZsKqJqcpL9bUtGw00QmLeZaknCtS3MTRq4s0QN7/ZmIqksxqOy0r1kFu7oIQXIaI3+5mij5aUjFaBqxLWloul0Nsyf8AO79AcOH6jgQAAAAASUVORK5CYII=)';
    this.style = `html{scroll-behavior: smooth;}.xmplay{font-size:12px}
    .xmplay-link{cursor:pointer}.xmplay-cache{margin-left:126px}
    #xmplay-player{opacity: 0.8; height: 38px; background: rgb(244, 244, 244);}
    .xmplay{border:3px dashed #000;position:fixed;top:1%;background: none;z-index:10000;
    padding:0 10px;border-radius:5px;line-height:30px;height:100%; width:100%}
    #xmplay-step-type{width:50px;display:inline-block; background-color:#7fffd4;
    text-align:center;margin:0 10px;padding:0 10px;line-height:20px}
    #xmplay-cursor{position:absolute;height:32px;width:32px;left:50%;top:50%;
    background-image:${this.cursorUrl64};background-color:red;
    background-repeat:no-repeat;transition:all ${this.stepTimeout / 1000}s;
    transition-timing-function:linear;border-radius:16px;z-index:10001}
  `;

    this.console = {
      log: (text) => {
        console.log(`%c XMPLAY: ${text}`, "color:#fff;background:green;padding:5px;");
      },
      warn: (text) => {
        console.log(`%c XMPLAY: ${text}`, "color:#fff;background:orange;padding:5px;");
      },
      error: (text) => {
        console.log(`%c XMPLAY: ${text}`, "color:#fff;background:red;padding:5px;");
      }
    }

    if (this.whitelist && this.whitelist.length) {
      this.console.warn('[whitelist]' + this.whitelist.toString());
    }else{
      this.console.warn('[whitelist not provided]');
    }
    if (this.blacklist && this.blacklist.length) {
      this.console.warn('[blacklist]' + this.blacklist.toString());
    }else{
      this.console.warn('[blacklist not provided]');
    }


  }


  /***
   * find and remove data from cache
   * show warning if data not found
   * @param url
   */
  getRequestDataByUrl(url) {
    let array = this.replayData.requests;
    this.console.log(`getRequestDataByUrl, size is ${array.length}`);
    let result = null;
    for (let i = 0; i < array.length - 1; i++) {
      let request = array[i];
      if (request.url === url) {
        result = request;
        array.splice(i, 1);
        break;
      }
    }
    return result;
  }

  /***
   * play player handler
   */
  play() {

    this.getByID('play').style.display = "none";
    this.getByID('pause').style.display = "inline-block";
    const cursor = this.getByID('cursor');
    cursor.style.display = `block`;
    this.console.log('[play]');
    this.state = 'play';
    this.interval = setInterval(() => {

      const total = this.replayData.steps.length;
      const step = this.replayData.steps[this.curstep];




      this.console.log(this.curstep);

      this.getByID('step-type').innerText = step ? step.type : this.state;


      if (!step) {
        this.stop();
        return;
      }

      window.scrollTo(step.scroll[0], step.scroll[1]);
      // //todo remove it?
      if (step.xpath && (step.xpath.indexOf('undefined') > -1)) {
        step.xpath = step.xpath.replace('undefined', '/')
      }
      this.console.log(step.xpath);
      const el = this.getElementByXpath(step.xpath);

     // console.table(step);
      this.console.log(`[${step.type}]`);


      let left = step.cursor[0];
      let top = step.cursor[1];

      if (el) {
        let style = window.getComputedStyle(el);
        let width = el.offsetWidth || 100;
        let height = el.offsetHeight || 50;
        left = el.getBoundingClientRect().left + (width / 2);
        top = el.getBoundingClientRect().top + (height / 2);
        if (step.nodeName === 'INPUT') {
          const event = new Event('input', {'bubbles': true});
          el.focus();
          el.value = step.value;
          el.blur();
          el.dispatchEvent(event);
        }
      }

      // blink on click
      cursor.style.backgroundImage = "none";
      setTimeout(() => {
        cursor.style.backgroundImage = this.cursorUrl64;
      }, this.stepTimeout * 0.15);

      setTimeout(() => {


        if (step.type === 'click') {
          if (el && el.click) {
            this.console.log(`[real click ${left}px ${top}px]`);
            el.click();
          } else {
            // left = left + window.scrollX - 32;
            // top = top + window.scrollY - 32;
            this.console.warn(`[emulate click ${left}px ${top}px]`);
            try {
              document.elementFromPoint(left, top).click();
            } catch (e) {
              this.console.error(`[error in document.elementFromPoint click ${left}px ${top}px]`)
            }
          }
        }

      }, this.stepTimeout * 0.9);

      if (left > 0) {
        cursor.style.left = `${left + window.scrollX}px`;
      }
      if (top > 0) {
        cursor.style.top = `${top + window.scrollY}px`;
      }


      // this.console.warn(`[cursor: ${left}px ${top}px]`);

      this.curstep++;
      this.getByID('step-current').innerText = this.curstep;

    }, this.stepTimeout)
  }

  /***
   * pause player handler
   */
  pause() {
    this.console.log('[pause]');
    this.state = 'pause';
    clearInterval(this.interval);
    this.getByID('play').style.display = "inline-block";
    this.getByID('pause').style.display = "none";
  }

  /***
   * stop player handler
   */
  stop() {
    this.console.log('[stop]');
    const cursor = this.getByID('cursor');
    this.state = 'stop';
    clearInterval(this.interval);
    cursor.style.display = `none`;
    this.getByID('play').style.display = "none";
    this.getByID('pause').style.display = "none";
    //this.getByID('reload').style.display = "inline-block";
    this.getByID('step-type').innerText = this.state;
  }

  reload() {
    window.location.href = this.initialUrl;
  }

  /***
   * Capture Event Listeners
   */
  addListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.console.log('[addListeners]');
      window.addEventListener('click', (event, from) => {
        this.addStep(event);
      });

      window.addEventListener('keyup', (event) => {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
          this.addStep(event);
        }, 250);
      });

      window.addEventListener('scroll', (event) => {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
          this.addStep(event);
        }, 250);
      });
    });


    this.wrapXMLHttpRequest();

  }

  /***
   * replay
   */
  replay(returnPromise) {
    this.console.log('[replay  started for cacheId: ' + this.cacheId + ']');

    const errorHandler = (data) => {
      this.console.warn("[replay data not found]");
      alert(`Cant find data to replay for cacheId ${this.cacheId}`)
    };


    const successHandler = (data) => {
      if (data.result && data.result[0]) {
        this.replayData = data.result[0];
        this.console.log("[replay data found]");
      } else {
        errorHandler();
      }
    };

     this.getReplayData().then(successHandler, errorHandler);

  }

  /***
   * returns getReplayData promise
   */
  getReplayData() {
    const data = {
      "cacheId": this.cacheId,
    };
    return this.post(data, `${this.apiUrl}/lookup`);
  }

  /***
   *  getCaptureData interface
   */
  getCaptureData(){
    this.console.error('getCaptureData should be implemented in a custom runner.js')
  }

  /***
   *
   */
  saveData(){
    xmplay.saveData = function () {
      const xmdata = xmplay.getCaptureData();
      if (xmdata.session && xmdata.cacheId && xmdata.account.id) {
        xmplay.post(xmdata);
      } else {
        console.log('XMPLAY: No session data found');
      }
    };
  }

  //todo delete
  // not in use
  /***
   * wait For El
   * waits for 60 seconds and fail if not found
   * build player once found
   */
  waitForEl(selectors){

    let tries = 0;

    this.interval =  setInterval( () => {
      tries++;
      //const el = document.getElementById(id);

      selectors.forEach((selector)=>{
        const el1 = document.getElementsByClassName(selector);
        const el2 = document.getElementById(selector);
        const data  = this.replayData;
        this.console.log(`waitForEl ${selector} , try ${tries}`);

        if((el1 || el2) && data){
          this.console.log(`waitForEl ${selector} found after ${tries}`);
          clearInterval(this.interval);
          this.buildPlayer();
        }
        if(tries>240){
          alert(`Can not find element ${selector}, replay failed.`);
          clearInterval(this.interval);
        }

      })

    },250);
  }

  /**
   * buildPlayer logic
   */
  buildPlayer() {

    this.console.log('[buildPlayer]');
    if(this.state !== 'initial'){
      this.console.warn('[already built]');
      return false;
    }
    const player = document.createElement('div');
    player.innerHTML = this.buildPlayerHTML();

    const cursor = document.createElement('div');
    cursor.setAttribute("id", "xmplay-cursor");

    const css = document.createElement('style');
    css.innerHTML = this.style;

    // add styles for replay
    const icons = document.createElement( 'link' );
    icons.rel  = 'stylesheet';
    icons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';

    this.state = 'built';
    document.head.appendChild(icons);
    document.body.appendChild(css);
    document.body.appendChild(player);
    document.body.appendChild(cursor);

  }

  /***
   * build Player HTML code
   * @returns {string}
   */
  buildPlayerHTML() {
    return `<div class="xmplay">
                        <div  id="xmplay-player">
                        <span class="xmplay-cache">cache:${this.cacheId}</span>
                        <i id="xmplay-play" class="material-icons xmplay-link" onclick="${this.name}.play()" title="Play">play_arrow</i></span>
                        <i id="xmplay-pause" class="material-icons xmplay-link" onclick="${this.name}.pause()" title="Pause" style="display: none;">pause</i>
                        <span>Step</span> <span id="xmplay-step-current">${this.curstep}</span><span>/</span> 
                        <span id="xmplay-step-total">${this.replayData.steps.length}</span>    
                        <span id="xmplay-step-type">ready</span>    
                        <i id="xmplay-reload" class="material-icons xmplay-link" onclick="${this.name}.reload()" title="Reload">autorenew</i>
                        <i class="material-icons xmplay-link" onclick="${this.name}.goToPlay()" title="Back to XM360 Play">exit_to_app</i>
                        </div>
   
              </div>`
  }

  /***
   * get Element by ID
   * @param id
   * @returns {HTMLElement}
   */
  getByID(id) {
    return document.getElementById(`${this.name}-${id}`);
  }


  /***
   * mask sensitive data
   * @param txt
   */
  mask(txt){
    txt ? txt.replace(/\d/g, '1') : '';
  }


  /***
   * Add ui step
   * @param event
   */
  addStep(event) {
    let step = {}, posX, posY, xpath = this.getXpathByElement(event.target), value = event.target.value,
      scrollX = window.scrollX, scrollY = window.scrollY, nodeName = event.target.nodeName;

    //dataset.columns

    if (event.clientX || event.clientY) {
      posX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      this.lastX = posX;
      this.lastY = posY;
    } else {
      posX = this.lastX;
      posY = this.lastY;
    }

    /** https://modesto.atlassian.net/browse/FETE-219
     * <button  data-xmplay="save">End session</button>
     <input data-xmplay="masked" name="ssn"/>
     <button  data-xmplay="ignore">Should not be replayed</button>
     <span data-xmplay="domready"></span>
     */
    //this.console.log(xpath);
    // console.log(1);
    // console.log(event.target);
    // console.log(2);
    // console.log(event.target.parentNode);
    // console.log(3);
    // console.log(event.target.parentNode.parentNode);
    //console.log(event.target.dataset);
    step.type = event.type;
    step.nodeName = nodeName;
    step.xpath = xpath;
    step.value = value;
    step.scroll = [scrollX, scrollY];
    step.cursor = [posX, posY];

    //console.table(step);
    this.console.log(`[${step.type}]`);

    this.steps.push(step);
  }


  /*
   Catch the XMLHttpRequest in plain JavaScript

   Initially references to original open() and send() are saved.
   Later new methods for XMLHttpRequest are defined: openReplacement() and sendReplacement(),
   which will execute the custom code and then call the  original methods using Function.apply().
   In the end, the new methods are assigned to XMLHttpRequest.prototype.
   Because the class prototype is modified, any new instances of the XMLHttpRequest will use the custom methods.
   Notice that the override snippet should be applied before starting any XHR requests.
   */
  wrapXMLHttpRequest() {


    const open = window.XMLHttpRequest.prototype.open,
      send = window.XMLHttpRequest.prototype.send;

    let requestsArr = this.requests;
    let curRequest = this.curRequest;


    function openReplacement(method, url, async, user, password) {
      this._start = +new Date();
      this._url = url;
      this._method = method;
      this._idx = curRequest;
      this._isWhiteListed = xmplay.isWhiteListed(url);

      if (this._isWhiteListed) {
        //xmplay.console.log('[wrapXMLHttpRequest::WhiteListed]', this._url);
        curRequest++;
      } else {
        // xmplay.console.log('[wrapXMLHttpRequest::BlackListed]', this._url);
      }

      // console.log('open idx' , this._idx)
      return open.apply(this, arguments);

    }

    function sendReplacement(data) {
      //console.log('[wrapXMLHttpRequest::send]');
      this._body = data;
      // console.log('sendReplacement idx' , this._idx)

      if (this.onreadystatechange) {
        this._onreadystatechange = this.onreadystatechange;
      }
      /**
       * PLACE HERE YOUR CODE WHEN REQUEST IS SENT
       */
      this.onreadystatechange = onReadyStateChangeReplacement;
      return send.apply(this, arguments);
    }

    function onReadyStateChangeReplacement() {
      // console.log('[wrapXMLHttpRequest::onReadyStateChange]');
      // console.log(arguments);
      if (this.readyState === 4) {
        if (this._isWhiteListed) {
          requestsArr[this._idx] = {
            start: this._start,
            end: +new Date(),
            duration: +new Date() - this._start,
            url: this._url,
            method: this._method,
            body: this._body,
            status: this.status,
            size: this.responseText.length,
            responseText: this.responseText
          };
          xmplay.console.log(`[wrapXMLHttpRequest::finished #${this._idx} ]`);
          //console.table(requestsArr);
        }
      }

      if (this._onreadystatechange) {
        return this._onreadystatechange.apply(this, arguments);
      }
    }

    window.XMLHttpRequest.prototype.open = openReplacement;
    window.XMLHttpRequest.prototype.send = sendReplacement;

  }

  /***
   * isWhiteListed
   * @param url
   * @returns {boolean}
   * @description  check if domain is  whitelisted to capture
   */
  isWhiteListed(url) {

    let _isWhiteListed = false;
    let _isBlackListed = true;
    //if whitelist found - check
    if (this.whitelist && this.whitelist.length) {
      for (let k in this.whitelist) {
        let domain = this.whitelist[k];
       _isWhiteListed = url.indexOf(domain) > -1;
        if (_isWhiteListed) {
          break;
        }
      }
    }else{
      _isWhiteListed = true;
    }

    if(_isWhiteListed){
      //if blacklist found - check
      if (this.blacklist && this.blacklist.length) {
        for (let k in this.blacklist) {
          let domain = this.blacklist[k];
          _isBlackListed = url.indexOf(domain) > -1;

          if (_isBlackListed) {
            break;
          }
        }
      }else{
        _isBlackListed = false;
      }
    }

    if(_isWhiteListed && !_isBlackListed){
     // this.console.log('_isWhiteListed' + url);
    }else{
     // this.console.error('_isBlackListed' + url);
    }

    return _isWhiteListed && !_isBlackListed;
  }


  /***
   *  native ajax Post Call
   *  NOTE async mode is false
   * @param data
   * @param apiUrl
   * @returns {Promise<any>}
   */
  post(data, apiUrl = this.apiUrl) {

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", apiUrl, false);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            xmplay.console.log('[post::fulfilled]');
            resolve(JSON.parse(xhr.responseText));
          } else {
            xmplay.console.warn('[post::rejected]');
            reject(JSON.parse(xhr.responseText));
          }
        } else {
          xmplay.console.log('[post::pending]');
        }
      };
      xmplay.console.log('[post::sent]');
    });
  }


  /***
   *  Recursively get Xpath By Element
   * @param element
   * @returns {string}
   * @description  https://developer.mozilla.org/en-US/docs/Web/API/Node/
   */
  getXpathByElement(element) {
    //console.log('getXpathByElement');

    if (!!element.id) {
      return `id("${element.id}")`;
    }
    if (element === document.body) {
      return `//${element.tagName}`;
    }
    let ix = 0;
    let siblings = element.parentNode ? element.parentNode.childNodes : [];
    for (let i = 0; i < siblings.length; i++) {
      let sibling = siblings[i];
      // looking for element index
      if (sibling === element) {
        return `${this.getXpathByElement(element.parentNode)}/${element.tagName}[${ix + 1}]`;
      }
      // looking for siblings
      if ((sibling.nodeType === 1) && (sibling.tagName === element.tagName)) {
        ix++;
      }
    }
  }

  /***
   * get Element By Xpath
   * @param path
   * @returns {Node}
   */
  getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }


  /***
   * getUrlParam helper
   * @param param
   * @returns {string}
   */
  getUrlParam(param) {
    return new URL(window.location.href).searchParams.get(param);
  }

  /***
   * going back to play site
   */
  goToPlay() {
    window.location.href = this.selfUrl;
  }

}



