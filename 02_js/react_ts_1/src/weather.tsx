import React from 'react';
import ReactDOM from 'react-dom';

interface Location {
  name?: string
  country?: string
  temp?: number
  humidity?: number
  weather?: string
}

type P = {
  message: string;
};

type S = {
  location: Location;
};

class ClassComponent extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      location: {},
    }
  }

  componentDidMount() {
    this.setState({
      location: {
        name: 'Kharkiv',
        country: 'UA',
        temp: 20,
        humidity: 60,
        weather: 'clouds'
      },
    })
  }

  render() {
    const { location } = this.state
    return (
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3 mb-3">

          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{location.name}, {location.country}</h3>

              <ul className="list-unstyled mt-3 mb-4">
                <li>Temperature: {location.temp} °C</li>
                <li>Humidity: {location.humidity}</li>
                <li>Description: {location.weather}</li>
              </ul>

              <div className="btn-group">
                <input type="button" value="↻" onClick={() => console.log(1)} className="btn btn-secondary" />
                <input type="button" value="✕" onClick={() => console.log(2)} className="btn btn-warning" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ClassComponent message={'world'} />, document.getElementById('root'));
