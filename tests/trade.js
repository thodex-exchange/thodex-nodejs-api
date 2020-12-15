const {Thodex} = require('../index')

thdx = new Thodex("Cl0IFBttE1LPRoK6dz40TLgzM7KfTllvds6Kaq7b4xISyyz0pVfL0sXB1gNQC8BM", 'mKKC9YUCCSvhbgAmPm66xDgw24cfdV5ifzTIV4sv51OYQfutvXkoUnW8xlj0XDS5');

thdx.serverTime()
    .then((result) => {
        console.log("Server Time\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

/*
thdx.getBalance('USDT')
    .then((result) => {
        console.log("Balance\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.markets()
    .then((result) => {
        console.log("Markets\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.marketStatus('BTCTRY')
    .then((result) => {
        console.log("marketStatus\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.marketSummary()
    .then((result) => {
        console.log("marketSummary\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.marketHistory('BTCTRY')
    .then((result) => {
        console.log("marketHistory\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.orderDepth('BTCTRY', 10)
    .then((result) => {
        console.log("orderDepth\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.getOpenOrders('BTCTRY', 0, 10)
    .then((result) => {
        console.log("getOpenOrders\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.getOrderHistory('BTCTRY', 0, 0)
    .then((result) => {
        console.log("getOrderHistory\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.buyLimit('BTCTRY', 10000, 1)
    .then((result) => {
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.sellLimit('BTCTRY', 1, 5)
    .then((result) => {
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

thdx.cancelOrder('BTCTRY', 1)
    .then((result) => {
        console.log("Cancel Order\n==============")
        console.log(result)
    }).catch((e) => {
        console.log(e.response.data)
    })

 */
