const React = window.React;

function LinkCard(props) {
    const archiveLink = async () => {
        const link = {...props.link}
        link.archived = !props.link.archived;
        try {
            await fetch('/.netlify/functions/updateLink',{method:'PUT',body:JSON.stringify(link)});
            props.refreshLinks();
        } catch (error) {
            console.error(error);
        }
    }
    const deleteLink = async () => {
        const _id = props.link._id;
        try {
            await fetch('/.netlify/functions/deleteLink',{method:'DELETE',body:JSON.stringify({_id})});
            props.refreshLinks();
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className="card mb-3">
            <div className="card-header">{props.link.name}</div>
            <div className="card-body">
                <a href={props.link.url}>{props.link.url}</a>
                <p>{props.link.description}</p>
            </div>
            <div className="card-footer">
                <button className="btn btn-warning mr-2" onClick={archiveLink}>{props.link.archived ? "Unarchive" : "Archive"}</button>
                <button className="btn btn-danger" onClick={deleteLink}>Delete</button>
            </div>
        </div>
    );
}