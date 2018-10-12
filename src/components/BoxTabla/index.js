import React, { Component } from'react'
import { Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import api from '../../api'
import './style.css'

@inject('store')
@observer
class BoxTarea extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            cryptos: [],
            page: 0,
            limit: 10,
            order: 'market'
        }  
    }

    componentDidMount() {
        let self = this
        self.reloadData(self.state.page)      
    }

    reloadData(start){
        let self = this
        api.cryptoList(start, self.state.limit).then(result =>{
            console.log(result)
            self.setState({cryptos: result.data, totalCryptos: result.metadata.num_cryptocurrencies})
        })
    }
  
    nextPage(){
        let self = this
        let start = (self.state.page+1) * self.state.limit
        self.setState({page: self.state.page+1})
        self.reloadData(start)
    }

    previousPage(){
        let self = this
        let start = (self.state.page-1) * self.state.limit
        self.setState({page: self.state.page-1})
        self.reloadData(start)
    }

    goDetails(item){
        let self = this
        let { routing, crypto } = self.props.store
        crypto.setCryptoSelected(item)
        routing.push(`/boxdetails/${item.rank}`)   
    }

    ordenarNombre() {
        let self = this
        let cryptos = self.state.cryptos
        if (self.state.order === 'name') {
            cryptos.sort(function(a, b) {
                if (a.name > b.name) {
                    return -1;
                } else if (a.name < b.name) {
                    return 1;
                }
                return 0;
            })
            self.setState({cryptos: cryptos, order: 'nameDes'})
        } else {
            cryptos.sort(function(a, b) {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            })
            self.setState({cryptos: cryptos, order: 'name'})
        }        
    }

    ordenarMarquet() {
        let cryptos = this.state.cryptos
        if (this.state.order === 'market') {
            cryptos.sort(function(a, b) {
                if (a.quotes.BTC.market_cap > b.quotes.BTC.market_cap) {
                    return -1;
                } else if (a.quotes.BTC.market_cap < b.quotes.BTC.market_cap) {
                    return 1;
                }
                return 0;
            })
            this.setState({cryptos: cryptos, order: 'marketDes'})
        } else {
            cryptos.sort(function(a, b) {
                if (a.quotes.BTC.market_cap < b.quotes.BTC.market_cap) {
                    return -1;
                } else if (a.quotes.BTC.market_cap > b.quotes.BTC.market_cap) {
                    return 1;
                }
                return 0;
            })
            this.setState({cryptos: cryptos, order: 'market'})
        }        
    }

    itemChange(item) {
        if(item.quotes.USD.percent_change_24h >= 0){
            return {color: "green"}
        }
        return {color: "red"} 
    }

    render() {
        let self = this
        let items = self.state.cryptos.map(function(item) {
            return  (
                <tr style={{cursor: 'pointer'}} key={item.id}  onClick={self.goDetails.bind(self,item)}>
                    <th className= "item-rank">
                        {item.rank}  
                    </th>
                    <td className= "item-name" > 
                        <img className="img" src={'https://s2.coinmarketcap.com/static/img/coins/16x16/' + item.id + '.png'} alt="icon"></img>
                        {item.name}
                    </td>
                    <td className= "item-market"> 
                        {'$' + item.quotes.USD.market_cap.toLocaleString()}
                    </td>
                    <td className= "item-price" style={{color: "blue"}}>
                        {'$' + item.quotes.USD.price.toFixed(2)}
                    </td>
                    <td className= "item-change" style={self.itemChange(item)}>
                        {item.quotes.USD.percent_change_24h.toFixed(2) + '%'}
                    </td>
                    <td className= "item-graph">
                        <img src={'https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/' + item.id + '.png'} alt="icon"></img>
                    </td>
                </tr>
            )  
        })  
            
        return(
            <div className="container">
                <div className="row">
                <table className="table table-hover"> 
                    <thead >
                        <tr >
                            <th align="center">
                                <h5>#</h5>
                            </th>
                            <th onClick={self.ordenarNombre.bind(self)} style={{cursor: 'pointer'}} align="center">
                                <h5>Name</h5>
                            </th>                            
                            <th onClick={self.ordenarMarquet.bind(self)} style={{cursor: 'pointer'}}>
                                <h5>Market cap</h5>
                            </th>
                            <th scope="col">
                                <h5>Price</h5>
                            </th>
                            <th align="center">
                                <h5>Change(24h)</h5>
                            </th>
                            <th scope="col">
                                <h5>Price Graph (7d)</h5>
                            </th>
                        </tr>
                    </thead>                  
                        <tbody>                            
                            {items}
                        </tbody>
                    </table>
                    </div>
                <div className="pag"> 
                    <Button bsStyle="link" onClick={self.previousPage.bind(self)}>
                        Pagina anterior
                    </Button>
                    {'Pagina ' + (self.state.page+1) + ' de ' + Math.round(self.state.totalCryptos/self.state.limit)}
                    <Button bsStyle="link" onClick={self.nextPage.bind(self)}>
                        Pagina siguiente
                    </Button>
                </div>
            </div>
        )
    }
}

export default BoxTarea