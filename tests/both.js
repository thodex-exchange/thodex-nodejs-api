const {Thodex, ThodexSocket} = require('../index')

thdx = new Thodex("apikey", 'apisecret');

thdx.serverTime()
    .then((result) => {
        console.log("Server Time\n==============")
        console.log(result)
    }).catch((e) => {
    console.log(e.response.data)
})

ThodexSocket(['BTCTRY', 'ETHTRY', 'LTCTRY'], socketMessageCallbackFunction);
function socketMessageCallbackFunction(data) {
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
