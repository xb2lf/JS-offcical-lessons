<template>
  <div class="about2">
    <h1>THis is an about2 page</h1>
    <p>{{$store.state.a.num}}</p>
    <p>{{$store.state.b.val}}</p>
    <p>{{ reversers}}</p>
    <button @click="del">-</button>
    {{num2}}
    <button @click="add">+</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
//   created() {
//     console.log(this.$store);
//   },
  methods: {
    ...mapMutations(["a/CHANGE_NUM2"]),
    del() {
      this["a/CHANGE_NUM2"]("DECRMENT");
    },
    add() {
      this["a/CHANGE_NUM2"]("INCRMENT");
    }
  },
  computed: {
    ...mapState({
      num2: state => state.a.num2
    }),
    ...mapGetters({
        reversers:"b/reverse",
    })
    // reversers() {
    //   return this.$store.state.b.val
    //     .split("")
    //     .reverse()
    //     .join("");
    // }
  }
};
</script>

<style lang="scss" scoped>
</style>