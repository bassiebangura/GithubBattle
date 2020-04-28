import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular';
import Battle from './components/battle'

class App extends Component {
    render(){
        return (
            <div className='container'>
              <Battle />
                {/* <Popular /> */}
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)