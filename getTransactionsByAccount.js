/*
그렇다면 해당 주소로부터 생성된 트랜잭션, 혹은 해당 주소가 송금받은 트랜잭션 기록은 어떻게 확인할 수 있을까요? 이번 시간에는 페어와 함께 특정 주소의 거래내역을 확인하는 함수 getTransaciontsByAccount()를 구현합니다.

getTransactionsByAccount() 함수는 다음의 기능을 가지고 있습니다.

계정 주소값과 블록 범위(ex. 11,300,000번째 블록부터 11,400,000번째 블록까지, 제네시스 블록부터 가장 최근 블록까지)를 입력하면 해당 블록 범위에 있는 블록에 기록된 트랜잭션 중 해당 계정이 참여한 트랜잭션만 추출합니다.
인자로 주소값 account와 블록 숫자로 이루어진 블록 범위값 startBlock, endBlock 을 인자로 가집니다.
해당 블록 범위 내에 송신 또는 수신자로 참여한 트랜잭션들로 구성된 배열을 반환합니다.
*/

// web3 require
Web3 = require("web3");
// ropstenNetwork node URL
const rpcURL = "";
// web3 객체 생성
const web3 = new Web3(rpcURL);
// 검색할 계정 변수에 할당
const myAccount = "0xC42F3aE510DDDa65a704189DD82403d4b44Ad4Dd";

// block, account, trx 등 블록체인 네트워크에서 정보를 가져오는 모든 함수는 비동기이기 때문에 async await이나 .then 과정을 반드시!! 거쳐야한다.
// 원래 그냥 console로만 찍어내려면 .then으로 해도 상관없지만, 위 요구사항 충족을 위해 배열을 반환하려면 async await을 사용하는것이 편리한 것 같다.
async function getTransactionsByAccount(account, startBlock, endBlock) {
  // 카운트 변수 선언
  let cnt = 0;
  // 결과를 담아줄 배열
  let result = [];
  // i는 startBlock에서부터 endBlock을 포함하는 범위로 지정한다.
  for (let i = startBlock; i <= endBlock; i++) {
    // web3.eth.getBlock 함수를 통해서 가져온 i번 블록을 this블록으로 지정한다. awiat 필수!!
    // 아래 getBlock함수에서 뒤에 boolean parameter는 default값이 false이다.
    // false로 할 경우에는 thisBlock.transactions value 값에 트랜잭션 해쉬만 들어있기 때문에 true로 변경해주어야 트랜잭션에 account가 기여했는지 알 수 있다.
    let thisBlock = await web3.eth.getBlock(i, true);
    // 가져온 블록정보에서 트랜잭션 정보로 들어간 후, 모든 트랜잭션 중 from이나 to에 parameter로 받은 account가 설정되어있는지 판단한다.
    // 들어있다면, 식별하기 위한 cnt와 함께 blockHash, blockNumber, trxHash등만 넣어준다.(정보를 다 넣으면 너무 파일이 커지고 딜레이가 생긴다.)
    thisBlock.transactions.forEach((el) => {
      if (el.from === account || el.to === account) {
        cnt++;
        result.push([
          `no.${cnt}`,
          `blockHash : ${el.blockHash}`,
          `blockNumber : ${el.blockNumber}`,
          `trxHash : ${el.hash}`,
        ]);
      }
    });
  }
  return result;
}

// 함수를 실행하고 돌릴 때도 .then을 이용해주어야 한다. 그렇지 않으면 pending 상태의 배열이 반환된다.
getTransactionsByAccount(myAccount, 12297829, 12297845).then(console.log);

// 참고 : https://ethereum.stackexchange.com/questions/2531/common-useful-javascript-snippets-for-geth/3478#3478
