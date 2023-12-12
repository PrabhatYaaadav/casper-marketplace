import { sleep } from "../utils";
import { TestConfig } from "../packages/configure"
import { MarketTester } from "../packages/market"
import { NFTTester } from "../packages/nft"

const runTests = async () => {
  const config = new TestConfig(".env.test.nctl");
    
  await config.setup();
  
  await sleep(1 * 1000);
  
  const nftTester = new NFTTester(config);
  const marketTester = new MarketTester(config);
  
  const userKeys = config.userKeys;
  const token_id = config.token_id;
  const listing_price = config.listing_price;
  
  /* await nftTester.contractInfo();
  await sleep(1 * 1000);  */
  /* await nftTester.mint(userKeys[1], token_id);
  await sleep(1 * 1000); */
  /* await nftTester.approveContractForTransfer(userKeys[1], token_id);
  await sleep(1 * 1000);  */
  await marketTester.ownerOf("0");
  await sleep(1 * 1000)
  try{await marketTester.listForSale(userKeys[1], token_id, listing_price);}catch(e){console.log(e)} 
  await sleep(1 * 1000); 
  try{await marketTester.buyListing(userKeys[6], token_id, listing_price, false, userKeys[1]);}catch(e){console.log(e)}
  //await sleep(1 * 1000);
  /* await marketTester.listForSale(userKeys[1], token_id, listing_price);
  await sleep(1 * 1000);
  try{await marketTester.cancelListing(userKeys[1], token_id);}catch(e){console.log(e)};
  await sleep(1 * 1000);
  try{await marketTester.buyListing(userKeys[6], token_id, listing_price, userKeys[1]);}catch(e){console.log(e)} // listing was cancled
  await sleep(1 * 1000);
  try{await marketTester.listForSale(userKeys[3], token_id, listing_price);}catch(e){console.log(e)} // not owner
  await sleep(1 * 1000);
  await marketTester.listForSale(userKeys[1], token_id, listing_price);
  await sleep(1 * 1000);
  try{await marketTester.cancelListing(userKeys[3], token_id);}catch(e){console.log(e)}; // not owner
  await sleep(1 * 1000);
  try{await marketTester.buyListing(userKeys[6], token_id, listing_price, userKeys[1]);}catch(e){console.log(e)}  */
 
  console.log('done!')
};

runTests();


//NFT ... Contract Hash: hash-28e99209831ea0769647c73234ed4f403199df180f4a8f4ce021ecadc791bdd2
//NFT ... Contract Package Hash: hash-77c37b5cee761a861a49a3c5b2d37faaf1f245b7a90adff99bfbf03ba8682064

//Market Contract Hash: hash-93e86589e39c5bc36d07ac8d57e9334e22e9382740e99ce675346396e3f2ffc1
//Market Contract Package Hash: hash-21a65321c613b80799dee69233dc1e5faef1cdcec1e0fd4ec3aa50841f2d3e84

//M contract Hash : hash-05bfa3c81f193a21faf478e4097a603e68f82d51491b7a0ab4548d2f517b6755
//M contract package Hash : hash-7e0433aad28a2e93cd8d68031b38d0c6802a4bb96fe8ebcbc0d3ddac689cc2e9

//hash : hash-3b99f5ec8537069c79c3c76e9b1aedcdb46e8b05e9503d946458e89a0dc79fb2
//package hash : hash-93c2d7839bee49e02832c5c6afc8c7b0fc6a81c7f916e5c815d16b9f364a0990




/* {
      "name": "market_contract_hash",
      "key": "hash-521d5ed54605ba742696153d1fc2dc1139bf217189f33bcbc3428450c2af77a8"
    }, */

/* {
      "name": "market_contract_package_hash",
      "key": "hash-dd12755efd07ebf8e9b94c9c5db3c51c4c1a96f372a70cf57cef7259c89660e3"
    }, */



/* {
  "name": "market_contract_hash",
  "key": "hash-2f5502cca2f94c2ee37de60f475495120307ac72078418c3c02ec2ebcee8efe3"
}, */

/* {
  "name": "market_contract_package_hash",
  "key": "hash-c817ce42e6b2bc9b63cb26c9ef03bb35cd77af6034db805fc8724f2c5ae22140"
}, */