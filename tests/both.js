const {Thodex, ThodexSocket} = require('../index')

thdx = new Thodex("Cl0IFBttE1LPRoK6dz40TLgzM7KfTllvds6Kaq7b4xISyyz0pVfL0sXB1gNQC8BM", 'mKKC9YUCCSvhbgAmPm66xDgw24cfdV5ifzTIV4sv51OYQfutvXkoUnW8xlj0XDS5');

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
