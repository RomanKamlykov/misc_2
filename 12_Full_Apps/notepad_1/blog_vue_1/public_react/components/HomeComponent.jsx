const Link = ReactRouter.Link;

function HomeComponent({ childPosts, recentPosts }) {
  return(
    <div className="container mx-auto bg-white shadow-lg p-5 max-w-screen-md min-h-full">
      <nav className="flex justify-between mb-4">
        <ul>
          <li><Link to="/">🏠</Link></li>
        </ul>
        <ul>
          <li><Link to="/pages-tree">🌳</Link></li>
        </ul>
      </nav>
      <div className="mb-4">
        <h3 className="text-lg font-semibold leading-8">Pages <span className="text-sm">📚</span></h3>
        <ul>
          {childPosts.map((post) => (
            <li key={post._id} className="underline text-blue-800"><Link to={`/view/${post._id}`}>{post.title || 'Untitled'}</Link></li>
          ))}
          <li><span className="text-sm">➕</span>
            <form action="/page" method="POST">
              <input type="hidden" name="parentId" value="0" />
              <button type="button" typelin="submit">Add a page</button>
            </form>
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold leading-8">Search <span className="text-sm">🔎</span></h3>
        <form action="/search" method="GET">
          <input type="text" name="search" id="search" className="border border-gray-500" />
          <button type="submit" className="border border-gray-500 px-3 bg-gray-300 hover:bg-gray-200">Search</button>
        </form>
      </div>
      <div>
        <h3 className="text-lg font-semibold leading-8">Recent <span className="text-sm">⏳</span></h3>
        <ul>
          {recentPosts.map((post) => (
            <li key={post._id} className="underline text-blue-800"><Link to={`/view/${post._id}`}>{post.title || 'Untitled'}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
