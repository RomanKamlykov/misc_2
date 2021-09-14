const React = window.React;

function LinkForm(props) {
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [description, setDescription] = React.useState('');
    const resetForm = () => {
        setName('');
        setUrl('');
        setDescription('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { name, url, description };
        try {
            await fetch('/.netlify/functions/createLink',{method:'POST',body:JSON.stringify(body)});
            resetForm();
            props.refreshLinks();
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="card">
        <div className="card-header">Add Link</div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">URL</label>
                        <input type="text" name="url" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}