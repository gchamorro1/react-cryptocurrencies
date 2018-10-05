import {
    observable,
    action,
    toJS
} from 'mobx'
import api from '../api'

let store = null

class CryptoStore {
    storeName = 'CryptoStore'

    @observable cryptos = []
    @observable cryptoSelected = {}
    //@observable totalCryptocurrencies = 0
    //@observable capTotal = 0
    //@observable btcDominance = 0

    @action setCryptoSelected(crypto) {
      this.cryptoSelected = crypto
    }

    @action _saveCryptos(cryptos) {
      this.cryptos = cryptos
    }

    
   // @action _saveTotalCryptocurrencies(totalCryptocurrencies) {
     // this.totalCryptocurrencies = totalCryptocurrencies
   // }

    @action getCryptos(start, limit) {
      let self = this
      return api.cryptoList(start, limit).then(result => {
        self.cryptos = result.data
      //  self.totalCryptocurrencies = result.metadata.num_cryptocurrencies
        return Promise.resolve(toJS(self.cryptos))
      })
    }

   // @action getGlobalData() {
     // let self = this
      //return api.globalData().then(result => {
        //  self.capTotal = result.data.quotes.USD.total_market_cap
         // self.btcDominance = result.data.bitcoin_percentage_of_market_cap
          //return Promise.resolve(result.data)
        //})
   // }

    @action('RESET_CRYPTO_STORE')
    reset() {
      this.cryptos = []
    }

}

export function createCryptoStore() {
    if (store === null) {
        store = new CryptoStore()
    }
    return store
}
