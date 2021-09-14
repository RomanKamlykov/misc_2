<template>
  <section class="updates">
    <div class="topic">
      <img src="../assets/img/02_bestsellers/icon.png" alt="" class="icon" />
      <span>Fresh updates</span>
    </div>

    <div class="items">
      <Item v-for="(item, index) in items.slice(firstItem, firstItem + numberOfItems)" :item="item" :key="index" />

      <template v-if="items.length > numberOfItems">
        <button type="button" class="prev" @click="nextPage(items.length, -1)">&#10094;</button>
        <button type="button" class="next" @click="nextPage(items.length, 1)">&#10095;</button>
      </template>
    </div>

    <div class="button" v-show="items.length>numberOfItems">
      <button type="button" @click="showAllUpdates">All updates</button>
    </div>
  </section>
</template>

<script src="./Updates.js"></script>
<style lang="scss" src="./Updates.scss"></style>