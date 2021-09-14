const React = window.React;
const LinkCard = window.LinkCard;

function LinkList(props) {
    return(
        <>
            <h2 className="my-4">Links</h2>
            {props.links && props.links.filter(link=>!link.archived).map(link => (
                <LinkCard key={link._id} link={link} refreshLinks={props.refreshLinks} />
            ))}
            <h2 className="my-4">Archived Links</h2>
            {props.links && props.links.filter(link=>link.archived).map(link => (
                <LinkCard key={link._id} link={link} refreshLinks={props.refreshLinks} />
            ))}
        </>
    );
}