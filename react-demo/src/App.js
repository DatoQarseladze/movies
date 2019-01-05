import React, { Component } from 'react';
import './App.css';
// import Movies from './components/movie'
import Counters from './components/counters'
import NavBar from './components/navbar';

class App extends Component {
  state = {   
    counters: [
        {id: 1, value: 4},
        {id: 2, value: 0},
        {id: 3, value: 0},
        {id: 4, value: 0}
    ]
  }


handleIncrement = counter =>{
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index].value ++;
    this.setState({ counters })
}

handleDecrement = counter =>{
  const counters = [...this.state.counters];
  const index = counters.indexOf(counter);
  counters[index].value --;
  this.setState({ counters });
}

handleDelete = id => {
    const counters = this.state.counters.filter( p => p.id !== id)
    this.setState({ counters });
}
handleReset = () =>{
    const counters = this.state.counters.map(counter =>{
    counter.value = 0;
    return counter;
    })
    this.setState({ counters })
}
  render() {
    return (
    <React.Fragment>
    <NavBar 
    totalNumbers={this.state.counters.filter(c => c.value>0).length}
     />
    <main className='container'>
    <Counters 
      counters={this.state.counters}
      onReset={this.handleReset}
      onIncrement={this.handleIncrement}
      onDecrement={this.handleDecrement}
      onDelete={this.handleDelete} />
    </main>
    </React.Fragment>
    );
  }
}

export default App;
