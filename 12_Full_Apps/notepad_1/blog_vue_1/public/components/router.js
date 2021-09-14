const Home = httpVueLoader('./components/Home.vue');
const Post = httpVueLoader('./components/Post.vue');

// const Home = { template: '<div>home</div>' }
// const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/post/:id', component: Post },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes
})

export default router;
