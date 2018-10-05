import React, { Component } from'react'
import { Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import api from '../../api'

@inject('store')
@observer
class BoxTarea extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            cryptos: [],
            page: 0,
            limit: 10
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

    // onSort(items, sortKey){
    //     items.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    //     this.setState({items})
    // }

    // ordenar(items){
    //     items.sort(function (a, b) {
    //         if (a > b) {
    //           return 1;
    //         }
    //         if (a < b) {
    //           return -1;
    //         }
    //         // a must be equal to b
    //         return 0;
    //     });
    //     console.log(items)
    // }
    ordenar(items){
    items.sort(function(a,b){return a - b;});
    }

    render() {
        let self = this
        let items = self.state.cryptos.map(function(item) {
            return  (
                <tr style={{cursor: 'pointer'}} key={item.id}  onClick={self.goDetails.bind(self,item)}>
                    <th>
                        {item.rank}  
                    </th>
                    <td>        
                    <img src={'https://s2.coinmarketcap.com/static/img/coins/16x16/' + item.id + '.png'}></img>
                        {item.name}
                    </td>
                    <td> 
                        {item.quotes.BTC.market_cap}
                    </td>
                    <td >
                        {item.quotes.USD.price}
                    </td>
                    <td>
                        {item.quotes.USD.percent_change_24h}
                    </td>
                </tr>
            )  
        })  
        
        return(
            <div className="container">
                <div className="row">
                <table className="table table-haver table-bordered"> 
                    <thead >
                        <tr >
                            <th scope="col">
                                <h5>#</h5>
                            </th>
                            <th onClick={self.ordenar.bind(self, items)} style={{cursor: 'pointer'}}>
                                {console.log(items)}
                                <h5>Name</h5>
                            </th>                            
                            <th scope="col">
                                <h5>Market cap</h5>
                            </th>
                            <th scope="col">
                                <h5>Price</h5>
                            </th>
                            <th scope="col">
                                <h5>Change(24h)</h5>
                            </th>
                        </tr>
                    </thead>                  
                        <tbody>                            
                            {items}
                        </tbody>
                    </table>
                    </div>
                <div> 
                    <Button bsStyle="link" onClick={self.previousPage.bind(self)}>
                        Pagina anterior
                    </Button>
                    {'Pagina ' + (self.state.page+1) + ' de ' + self.state.totalCryptos/self.state.limit}
                    <Button bsStyle="link" onClick={self.nextPage.bind(self)}>
                        Pagina siguiente
                    </Button>
                </div>
            </div>
        )
    }
}

export default BoxTarea