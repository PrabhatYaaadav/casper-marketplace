import { config } from "dotenv";
import { TestConfig } from "../packages/configure"
import { CEP78Client } from "casper-cep78-js-client";
import { sleep, getDeploy } from "../utils";

import {
    RuntimeArgs,
    DeployUtil,
    CLValueBuilder,
    CLByteArray,
    CLKey,
    Keys
} from "casper-js-sdk";

export class NFTTester {
    nodeAddress: string;
    paymentAmounts: any;
    cep78: CEP78Client;
    nftContractHash: string;
    nftContractPackageHash: string;
    marketContractHash: string;
    marketContractPackageHash: string;

    constructor(public testConfig: TestConfig) {
        config({ path: this.testConfig.configPath });
        const {
            NODE_ADDRESS,
            MINT_ONE_PAYMENT_AMOUNT,
            TRANSFER_PAYMENT_AMOUNT,
            DEPLOY_PAYMENT_AMOUNT
        } = process.env;

        this.nodeAddress = NODE_ADDRESS!;

        this.paymentAmounts = {
            mint: MINT_ONE_PAYMENT_AMOUNT!,
            transfer: TRANSFER_PAYMENT_AMOUNT!,
            deploy: DEPLOY_PAYMENT_AMOUNT!
        }

        this.cep78 = this.testConfig.cep78;
        this.nftContractHash = this.testConfig.nftContractHash;
        this.nftContractPackageHash = this.testConfig.nftContractPackageHash;
        this.marketContractHash = this.testConfig.marketContractHash;
        this.marketContractPackageHash = this.testConfig.marketContractPackageHash;
    }

    public async contractInfo() {
        const name = await this.cep78.collectionName();
        console.log(`... Contract name: ${name}`);

        const symbol = await this.cep78.collectionSymbol;
        console.log(`... Contract symbol: ${symbol}`);

        const meta = await this.cep78.getMetadataKindConfig;
        console.log(`... Contract meta: ${JSON.stringify(meta)}`);

        let totalSupply = await this.cep78.tokenTotalSupply();
        console.log(`... Total supply: ${totalSupply}`);
    };

}