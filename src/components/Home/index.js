import React, {Component} from 'react'

class Home extends Component{

    render(){
        let mensaje = "Hola, este es el home"
        return(
            <div>
                <h1>{mensaje}</h1>
            </div>
        )
    }
}

export default Home