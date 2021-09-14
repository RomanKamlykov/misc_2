function HomeContainer() {
  const [childPosts, setChildPosts] = React.useState([]);
  const [recentPosts, setRecentPosts] = React.useState([]);

  async function getData() {
    const response = await fetch('/api/home');
    const data = await response.json();
    setChildPosts(data.childPosts);
    setRecentPosts(data.recentPosts);
  }

  React.useEffect(() => {
    getData();
  },[])

  return(
    <HomeComponent childPosts={childPosts} recentPosts={recentPosts} />
  );
}
