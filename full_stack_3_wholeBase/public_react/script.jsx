const { React, ReactDOM, fetch } = window;

function App() {
  const [formData, setFormData] = React.useState({});
  const [items, setItems] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  const page = React.useRef(0);

  // async function awaitForSetState(variable, setVariable, value) {
  //   setVariable(value);
  //   React.useEffect(() => {}, [variable]);
  // }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setItems([]);
    // setPage(0);
    page.current = 0;
    const params = new URLSearchParams({ ...formData, page: page.current });

    try {
      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMore() {
    // setPage(page + 1); // !!! эту хрень пока не могу обойти !!!
    page.current += 1;
    console.log(page.current);
    const params = new URLSearchParams({ ...formData, page: page.current });

    try {
      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();
      setItems([...items, ...data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto py-4">
      <form action="/api/search" method="GET" className="flex flex-row mb-4" onSubmit={handleSubmit}>
        <div className="w-1/12 p-0.5">
          <input type="text" id="card" name="card" className="px-2 py-1 border border-solid border-blue-300 rounded w-full focus:ring-2" onChange={handleChange} />
        </div>
        <div className="w-1/12 p-0.5">
          <input type="text" id="mySegm" name="mySegm" className="px-2 py-1 border border-solid border-blue-300 rounded w-full focus:ring-2" onChange={handleChange} />
        </div>
        <div className="w-1/12 p-0.5">
          <input type="text" id="code" name="code" className="px-2 py-1 border border-solid border-blue-300 rounded w-full focus:ring-2" onChange={handleChange} />
        </div>
        <div className="w-6/12 p-0.5">
          <input type="text" id="title" name="title" className="px-2 py-1 border border-solid border-blue-300 rounded w-full focus:ring-2" onChange={handleChange} />
        </div>
        <div className="w-3/12 p-0.5">
          <input type="desc" id="desc" name="desc" className="px-2 py-1 border border-solid border-blue-300 rounded w-full focus:ring-2" onChange={handleChange} />
        </div>
        <input type="submit" value="Submit" hidden="true" />
      </form>

      <table className="table-fixed w-full">
        <thead>
          <tr className="text-gray-50 bg-gray-800">
            <th className="w-1/12 py-1">card</th>
            <th className="w-1/12 py-1">mySegm</th>
            <th className="w-1/12 py-1">code</th>
            <th className="w-6/12 py-1">title</th>
            <th className="w-3/12 py-1">desc</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="truncate py-1">{ item.card }</td>
              <td className="truncate py-1">{ item.mySegm }</td>
              <td className="truncate py-1">{ item.code }</td>
              <td className="truncate py-1">{ item.title }</td>
              <td className="truncate py-1">{ item.desc }</td>
            </tr>
          ))}
        </tbody>
      </table>

      {(items.length >= 50) && (
      <div className="container flex justify-center py-4">
        <button type="button" className="btn py-2 px-4 text-white font-semibold rounded-lg shadow-md bg-green-500 hover:bg-green-600" onClick={loadMore}>Load more...</button>
      </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
