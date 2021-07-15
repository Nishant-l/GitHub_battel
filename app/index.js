import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Popular from './components/populer';
import './index.css'

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Popular /> 
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)