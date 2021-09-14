const router = require('express').Router();

router.get('/', async (req, res) => {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Pulvinar etiam non quam lacus. Habitant morbi tristique senectus et netus et malesuada. Amet nisl purus in mollis nunc. In aliquam sem fringilla ut. Felis donec et odio pellentesque diam volutpat commodo sed. Vel eros donec ac odio tempor orci dapibus ultrices. Non nisi est sit amet facilisis magna. Sed viverra ipsum nunc aliquet bibendum enim. Velit ut tortor pretium viverra suspendisse potenti. Mattis molestie a iaculis at erat. Nulla facilisi etiam dignissim diam quis enim lobortis. Condimentum lacinia quis vel eros donec ac.',
    },
    {
      id: 3,
      title: 'Post 3',
      body: 'In tellus integer feugiat scelerisque varius morbi enim. At imperdiet dui accumsan sit amet nulla. Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. Aenean sed adipiscing diam donec adipiscing tristique. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Purus semper eget duis at. Et netus et malesuada fames ac turpis egestas integer eget. Feugiat in fermentum posuere urna nec. Tincidunt vitae semper quis lectus. Sagittis nisl rhoncus mattis rhoncus urna neque viverra. Lectus magna fringilla urna porttitor. Suspendisse ultrices gravida dictum fusce ut placerat. Faucibus vitae aliquet nec ullamcorper sit. Nullam ac tortor vitae purus faucibus ornare suspendisse. Aliquet nibh praesent tristique magna sit amet purus. Nec ultrices dui sapien eget mi proin. Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Cum sociis natoque penatibus et magnis. Consequat interdum varius sit amet mattis vulputate.',
    },
    {
      id: 4,
      title: 'Post 4',
      body: 'Mauris a diam maecenas sed enim ut sem viverra aliquet. Vivamus arcu felis bibendum ut tristique et. Quam nulla porttitor massa id neque aliquam. Velit laoreet id donec ultrices tincidunt arcu. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Diam quis enim lobortis scelerisque. Sed cras ornare arcu dui. Nec ullamcorper sit amet risus nullam eget felis eget nunc. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. Sem viverra aliquet eget sit amet. Ut sem viverra aliquet eget sit amet tellus cras adipiscing.',
    },
  ];
  res.json({ posts });
});

module.exports = router;
