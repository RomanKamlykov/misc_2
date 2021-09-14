<template>
  <section class="bestsellers">
    <div class="topic">
      <img src="../assets/img/02_bestsellers/icon.png" alt="" />
      <span>Bestsellers</span>
    </div>

    <nav class="nav">
      <ul>
        <li v-for="(category, index) in categories" :key="index" :class="(category.className == activeCategory) && 'active'">
          <button type="button" @click="setActiveCategory(category.className)">{{category.name}}</button>
        </li>
      </ul>

      <div class="control">
        <template v-if="filteredItems.length > numberOfItems">
          <button type="button" class="prev" @click="nextPage(filteredItems.length, -1)">&#10094;</button>
          <span class="more">More</span>
          <button type="button" class="next" @click="nextPage(filteredItems.length, 1)">&#10095;</button>
        </template>
        <button type="button" class="search"><img src="../assets/img/02_bestsellers/search.png" alt="" /></button>
      </div>
    </nav>

    <div class="items">
      <Item v-for="(item, index) in filteredItems.slice(firstItem, firstItem + numberOfItems)" :item="item" :key="index" />
    </div>
  </section>
</template>

<script src="./Bestsellers.js"></script>
<style lang="scss" src="./Bestsellers.scss"></style>