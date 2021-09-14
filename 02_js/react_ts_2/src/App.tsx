import React from 'react'

type P = {
  message: string;
};

type S = {
  num: number;
};

export default class App extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      num: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.increment = this.increment.bind(this);
  }

  handleClick() {
    console.log(123);
    console.log(this);
  }

  increment() {
    this.setState(
      (prevState) => ({ num: prevState.num + 1 })
    );
  }

  render() {
    return (
      <>
        <h1 onClick={this.handleClick}>Hello, {this.props.message}</h1>
        <div>{this.state.num}</div>
        <button onClick={this.increment}>Click me!</button>
      </>
    );
  }
}
