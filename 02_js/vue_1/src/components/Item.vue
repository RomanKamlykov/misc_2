<template>
  <div class="item">
    <div class="img">
      <img :src="item.img" alt="" />
    </div>

    <div class="text">
      <div class="name">
        {{item.name}}
      </div>
      <div class="price">
        <span class="price_current">{{item.price}}</span>
        <span class="discount">
          <span class="price_old">{{item.priceOld}}</span>
          <span class="interest">{{item.interest}}</span>
        </span>
      </div>
      <div class="note">
        {{item.info}}
      </div>
    </div>
  </div>
</template>

<script src="./Item.js"></script>
<style lang="scss" src="./Item.scss"></style>