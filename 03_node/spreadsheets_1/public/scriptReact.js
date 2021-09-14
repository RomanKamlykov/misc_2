const spreadsheetID = '1feG5cAW8oDobvd8KuPZoSSuPMnqw-BYIEObAQqc9x3c';
const range = 'база';
const apiKey = 'AIzaSyAGOXq9gXPu16AYY8xotSf1hmKn2XgwtO0';
const link = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${range}?majorDimension=ROWS&key=${apiKey}`;

function App() {
  // data
  const [header, setHeader] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [input, setInput] = React.useState('');

  // mounted
  React.useEffect(() => {
    axios.get(link).then(response => {
      setHeader(response.data.values[0]);
      setItems(response.data.values.slice(1));
    });
  }, []); // runs once on mount

  // methods
  function handleChange(e) {
    setInput(e.target.value);
  }
  function filterMethod() {
    // console.log(e.target.value);
    input && setFilteredItems(items.filter( item => item[0].toLowerCase().includes(input.toLowerCase()) ));
  }
  
  // template
  return (
    <div>
      <input type="text" name="name" value={input} onChange={handleChange} onKeyUp={(e) => {(e.key === 'Enter') && filterMethod()}} />

      <table>
        <thead>
          <tr>
            {/* map th */}
            {header.slice(1).map( (th, index) => <th key={index}>{th}</th> )}
          </tr>
        </thead>
        <tbody>
          {/* map tr>td>?a */}
          {filteredItems.map( (tr, index) => <tr key={index}>
            {tr.slice(1).map( (td, index) => <td key={index}>{ td.startsWith('http') ? <a href={td} target="_blank">{td}</a> : td }</td> )}
          </tr> )}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));