<template>
  <div class="container mx-auto bg-white shadow-lg p-5 max-w-screen-md min-h-full">
    <nav class="flex justify-between mb-4">
      <ul>
        <li><router-link to="/">🏠</router-link></li>
      </ul>
      <ul>
        <li><router-link to="/pages-tree">🌳</router-link></li>
      </ul>
      <ul class="breadcrumb list-unstyled">
        <li><a href="/">🏠</a></li>
        <li v-for="post in path" :key="post._id"><span class="text-sm">📄</span> <router-link :to="`/${post._id}`" class="underline text-blue-800">{{ post.title || 'Untitled' }}</router-link></li>
      </ul>
      <ul class="control list-unstyled">
        <li><button type="button" class="btn-plain" id="move-post-btn">🔃</button></li>
        <li><a href="/edit?id=<%= post._id %>" class="btn-plain">✏️</a></li>
        <li><button type="button" class="btn-plain" id="delete-btn">🗑️</button></li>
      </ul>
    </nav>

    <div class="page" v-html="html"></div>
    
    <div>
      <h3 class="text-lg font-semibold leading-8">Pages <span class="text-sm">📚</span></h3>
      <ul>
        <li v-for="post in childPosts" :key="post._id"><span class="text-sm">📄</span> <router-link :to="`/${post._id}`" class="underline text-blue-800">{{ post.title || 'Untitled' }}</router-link></li>
      </ul>
    </div>

  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      html: '',
      childPosts: [],
      path: []
    }
  },
  mounted: async function() {
    const postId = this.$route.params.id;
    const response = await fetch(`/api/post/${postId}`);
    const data = await response.json();

    this.childPosts = data.childPosts;
    this.path = data.path;
    this.html = marked(data.post.markdown);
  }
}
</script>
