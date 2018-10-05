import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import {toJS} from 'mobx'

@inject('store')
@observer
class BoxDetails extends Component{   
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            limit: 10,
        }  
    }

    render() {
        let self = this
        let {crypto} = self.props.store
        let cryptoDetail = toJS(crypto.cryptoSelected)
        return(
            <div>  
                <h1>{cryptoDetail.name}</h1>
            </div>
        )  
    }
}

export default BoxDetails