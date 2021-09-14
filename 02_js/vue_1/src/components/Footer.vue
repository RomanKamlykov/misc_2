<template>
  <footer class="footer">
    <div class="content">
      <div class="customer">
        <h4>CUSTOMER SERVISE</h4>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#catalog">Catalog</a></li>
          <li><a href="#updates">Updates</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contacts">Contacts</a></li>
        </ul>
      </div>

      <div class="items">
        <h4>ITEMS</h4>
        <ul>
          <li><a href="#items/rings">Rings</a></li>
          <li><a href="#items/hammers">Thor’s hammer</a></li>
          <li><a href="#items/axes">Axes</a></li>
          <li><a href="#items/pendants">Pendants</a></li>
          <li><a href="#items/chains">Chais and bracelets</a></li>
          <li><a href="#items/gold">Gold</a></li>
        </ul>
      </div>

      <div class="logo">
        <img src="../assets/img/05_footer/logo.png" alt="" />
      </div>

      <div class="contacts">
        <h4>CONTACT</h4>
        <form method="post">
          <input type="text" name="name" id placeholder="Your name" autocomplete="off" />
          <input type="text" name="email" id placeholder="Your e-mail" autocomplete="off" />
          <input type="text" name="message" id placeholder="Message" autocomplete="off" />
          <input type="submit" @click.prevent="" value="Send" />
        </form>
      </div>
    </div>
  </footer>
</template>
<script src="./Footer.js"></script>
<style lang="scss" src="./Footer.scss"></style>