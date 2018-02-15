/**
Assuming these modules set have been installed via NPM/YARN
*/
import react, { Component } from 'react'

import List from './List'

Class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      term: '',
      items: []
    }
  }
  onChange(event){
    this.setState({term: event.target.value})
  }
  onSubmit(event){
    event.preventDefault()
    this.setState({
      term: '',
      items: [ ...this.state.items, this.state.term ]
    })
  }
  render(){
    <main>
      <form onSubmit={this.onSubmit}>
        <input value={this.state.term} onChange={this.onChange} />
        <button>Submit</button>
      </form>
      <List items={this.state.items} />
    </main>
  }
}
