<template>
  <section class="todoapp">
    <div>
      <MyHeader @cv="add"/>
      <MyList :listdata="filterAry" 
	  @crm="prm"/>
      <MyFooter 
	  :num="ary |  leng"
	  @chs="changeHash"/>
    </div>
  </section>
</template>

<script>
import MyHeader from "./components/MyHeader";
import MyList from "./components/MyList";
import MyFooter from "./components/MyFooter";
export default {
  data() {
    return {
      hash: window.location.hash || "#/all",
      ary: [
        {
          txt: "今天你好吗",
          id: 0,
          checked: false,
          onoff: false
        },
        {
          txt: "今天我很好",
          id: 1,
          checked: false,
          onoff: false
        }
      ]
    };
  },
  computed: {
    filterAry() {
      const { hash, ary } = this;
      let a = ary.filter(item => {
        switch (hash) {
          case "#/all":
            return item;
          case "#/unchecked":
            return !item.checked;
          case "#/checked":
            return item.checked;

          default:
			return item;
            break;
        }
	  });
	  return a;
    }
  },
  methods:{
      add(txt){
         this.ary.unshift({
			  txt:txt,
              id:Date.now(),
              checked:false,
              onoff:false 
		 },)
	  },
	  prm(id) {
		  this.ary = this.ary.filter(item => item.id !== id);
	  },
	  changeHash(val) {
		  this.hash = val;
	  }
  },
  filters:{
     leng(val) {
		 return val.filter(item => item.checked).length;
	 }
  },
  components: {
    MyHeader,
    MyList,
    MyFooter
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

body {
  font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
  font-weight: 300;
}

button,
input[type="checkbox"] {
  outline: none;
}

.hidden {
  display: none;
}

.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }

  .toggle-all {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-appearance: none;
    appearance: none;
  }
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filters {
    bottom: 10px;
  }
}
</style>