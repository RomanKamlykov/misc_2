const React = window.React;
const ReactDOM = window.ReactDOM;
const LinkForm = window.LinkForm;
const LinkList = window.LinkList;

function App() {
    const [links, setLinks] = React.useState([]);
    const loadLinks = async () => {
        try {
            const res = await fetch('/.netlify/functions/getLinks');
            const links = await res.json();
            setLinks(links);
        } catch (error) {
            console.error(error);
        }
    } 
    React.useEffect(() => {
        loadLinks();
    },[])

    return(
        <div className="container py-5">
            <h1 className="text-center mb-5">List 0' Links</h1>
            <LinkForm refreshLinks={loadLinks} />
            <LinkList links={links} refreshLinks={loadLinks} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));