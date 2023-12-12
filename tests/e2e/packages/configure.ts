import { config } from "dotenv";
import { CEP78Client } from "casper-cep78-js-client";
import { sleep, getAccountInfo, getAccountNamedKeyValue } from "../utils";
import { PaymentClient } from "../payment/payment_client";

import {
  Contracts,
  CasperClient,
  Keys
} from "casper-js-sdk";

const { Contract } = Contracts;

export class TestConfig {
  nftMasterKeys: Keys.AsymmetricKey;
  marketMasterKeys: Keys.AsymmetricKey;
  userKeys: (Keys.AsymmetricKey | any)[];
  cep78: CEP78Client;
  casperClient: CasperClient;
  contractClient: Contracts.Contract;
  paymentClient: PaymentClient;
  nftContractHash: string;
  nftContractPackageHash: string;
  marketContractHash: string;
  marketContractPackageHash: string;
  nodeAddress: string;
  eventSteamAddress: string;
  nftContractName: string;
  marketContractName: string;
  token_id: string;
  listing_price: string;
  offer_amount: string;

  constructor(
    public configPath: string
  ) {
    config({ path: this.configPath });

    const {
      NODE_ADDRESS,
      EVENT_STREAM_ADDRESS,
      CHAIN_NAME,
      MARKET_MASTER_KEY_PAIR_PATH,
      MARKET_CONTRACT_NAME,
      NFT_MASTER_KEY_PAIR_PATH,
      NFT_CONTRACT_NAME,
      NFT_TOKEN_ID,
      NFT_LISTING_PRICE,
      NFT_OFFER_AMOUNT,
      USER_1_KEY_PAIR_PATH,
      USER_2_KEY_PAIR_PATH,
      USER_3_KEY_PAIR_PATH,
      USER_4_KEY_PAIR_PATH,
      USER_5_KEY_PAIR_PATH,
      USER_6_KEY_PAIR_PATH,
      USER_7_KEY_PAIR_PATH,
      USER_8_KEY_PAIR_PATH,
      USER_9_KEY_PAIR_PATH,
      USER_10_KEY_PAIR_PATH
    } = process.env;

    // emptry 1st path so we can index keys from 1
    const userKeyPaths = [null, USER_1_KEY_PAIR_PATH!, USER_2_KEY_PAIR_PATH!, USER_3_KEY_PAIR_PATH!, USER_4_KEY_PAIR_PATH!,
      USER_5_KEY_PAIR_PATH!, USER_6_KEY_PAIR_PATH!, USER_7_KEY_PAIR_PATH!, USER_8_KEY_PAIR_PATH!,
      USER_9_KEY_PAIR_PATH!, USER_10_KEY_PAIR_PATH!];

    this.nftMasterKeys = Keys.Ed25519.parseKeyFiles(
      `${NFT_MASTER_KEY_PAIR_PATH!}/public_key.pem`,
      `${NFT_MASTER_KEY_PAIR_PATH!}/secret_key.pem`
    );

    this.marketMasterKeys = Keys.Ed25519.parseKeyFiles(
      `${MARKET_MASTER_KEY_PAIR_PATH!}/public_key.pem`,
      `${MARKET_MASTER_KEY_PAIR_PATH!}/secret_key.pem`
    );

    this.userKeys = userKeyPaths.map((path: (any | string)) => {
      if (path) {
        return Keys.Ed25519.parseKeyFiles(
          `${path}/public_key.pem`,
          `${path}/secret_key.pem`
        );
      } else {
        return null;
      }
    });

    this.cep78 = new CEP78Client(
      NODE_ADDRESS!,
      CHAIN_NAME!
    );

    this.paymentClient = new PaymentClient(
      NODE_ADDRESS!,
      CHAIN_NAME!
    );

    this.casperClient = new CasperClient(NODE_ADDRESS!);
    this.contractClient = new Contracts.Contract(this.casperClient);

    this.nodeAddress = NODE_ADDRESS!;
    this.eventSteamAddress = EVENT_STREAM_ADDRESS!;
    this.nftContractName = NFT_CONTRACT_NAME!;
    this.marketContractName = MARKET_CONTRACT_NAME!;

    this.token_id = NFT_TOKEN_ID!;
    this.listing_price = NFT_LISTING_PRICE!;
    this.offer_amount = NFT_OFFER_AMOUNT!;

    this.nftContractHash = "";
    this.nftContractPackageHash = "";
    this.marketContractHash = "";
    this.marketContractPackageHash = "";
  };

  async setup() {
    [this.nftContractHash, this.nftContractPackageHash] = ["hash-28e99209831ea0769647c73234ed4f403199df180f4a8f4ce021ecadc791bdd2", "hash-77c37b5cee761a861a49a3c5b2d37faaf1f245b7a90adff99bfbf03ba8682064"]

    await this.cep78.setContractHash(this.nftContractHash, this.nftContractPackageHash)

    await sleep(1 * 1000);

    [this.marketContractHash, this.marketContractPackageHash] = ["hash-454424290b04fd33a152cb07a9a13d3df6ee27c87bf556a94c9bc77727f1d5c4", "hash-823e0fb45ced307af3de0836a8f3e1110c525a8aa7117f98cc8f031996622dc8"]

    await this.contractClient.setContractHash(this.marketContractHash, this.marketContractPackageHash)

  }

  async getContractHashes(
    name: string,
    nodeAddress: string,
    keys: Keys.AsymmetricKey,
    contractName: string,
    contractPackageName: string
  ) {
    let accountInfo = await getAccountInfo(nodeAddress, keys.publicKey);

    console.log(`... ${name} Account Info: `);
    console.log(JSON.stringify(accountInfo, null, 2));

    const contractHash = await getAccountNamedKeyValue(
      accountInfo,
      `${contractName}`
    );

    const contractPackageHash = await getAccountNamedKeyValue(
      accountInfo,
      `${contractPackageName}`
    );

    console.log(`... ${name} Contract Hash: ${contractHash}`);
    console.log(`... ${name} Contract Package Hash: ${contractPackageHash}`);

    return [contractHash, contractPackageHash];
  }
}