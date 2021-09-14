import Item from '@/components/Item.vue'
import updates from '@/data/updates.json'

export default {
  name: 'Updates',
  components: {
    Item
  },
  data: function () {
    return {
      items: [], //items to display
      firstItem: '', //first item to display
      numberOfItems: '', //number of items to display
    }
  },
  methods: {
     //sets the number of items to display
    handleResize: function () {
      if ((window.innerWidth >= 1200) && (this.numberOfItems !== 4)) { //for desktops
        this.numberOfItems = 4;
        this.firstItem = 0;
      }
      if ((window.innerWidth < 1200) && (this.numberOfItems !== 3)) { //for tablets
        this.numberOfItems = 3;
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
    //shows all items from index == 0
    showAllUpdates: function() {
      this.firstItem = 0;
      this.numberOfItems = Number.MAX_VALUE;
    },
  },
  created: function () {
    this.items = updates;
    this.firstItem = 0;

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed: function () {
    window.removeEventListener('resize', this.handleResize);
  },
}