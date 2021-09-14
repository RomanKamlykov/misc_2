import Item from '@/components/Item.vue'
import bestsellers from '@/data/bestsellers.json'
import categories from '@/data/categories.json'

export default {
  name: 'Bestsellers',
  components: {
    Item,
  },
  data: function () {
    return {
      categories: [],
      activeCategory: '',

      items: [], //items to display
      firstItem: '', //first item to display
      numberOfItems: '', //number of items to display
    }
  },
  computed: {
    //an array of filtered items
    filteredItems: function () {
      if (this.activeCategory === 'all') { return this.items; }
      return this.items.filter(item => item.category === this.activeCategory)
    },
  },
  methods: {
    //sets the number of items to display
    handleResize: function () {
      if ((window.innerWidth >= 1200) && (this.numberOfItems !== 8)) { //for desktops
        this.numberOfItems = 8;
        this.firstItem = 0;
      }
      if ((window.innerWidth < 1200) && (this.numberOfItems !== 9)) { //for tablets
        this.numberOfItems = 9;
        this.firstItem = 0;
      }
    },
    //switches the page
    nextPage: function (arrayLehgth, num) {
      let newFirstItem = this.firstItem + this.numberOfItems * num;

      if (arrayLehgth <= this.numberOfItems) { return } //arrows won`t work
      if (newFirstItem >= arrayLehgth) { newFirstItem = 0 } //go to first page
      if (newFirstItem < 0) { (newFirstItem = (arrayLehgth - (arrayLehgth%this.numberOfItems||this.numberOfItems))) } //go to last page
      this.firstItem = newFirstItem;
    },
    //sets activeCategory
    setActiveCategory: function (categoryName) {
      this.firstItem = 0;
      this.activeCategory = categoryName;
    },
  },
  created: function () {
    this.categories = categories;
    this.items = bestsellers;
    this.activeCategory = 'all';
    this.firstItem = 0;

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed: function () {
    window.removeEventListener('resize', this.handleResize);
  },
}