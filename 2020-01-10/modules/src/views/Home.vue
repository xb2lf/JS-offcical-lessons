<template>
  <div class="home">
    <First></First>
    <Second></Second>
  </div>
</template>

<script>
// @ is an alias to /src
import First from './first';
import Second from './second';

export default {
  name: 'home',
  components: {
     First,
     Second,
  }
}
</script>
