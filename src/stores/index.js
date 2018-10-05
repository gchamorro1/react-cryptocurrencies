// import {
//     useStrict
// } from 'mobx'
// import {
//     createAppStore
// } from './app'
// useStrict(true)
import {
    createCryptoStore
} from './crypto'

export default (routingStore) => {
    return ({
        routing: routingStore,
        crypto: createCryptoStore()
    })
}
