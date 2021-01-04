const crypto = require('crypto')
const axios = require('axios')
const WebSocket = require('ws')

const API_SERVER = 'https://api.thodex.com/';
const SOCKET_SERVER = 'wss://wspub.thodex.com:443';
const SOCKET_SUBSCRIBE_TYPES = ['deals', 'price', 'state'];
const REQUEST_TIMEOUT = 30;

/**
 * @param {string} api_key
 * @param {string} api_secret
 * @constructor
 */
function Thodex(api_key = null, api_secret= null){
    this.init(api_key, api_secret);
}

Thodex.prototype.init = (api_key, api_secret) => {
    this.req = Thodex.prototype;
    this.result = '';
    this.api_key = api_key;
    this.api_secret = api_secret;
    this.api_server = API_SERVER;
    this.REQUEST_TIMEOUT = REQUEST_TIMEOUT;
}

/**
 * @return JSON
 */

Thodex.prototype.serverTime = () => {
    return new Promise((resolve, reject) => {
        resolve(this.req.execute({
            'url' : 'v1/public/time'
        }))
    })
}

/**
 * @returns JSON
 */
Thodex.prototype.markets = () => {
    return new Promise((resolve, reject) => {
        resolve(this.req.execute({
            'url' : 'v1/public/markets'
        }))
    })
}

/**
 * @param {string} market
 * @returns JSON
 */
Thodex.prototype.marketStatus = (market='') => {
    let params = {}
    if(market != '')
        params['market'] = market

    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/public/market-status',
                'params': params
            })
        )
    })
}

/**
 * @returns JSON
 */
Thodex.prototype.marketSummary = () => {
    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/public/market-summary',
            })
        )
    })
}

/**
 * @param {string} market
 * @param {number} last_id
 * @returns JSON
 */
Thodex.prototype.marketHistory = (market, last_id = 0) => {
    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/public/market-history',
                'params': {
                    'market': market,
                    'last_id': last_id
                }
            })
        )
    })
}

/**
 * @param {string} market
 * @param {int} limit // optional
 */
Thodex.prototype.orderDepth = (market, limit = 0) => {
    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/public/order-depth',
                'params': {
                    'market': market,
                    'limit': limit
                }
            })
        )
    })
}

/**
 * @param {string} market
 * @param {number} offset // optional
 * @param {number} limit // optional
 */
Thodex.prototype.getOpenOrders = (market, offset=0, limit=0) => {
    return new Promise((resolve, reject) => {
        resolve(this.req.execute({
            'url': 'v1/market/open-orders',
            'params': {
                'market': market,
            }
        }, true))
    })
}

/**
 * @param {number} order_id
 */
Thodex.prototype.getFinishedOrders = (order_id=0) => {
    return new Promise((resolve, reject) => {
        resolve(this.req.execute({
            'url': 'v1/market/order-finished-info',
            'params': {
                'order_id': order_id,
            }
        }, true))
    })
}

/**
 * @param market
 * @param offset
 * @param limit
 */
Thodex.prototype.getOrderHistory = (market, offset= 0, limit = 0) => {
    params = { 'market': market }
    if(offset > 0)
        params['offset'] = offset
    if(limit > 0)
        params['limit'] = limit


    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/market/order-history',
                'params': params
            }, true)
        )
    })
}

/**
 * @param {string} market
 * @param {number} price | float
 * @param {number} amount | float
 */
Thodex.prototype.buyLimit = (market, price, amount) => {
    // @param float $amount must be STOCK
    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/market/buy-limit',
                'params': {
                    'market': market,
                    'price': price,
                    'amount': amount
                }
            }, true, true)
        )
    })
}

Thodex.prototype.buyMarket = (market, amount) => {
    // @param float $amount must be MONEY
    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/market/buy',
                'params': {
                    'market': market,
                    'amount': amount
                }
            }, true, true)
        )
    })
}

Thodex.prototype.sellLimit = (market, price, amount) => {
    // @param float $amount must be STOCK
    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/market/sell-limit',
                'params': {
                    'market': market,
                    'price': price,
                    'amount': amount
                }
            }, true, true)
        )
    })
}

