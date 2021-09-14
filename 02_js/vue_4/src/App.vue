<!-- 3-й вариант -->

<template>
  <div>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>{{pokemons[0].name}}</div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    pokemons: gql`{
      pokemons(first: 2) {
        id
        name
      }
    }`
  }
}
</script>