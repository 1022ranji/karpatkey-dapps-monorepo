from web3.exceptions import TransactionNotFound
import time
from defi_protocols.functions import *

import sys
import argparse

parser = argparse.ArgumentParser(description="Dummy testing script", epilog='This is the epilog',
                                 formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument("-p", "--percentage", type=int, default=100, help="percentage of liquidity to be removed")
parser.add_argument("-e", "--execute", action='store_true', help="execute transaction")
args = parser.parse_args()
config = vars(args)

if config['execute'] is False:
  print("This is a dry run, no transaction will be executed. The param percentage is %s", config['percentage'] )
  sys.exit(120)

web3 = get_node(XDAI)

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#CONSTANTS
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ROLES_LTD = '0x494ec5194123487E8A6ba0b6bc96D57e340025e7'
ROLES_DAO = '0x10785356E66b93432e9E8D6F9e532Fa55e4fc058'
ROLES_CONTRACT_ABI = '[{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"address","name":"_avatar","internalType":"address"},{"type":"address","name":"_target","internalType":"address"}]},{"type":"error","name":"ArraysDifferentLength","inputs":[]},{"type":"error","name":"ModuleTransactionFailed","inputs":[]},{"type":"error","name":"NoMembership","inputs":[]},{"type":"error","name":"SetUpModulesAlreadyCalled","inputs":[]},{"type":"event","name":"AssignRoles","inputs":[{"type":"address","name":"module","internalType":"address","indexed":false},{"type":"uint16[]","name":"roles","internalType":"uint16[]","indexed":false},{"type":"bool[]","name":"memberOf","internalType":"bool[]","indexed":false}],"anonymous":false},{"type":"event","name":"AvatarSet","inputs":[{"type":"address","name":"previousAvatar","internalType":"address","indexed":true},{"type":"address","name":"newAvatar","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"ChangedGuard","inputs":[{"type":"address","name":"guard","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"DisabledModule","inputs":[{"type":"address","name":"module","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"EnabledModule","inputs":[{"type":"address","name":"module","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"RolesModSetup","inputs":[{"type":"address","name":"initiator","internalType":"address","indexed":true},{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"avatar","internalType":"address","indexed":true},{"type":"address","name":"target","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"SetDefaultRole","inputs":[{"type":"address","name":"module","internalType":"address","indexed":false},{"type":"uint16","name":"defaultRole","internalType":"uint16","indexed":false}],"anonymous":false},{"type":"event","name":"SetMultisendAddress","inputs":[{"type":"address","name":"multisendAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"TargetSet","inputs":[{"type":"address","name":"previousTarget","internalType":"address","indexed":true},{"type":"address","name":"newTarget","internalType":"address","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"allowTarget","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"},{"type":"uint8","name":"options","internalType":"enum ExecutionOptions"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"assignRoles","inputs":[{"type":"address","name":"module","internalType":"address"},{"type":"uint16[]","name":"_roles","internalType":"uint16[]"},{"type":"bool[]","name":"memberOf","internalType":"bool[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"avatar","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint16","name":"","internalType":"uint16"}],"name":"defaultRoles","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"disableModule","inputs":[{"type":"address","name":"prevModule","internalType":"address"},{"type":"address","name":"module","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"enableModule","inputs":[{"type":"address","name":"module","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"success","internalType":"bool"}],"name":"execTransactionFromModule","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"},{"type":"uint8","name":"operation","internalType":"enum Enum.Operation"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"},{"type":"bytes","name":"","internalType":"bytes"}],"name":"execTransactionFromModuleReturnData","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"},{"type":"uint8","name":"operation","internalType":"enum Enum.Operation"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"success","internalType":"bool"}],"name":"execTransactionWithRole","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"},{"type":"uint8","name":"operation","internalType":"enum Enum.Operation"},{"type":"uint16","name":"role","internalType":"uint16"},{"type":"bool","name":"shouldRevert","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"success","internalType":"bool"},{"type":"bytes","name":"returnData","internalType":"bytes"}],"name":"execTransactionWithRoleReturnData","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"},{"type":"uint8","name":"operation","internalType":"enum Enum.Operation"},{"type":"uint16","name":"role","internalType":"uint16"},{"type":"bool","name":"shouldRevert","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"_guard","internalType":"address"}],"name":"getGuard","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address[]","name":"array","internalType":"address[]"},{"type":"address","name":"next","internalType":"address"}],"name":"getModulesPaginated","inputs":[{"type":"address","name":"start","internalType":"address"},{"type":"uint256","name":"pageSize","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"guard","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isModuleEnabled","inputs":[{"type":"address","name":"_module","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"multisend","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeTarget","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"scopeAllowFunction","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"},{"type":"bytes4","name":"functionSig","internalType":"bytes4"},{"type":"uint8","name":"options","internalType":"enum ExecutionOptions"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"scopeFunction","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"},{"type":"bytes4","name":"functionSig","internalType":"bytes4"},{"type":"bool[]","name":"isParamScoped","internalType":"bool[]"},{"type":"uint8[]","name":"paramType","internalType":"enum ParameterType[]"},{"type":"uint8[]","name":"paramComp","internalType":"enum Comparison[]"},{"type":"bytes[]","name":"compValue","internalType":"bytes[]"},{"type":"uint8","name":"options","internalType":"enum ExecutionOptions"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"scopeFunctionExecutionOptions","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"},{"type":"bytes4","name":"functionSig","internalType":"bytes4"},{"type":"uint8","name":"options","internalType":"enum ExecutionOptions"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"scopeParameter","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"},{"type":"bytes4","name":"functionSig","internalType":"bytes4"},{"type":"uint256","name":"paramIndex","internalType":"uint256"},{"type":"uint8","name":"paramType","internalType":"enum ParameterType"},{"type":"uint8","name":"paramComp","internalType":"enum Comparison"},{"type":"bytes","name":"compValue","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"scopeParameterAsOneOf","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"},{"type":"bytes4","name":"functionSig","internalType":"bytes4"},{"type":"uint256","name":"paramIndex","internalType":"uint256"},{"type":"uint8","name":"paramType","internalType":"enum ParameterType"},{"type":"bytes[]","name":"compValues","internalType":"bytes[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"scopeRevokeFunction","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"},{"type":"bytes4","name":"functionSig","internalType":"bytes4"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"scopeTarget","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAvatar","inputs":[{"type":"address","name":"_avatar","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDefaultRole","inputs":[{"type":"address","name":"module","internalType":"address"},{"type":"uint16","name":"role","internalType":"uint16"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGuard","inputs":[{"type":"address","name":"_guard","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMultisend","inputs":[{"type":"address","name":"_multisend","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTarget","inputs":[{"type":"address","name":"_target","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setUp","inputs":[{"type":"bytes","name":"initParams","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"target","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unscopeParameter","inputs":[{"type":"uint16","name":"role","internalType":"uint16"},{"type":"address","name":"targetAddress","internalType":"address"},{"type":"bytes4","name":"functionSig","internalType":"bytes4"},{"type":"uint8","name":"paramIndex","internalType":"uint8"}]}]'
BOT_ADDRESS = '0x360FEAD0fA5cC741bF12cF5A0cC43059BC340e7e'
PRIVATE_KEYS = '5fbde3dc659d4884a7bec91ef7783cf5df7143327eecf9c38ed6a89d6ceefec1'
WALLET = '0x458cD345B4C05e8DF39d0A07220feb4Ec19F5e6f'
BLOCKCHAIN = XDAI

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#TRANSACTION FIXED ARGUMENTS
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

value = 0
operation = 0
role = 2
shouldRevert = False

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#TRANSACTION GAS PARAMETERS
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CHAIN_ID = web3.eth.chain_id
GAS_LIMIT = 500000 #Maximum gas amount approved for the transaction
MAX_FEE_PER_GAS = web3.toWei('2', 'gwei')#Maximum total amount per unit of gas we are willing to pay, including base fee and priority fee
MAX_PRIORITY_FEE_PER_GAS = web3.toWei('1', 'gwei')#Maximum fee (tip) per unit of gas paid to validator for transaction prioritization

ROLES_contract = get_contract(ROLES_DAO, XDAI, abi = ROLES_CONTRACT_ABI)

to_address = '0xdf667DeA9F6857634AaAf549cA40E06f04845C03'
data = '0x18fccc76000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000458cd345b4c05e8df39d0a07220feb4ec19f5e6f'

#Creates transaction object
txn = ROLES_contract.functions.execTransactionWithRole(to_address, value, data, operation, role, shouldRevert).buildTransaction({
    'chainId': CHAIN_ID,
    'gas': GAS_LIMIT,
    'maxFeePerGas': MAX_FEE_PER_GAS,
    'maxPriorityFeePerGas': MAX_PRIORITY_FEE_PER_GAS,
    'nonce': web3.eth.get_transaction_count(BOT_ADDRESS)
})

#Creates signed transaction object
signed_txn = web3.eth.account.sign_transaction(txn, PRIVATE_KEYS)


#Executes transaction
executed_txn = web3.eth.send_raw_transaction(signed_txn.rawTransaction)

txn_exists = False
while txn_exists is False:
    try:
        txn_receipt = web3.eth.get_transaction_receipt(executed_txn.hex())
        txn_exists = True

    except TransactionNotFound:
        time.sleep(5)

if txn_receipt.status == 1:
    txns_message = '*Txn hash (Success):* <https://gnosisscan.io/tx/%s|%s>\n' % (executed_txn.hex(), executed_txn.hex())
else:
    txns_message = '*Txn hash (Fail):* <https://gnosisscan.io/tx/%s|%s>\n' % (executed_txn.hex(), executed_txn.hex())

print(txns_message)
