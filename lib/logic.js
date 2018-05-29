/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

/**
 * Account transfer transaction
 * @param {org.example.blockchainbank.AccountTransfer} accountTransfer
 * @transaction
 */
async function accountTransfer(accountTransfer) {

  if (accountTransfer.from.balance < accountTransfer.amount) {
    throw new Error('Insufficient funds!')
  }

  accountTransfer.from.balance -= accountTransfer.amount
  accountTransfer.to.balance += accountTransfer.amount

  return getAssetRegistry('org.example.blockchainbank.Account')
    .then(function (assetRegistry) {
      return assetRegistry.update(accountTransfer.from)
    })
    .then(function () {
      return getAssetRegistry('org.example.blockchainbank.Account')
    })
    .then(function (assetRegistry) {
      return assetRegistry.update(accountTransfer.to)
    })
}

/**
 * Add funds transaction
 * @param {org.example.blockchainbank.AddFunds} addFunds
 * @transaction
 */
async function addFunds(addFunds) {

  addFunds.account.balance += addFunds.amount

  return getAssetRegistry('org.example.blockchainbank.Account')
    .then(function (assetRegistry) {
      return assetRegistry.update(addFunds.account)
    })
}

/**
 * Withdrawal transaction
 * @param {org.example.blockchainbank.Withdrawal} withdrawal
 * @transaction
 */
async function withdrawal(withdrawal) {

  withdrawal.account.balance -= withdrawal.amount

  return getAssetRegistry('org.example.blockchainbank.Account')
    .then(function (assetRegistry) {
      return assetRegistry.update(withdrawal.account)
    })
}
