#![no_std]
#![no_main]

#[cfg(not(target_arch = "wasm32"))]
compile_error!("target arch should be wasm32: compile with '--target wasm32-unknown-unknown'");

// We need to explicitly import the std alloc crate and `alloc::string::String` as we're in a
// `no_std` environment.
extern crate alloc;

use alloc::string::String;
use alloc::vec::Vec;
use casper_contract::{
    contract_api::{account, runtime, system},
    unwrap_or_revert::UnwrapOrRevert
};

use casper_types::{
    runtime_args, RuntimeArgs,
    ContractHash, U512
};

const NFT_CONTRACT_HASH_ARG: &str = "token_contract_hash";
const TOKEN_ID_ARG: &str = "token_id";
const AMOUNT_ARG: &str = "amount";
const TARGET: &str = "target_key";
const SOURCE: &str = "source_key";
const MARKET_CONTRACT_HASH_ARG: &str = "market_contract_hash";
const MARKET_ENTRY_POINT_NAME_ARG: &str = "entry_point_name";
const HASH_IDENTIFIER_MODE: &str = "is_hash_identifier_mode"

#[no_mangle]
pub extern "C" fn call() {
    let amount: U512 = runtime::get_named_arg(AMOUNT_ARG);
    let token_contract_hash: String = runtime::get_named_arg(NFT_CONTRACT_HASH_ARG);
    let token_id: String = runtime::get_named_arg(TOKEN_ID_ARG);
    let target: Vec<u8> = runtime::get_named_arg(TARGET);
    let source: Vec<u8> = runtime::get_named_arg(SOURCE);
    let hash_identifier_mode: bool = runtime::get_named_arg::<bool>(HASH_IDENTIFIER_MODE);
    let market_contract_hash_arg: String = runtime::get_named_arg(MARKET_CONTRACT_HASH_ARG);
    let market_contract_hash: ContractHash = ContractHash::from_formatted_str(&market_contract_hash_arg).unwrap();
    let market_entry_point_name: String = runtime::get_named_arg(MARKET_ENTRY_POINT_NAME_ARG);
    
    let new_purse = system::create_purse();
    
    system::transfer_from_purse_to_purse(account::get_main_purse(), new_purse, amount, None)
        .unwrap_or_revert();
        
    runtime::call_contract(market_contract_hash, &market_entry_point_name, runtime_args! {
        "purse" => new_purse,
        "token_contract_hash" => token_contract_hash,
        "is_hash_identifier_mode" => hash_identifier_mode,
        "token_id" => token_id,
        "target_key" => target,
        "source_key" => source
    })
}