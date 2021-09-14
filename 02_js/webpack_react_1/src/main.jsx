// @ts-check
import React from 'react'
import ReactDOM from 'react-dom'

class ClassComponent extends React.Component {
  /**
   * @param {string} props
   */
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.increment = this.increment.bind(this);
  }

  handleClick() {
    console.log(this);
  }

  increment() {
    this.setState(
      (/** @type {{ num: number; }} */ prevState) => ({ num: prevState.num + 1 })
    );
  }

  render() {
    return (
      <>
        <h1 onClick={this.handleClick}>Hello, {this.props.message}</h1>
        <div>hello 2</div>
        <div>{this.state.num}</div>
        <button onClick={this.increment}>Click me!</button>
      </>
    );
  }
}

ReactDOM.render(<ClassComponent message={'world'} />, document.getElementById('root'));
