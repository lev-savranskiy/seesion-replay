# XM360-play project

##  Mongo DB
### Windows / Mac
install DB

https://docs.mongodb.com/manual/installation/

https://docs.mongodb.com/v3.2/administration/install-community/

use GUI to query data

https://www.guru99.com/top-20-mongodb-tools.html

Run `"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"`


### UNIX

`service mongod status`

`service mongod start`

`service mongod stop`

use CLI to query data

    > mongo

    > use  xm360-play
    
    > db.plays.find({}).sort({startTime:-1}).limit(100)



---

##  Application

#### Run local dev

`npm install`

`npm run build`

`npm run start`

#### Deploy prod (UNIX)
* get UNIX access using https://cada.comcast.net/
* if you are using Windows, install dos2unix `yum install dos2unix`
* pack files to  play.zip on your machine (exclude node_nodules)
* for windows just run `zip.bat`
* connect to sandbox `careui-ch2-a3d.sys.comcast.net`
* access management at https://cada.comcast.net/
* upload  xm360-play.zip to /home/{user}/
z
_examples for user lsavra472_

`rm -rf /home/lsavra472/xm360-play`

`unzip /home/lsavra472/xm360-play.zip -d /home/lsavra472/xm360-play`

`cd /home/lsavra472/xm360-play && npm install`

copy app to www folder as sudo

`sudo -i`

`rm -rf /var/www/xm360-play/`

`mv /home/lsavra472/xm360-play /var/www/`

---
#### Navigate no app directory

`cd /var/www/xm360-play`

---

#### Run app CLI

if server path is not `/` then pass path to node process 

example `https://ax-sandbox.xmobiletest.com/xm360-play/`

`node ./bin/www.js /xm360-play`

##### Stop 
 ctrl+c

---

#### Run app via forever


`forever start --minUptime 1000 --spinSleepTime 1000 ./bin/www.js /xm360-play`


##### Stop 

_Check list of forever processes, find pid, and stop it_

`forever list`

`forever stop <pid>`

---

### URL  

* local
http://localhost:3000/
* sandbox
https://ax-sandbox.xmobiletest.com/xm360-play/

---

### API
###### Search caches

_POST /api/lookup_

BODY (query)

`{"agent.id":"lsavra472","account.id":"852016250608012019Comcast.RTVE","cacheId":"1549554391241","session":"dcf71f7f-1ecd-4264-9904-8fc820e0e12f"}
`
###### List of caches

_GET /api_


`[
{
    "steps": [
        {
            "type": "click",
            "target": "//*[@id=\"careDevices\"]",
            "scrollX": "0",
            "scrollY": "0"
        },
        {
            "type": "focusout",
            "target": "//*[@id=\"xmBody\"]/my-app/main/div[2]/my-care-landing-page/my-billing-payments/my-billing-payments-summary/div[2]/div[2]/div[2]/div/div[2]/a",
            "scrollX": "0",
            "scrollY": "0"
        },
        {
            "type": "http",
            "url": "https://mbo-agentgateway-2-ci.codebig2.net/cart/",
            "method": "GET",
            "response": {
                "id": "9dd9980f-8967-4d00-aa0e-7dd083a151cd",
                "type": "SALES",
                "contactEmail": null,
                "contactNumber": null,
                "shippingAddress": {
                    "firstName": "PROSACCO",
                    "lastName": "LUCIENNE",
                    "address": {
                        "address1": "1717   ARCH ST",
                        "address2": "APT 99135",
                        "city": "PHILADELPHIA",
                        "country": null,
                        "state": "PA",
                        "zip": "19103"
                    }
                },
                "shippingMethod": null,
                "price": {
                    "monthlyRecurringCharge": 57,
                    "monthlyRecurringTax": 2.46,
                    "oneTimeCharge": 634.94,
                    "oneTimeTax": 50.8
                }
            }
        },
        {
            "type": "scroll",
            "scrollX": "0",
            "scrollY": "300"
        }
    ],
    "_id": "5c5c89d89b17b357e4784486",
    "session": "dcf71f7f-1ecd-4264-9904-8fc820e0e12f",
    "cacheId": "1549554391241",
    "account": {
        "id": "852016250608012019Comcast.RTVE"
    },
    "agent": {
        "id": "lsavra472"
    },
    "url": "https://xmagent.xmobiletest.com/ci/",
    "xm_version": "19.2",
    "time_started": "2019-02-07T16:23:10.000Z",
    "time_finished": "2019-02-07T19:41:12.759Z",
    "__v": 0
}
]`
##### Add cache
 
 _POST /api_

BODY

`{
     "steps": [
         {
             "type": "click",
             "target": "//*[@id=\"careDevices\"]",
             "scrollX": "0",
             "scrollY": "0"
         },
         {
             "type": "focusout",
             "target": "//*[@id=\"xmBody\"]/my-app/main/div[2]/my-care-landing-page/my-billing-payments/my-billing-payments-summary/div[2]/div[2]/div[2]/div/div[2]/a",
             "scrollX": "0",
             "scrollY": "0"
         },
         {
             "type": "http",
             "url": "https://mbo-agentgateway-2-ci.codebig2.net/cart/",
             "method": "GET",
             "response": {
                 "id": "9dd9980f-8967-4d00-aa0e-7dd083a151cd",
                 "type": "SALES",
                 "contactEmail": null,
                 "contactNumber": null,
                 "shippingAddress": {
                     "firstName": "PROSACCO",
                     "lastName": "LUCIENNE",
                     "address": {
                         "address1": "1717   ARCH ST",
                         "address2": "APT 99135",
                         "city": "PHILADELPHIA",
                         "country": null,
                         "state": "PA",
                         "zip": "19103"
                     }
                 },
                 "shippingMethod": null,
                 "price": {
                     "monthlyRecurringCharge": 57,
                     "monthlyRecurringTax": 2.46,
                     "oneTimeCharge": 634.94,
                     "oneTimeTax": 50.8
                 }
             }
         },
         {
             "type": "scroll",
             "scrollX": "0",
             "scrollY": "300"
         }
     ],
     "_id": "5c5c89d89b17b357e4784486",
     "session": "dcf71f7f-1ecd-4264-9904-8fc820e0e12f",
     "cacheId": "1549554391241",
     "account": {
         "id": "852016250608012019Comcast.RTVE"
     },
     "agent": {
         "id": "lsavra472"
     },
     "url": "https://xmagent.xmobiletest.com/ci/",
     "xm_version": "19.2",
     "time_started": "2019-02-07T16:23:10.000Z",
     "time_finished": "2019-02-07T19:41:12.759Z",
     "__v": 0
 }
 `

## nginx

copy conf file on server 

`cp /home/{user}/xm360-play/unix/nginx.conf /etc/nginx/`

_example_

`cp /home/lsavra472/xm360-play/unix/nginx.conf /etc/nginx/`

restart

`sudo systemctl  restart nginx`



