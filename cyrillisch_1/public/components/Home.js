const template2 = `
  <div>
    <div>
      <input type="text" v-model="text" v-on:keyup.enter="search">
    </div>
    <p>
      {{ eng }}
    </p>
    <p>
      {{ cyrillisch }}
    </p>
  </div>
`;

const template = `
  <div>
    <div>
      <input type="text" v-model="text" v-on:keyup.enter="search">
    </div>
    <div class="cyr">
      <div v-for="(item, index) in cyrillisch" :key="index">
        <div>{{ item.wordEng }}</div>
        <div>{{ item.wordCyr }}</div>
      </div>
    </div>
  </div>
`;

function data() {
  return {
    text: '',
    // cyrillisch: '',
    cyrillisch: [],
    eng: '',
  }
}

const methods = {
  search: async function() {
    const url = '/api/convert'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: this.text })
    }

    const response = await fetch(url, options);
    const data = await response.json();
    this.cyrillisch = data.cyrillisch;
    this.eng = this.text;
  }
}

export const Home = { template, data, methods }
