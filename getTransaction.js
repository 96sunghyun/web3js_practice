const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/e143857ba53e44438767f86317915892";

const web3 = new Web3(rpcURL);

const txId =
  "0x752d77b80c9baa42d17459c3048cfeec6e0bc7b5d06332ece6f97ec6f0d89d1b";

/* pending 상태인 trx 가져오기
// web3.eth.getPendingTransactions().then((obj) => console.log(obj));
// 위 코드로 실행이 되지 않아 아래 코드에서 block 정보를 가져온 후, "pending" 상태인 trx만 출력하였다.

web3.eth.getBlock("pending", (err, block) => {
  let pl = block.transactions;
  if (pl.length > 0) {
    console.log(pl);
    console.log("Successful get pending TRXs!");
  }
});
*/

const blockNum = "11479475";
/*
// 블록 정보를 가져오는 함수
web3.eth.getBlock(blockNum).then(console.log);
*/

web3.eth.getTransactionFromBlock(blockNum, 3).then(console.log);
