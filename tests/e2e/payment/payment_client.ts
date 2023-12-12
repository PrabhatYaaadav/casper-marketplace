import {
  RuntimeArgs,
  CasperClient,
  Contracts,
  Keys,
  CLValueBuilder,
  CLPublicKey
} from "casper-js-sdk";

const { Contract } = Contracts;

import * as fs from "fs";

export interface PaymentInstallArgs {
  market_contract_hash: string,
  entry_point_name: string,
  token_contract_hash: string,
  token_id: string,
  amount: number,
  is_hash_identifier_mode: boolean,
  target_key: Uint8Array,
  source_key: Uint8Array
};

export class PaymentClient {
  casperClient: CasperClient;
  contractClient: Contracts.Contract;

  getBinary(pathToBinary: string) {
    return new Uint8Array(fs.readFileSync(pathToBinary, null).buffer);
  };

  toMotes(amt: any) { return amt * 1000000000};

  constructor(public nodeAddress: string, public networkName: string) {
    this.casperClient = new CasperClient(nodeAddress);
    this.contractClient = new Contract(this.casperClient);
  }

  public install(
    wasmPath: string,
    args: PaymentInstallArgs,
    paymentAmount: string,
    deploySender: CLPublicKey,
    keys?: Keys.AsymmetricKey[]
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      market_contract_hash: CLValueBuilder.string(args.market_contract_hash),
      entry_point_name: CLValueBuilder.string(args.entry_point_name),
      token_contract_hash: CLValueBuilder.string(args.token_contract_hash),
      is_hash_identifier_mode:CLValueBuilder.bool(args.is_hash_identifier_mode),
      token_id: CLValueBuilder.string(args.token_id),
      amount: CLValueBuilder.u512(this.toMotes(args.amount)),
      target_key: CLValueBuilder.byteArray(args.target_key),
      source_key: CLValueBuilder.byteArray(args.source_key),
    });

    return this.contractClient.install(this.getBinary(wasmPath), runtimeArgs, paymentAmount, deploySender, this.networkName, keys || []);
  }

}