const { React, ReactDOM } = window;
const { BrowserRouter, Switch, Route, Link } = window.ReactRouterDOM;

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

// class ClassComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     // instance property/method
//     this.state = {
//       num: 1,
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }

//   // prototype property/method
//   handleClick() {
//     console.log(this);
//   }
//   render() {
//     return (
//       <h1 onClick={this.handleClick}>Hello, world</h1>
//     );
//   }
// }

ReactDOM.render(<App />, document.getElementById('root'));
