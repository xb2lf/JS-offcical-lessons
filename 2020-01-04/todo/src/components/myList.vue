<template>
  <li
    :class="{
                        completed:pv.checked,
                        editing:pv.onoff,
                    }"
  >
    <div class="view">
      <input class="toggle" type="checkbox" v-model="pv.checked" @change="checkedChange" />
      <label @dblclick="replace">{{pv.txt}}</label>
      <!-- @dblclick="replace(val,key)" -->
      <button class="destroy" @click="delFn"></button>
    </div>
    <input
      class="edit"
      ref="edit"
      :value="pv.txt"
      @blur="off(pv,$event)"
      @keyup.13="off(pv,$event)"
      @keyup.esc="onoff_FN(pv.id,false)"
    />
  </li>
</template>

<script>
export default {
  props: ["pv","arr"],
  data() {
    return {
      // val:Object.assign({},this.pv)
    };
  },
  methods: {
    checkedChange(ev) {
      const { checked } = ev.target;
      const { id } = this.pv;
      this.pv.checked = checked;
      this.$emit("cc", id, checked);
    },
    delFn(ev) {
      const { id } = this.pv;
      this.$emit("del", id);
    },
    // 双击修改
    replace() {
     const { id } = this.pv;
      this.onoff_FN(id, true); // 打开开关，切换到输入框
      this.$nextTick(() => {
        this.$refs.edit.select(); // 自动聚焦并选中
      });
    },
    //    // 失焦
    off({ id, txt, onoff }, ev) {
      if (!onoff) return;
      const { value } = ev.target;
      //修内容并且内容不一样，这个时候才需要修改数据
      if (value && txt != value) {
        this.arr.forEach(e => {
          if (e.id === id) {
            e.txt = value;
          }
        });
      }
      this.onoff_FN(id, false); // 关闭开关
    },
    //公共是否失焦的开关
    onoff_FN(id, b) {
      this.arr.forEach(e => {
        if (e.id === id) {
          e.onoff = b;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>