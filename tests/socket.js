const {ThodexSocket} = require('../index')

markets = ['BTCTRY', 'ETHTRY', 'LTCTRY', 'HOTTRY']  // required.
subscribes = ['deals', 'price', 'state']     // optional. default value : ['deals', 'price', 'state']
reconnectOptions = {    // optional. default value : { active:true, everySeconds=10 }
    active: true,
    everySeconds:15     // When the connection is closed, try to reconnect every 15 seconds.
}

ThodexSocket(markets, callbackFunction, subscribes, reconnectOptions);

function callbackFunction(data) {
    if(data.method == 'state') {
        console.log("\n\nSocket State Data")
        console.log(data.params)
    }else if(data.method == 'price') {
        console.log("\n\nSocket Price Data")
        console.log(data.params)
    }else if(data.method == 'deals') {
        console.log("\n\nSocket Deals Data")
        console.log(data.params)
    }
}
