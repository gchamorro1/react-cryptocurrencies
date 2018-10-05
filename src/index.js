import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import {Provider} from 'mobx-react'
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router'
import {Router, Route} from 'react-router'
import registerServiceWorker from './registerServiceWorker'
import stores from './stores'
import Loadable from 'react-loadable'
// import App from './App';

function Loading() {
  return <div>Cargando...</div>
}

const Home = Loadable({
  loader: () => import ('./components/Home'),
  loading: () => Loading()
})

const BoxTabla = Loadable({
  loader: () => import ('./components/BoxTabla'),
  loading: () => Loading()
})

const Navbar = Loadable({
  loader: () => import ('./components/Navigation'),
  loading: () => Loading()
})

  const BoxDetails = Loadable({
  loader: () => import ('./components/BoxDetails'),
  loading: () => Loading()
})

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)

ReactDOM.render(<Provider store={stores(routingStore)}>
  <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
    <div>
        <Navbar/>
        <Route exact path="/" component={Home}/>
        <Route path="/boxtabla" component={BoxTabla}/>
        <Route path="/boxdetails/:boxtablaRank" component={BoxDetails} />
    </div>
  </Router>
</Provider>, document.getElementById('root'))
registerServiceWorker()