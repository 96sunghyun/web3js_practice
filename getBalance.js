const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/e143857ba53e44438767f86317915892";

const web3 = new Web3(rpcURL);

const account = "0xC42F3aE510DDDa65a704189DD82403d4b44Ad4Dd";

web3.eth
  .getBalance(account)
  .then((bal) => {
    console.log(`지갑 ${account}의 잔액은... ${bal} 입니다.`);
    return web3.utils.fromWei(bal, "ether");
  })
  .then((eth) => console.log(`이더 단위로는 ${eth} 입니다.`));