Thodex.prototype.sellMarket = (market, amount) => {
    // @param float $amount must be STOCK
    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/market/sell',
                'params': {
                    'market': market,
                    'amount': amount
                }
            }, true, true)
        )
    })
}

Thodex.prototype.cancelOrder = (market, order_id = 0) => {
    // @param float $amount must be STOCK
    return new Promise((resolve) => {
        resolve(
            this.req.execute({
                'url': 'v1/market/cancel',
                'params': {
                    'market': market,
                    'order_id': order_id
                }
            }, true, true)
        )
    })
}


/**
 * @param {string} assets
 */
Thodex.prototype.getBalance = (assets='') => {
    let params = {}
    if(assets != '')
        params['assets'] = assets.replace(/\s/g, '')

    return new Promise((resolve, reject) => {
        resolve(
            this.req.execute({
                'url': 'v1/account/balance',
                'params': params
            }, true)
        )
    })
}


Thodex.prototype.execute = async (request, auth = false, post = false) => {
    let rq
    let headers = { 'cache-control': 'no-cache' }
    if(auth){
        request.params['apikey'] = this.api_key;
        request.params['tonce']  = Math.round(Date.now()/1000);
        headers['Authorization'] = this.req.encode(request.params)
    }

    let requestUrl = this.api_server + request.url;
    if(typeof request.params != 'undefined')
        requestUrl += '?' + this.req.httpBuildQuery(request.params);
    if(typeof request.params != 'undefined')
        if(typeof request.params['secret'] != 'undefined')
            delete request.params['secret'];

    if(post) {
        rq = await axios({
            method: 'post',
            url: requestUrl,
            headers: headers,
            data: request.params,
            responseType: 'json'
        });
    }else {
        rq = await axios({
            headers: headers,
            method: 'get',
            url: requestUrl,
            responseType: 'json'
        })
    }

    if(typeof rq.data != "undefined")
        return rq.data
}


/**
 * @param {object} params
 * @returns string
 */
Thodex.prototype.encode = (params) => {
    sortObject = (o) =>{
        var sorted = {}, key, a = [];
        for (key in o) { if (o.hasOwnProperty(key)) { a.push(key); } }
        a.sort();
        for (key = 0; key < a.length; key++) { sorted[a[key]] = o[a[key]]; }
        return sorted;
    }
    params = sortObject(params);
    params['secret'] = this.api_secret;
    query = this.req.httpBuildQuery(params)
    return crypto.createHash('sha256').update(query).digest('hex');
}

/**
 * @param {object} params
 * @returns {string}
 */
Thodex.prototype.httpBuildQuery = (params) => {
    build2 = new URLSearchParams(params)
    return build2.toString()
}


const ThodexSocket = (markets, message_callback, subscribes = SOCKET_SUBSCRIBE_TYPES,
                      reconnectOptions = { active: true, everySeconds:10 }) => {
    let reconnect;
        connect = () => {
            const ws = new WebSocket(SOCKET_SERVER);
            ws.onopen = () => {
                clearInterval(reconnect)
                let params = {method:"state.unsubscribe",params:[],id:1}
                ws.send(JSON.stringify(params))


                subscribes.forEach((e) => {
                    ws.send(JSON.stringify({
                        'method': e + ".subscribe",
                        'params': markets,
                        "id":1
                    }))
                })
            };

            ws.onmessage = (data) => {
                if(typeof data.data == 'undefined')
                    return
                let response = JSON.parse(data.data);
                if(typeof response['method'] != 'undefined'){
                    response['method'] = response['method'].split(".")[0]
                    if(typeof message_callback == 'function')
                        message_callback(response);
                }
            };

            ws.onerror = (event) => console.log(event)
            ws.onclose = (data) => {
                console.log(data.code)
                if(reconnectOptions['active'] == true)
                    reconnect = setInterval(connect, reconnectOptions['everySeconds'] * 1000);
            }
        }
    connect()
}

module.exports.Thodex = Thodex;
module.exports.ThodexSocket = ThodexSocket;
