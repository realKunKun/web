
<template>
  <div class="grid">
    <div class="main">
        <div class="sub-grid1">
          <table>
            <tr v-for="(item,index) in arr" v-on:click="choose(item,index)">
              <td>
                <el-button type="info" style="width: 10px;height: 10px;" circle></el-button>
                {{item.string}}
              </td>
            </tr>
          </table>
        </div>
        <div class="sub-grid2">
          <table>
            <tr v-for="(item,index) in after_arr">
              <td>
                {{item.string}}
              </td>
            </tr>
          </table>
        </div>
        <div class="sub-grid3">
          <table>
            <tr v-for="(item,index) in info_arr">
              <td>
                {{item.string}}
              </td>
            </tr>
          </table>
        </div>
    </div>
    <div class="item2">
      <table>
        <tr v-for="(item,index) in machine_arr">
          <td>
            {{item.string}}
          </td>
        </tr>
      </table>
    </div>
    <div class="item3">
      <table>
        <tr v-for="(item,index) in chosen_arr">
          <td>
            {{item.string}}
          </td>
        </tr>
      </table>
    </div>
    <div class="item4">
      <table>
        <tr v-for="(item,index) in chosen_info_arr">
          <td>
            {{item.string}}
          </td>
        </tr>
      </table>
    </div>
    <div class="item5">
      <el-button type="primary" onclick="mySave()">SAVE</el-button>
      <el-button type="primary" onclick="myDownload()">Download</el-button>
      <el-button type="primary" onclick="myMark()">Mark</el-button>
      <el-button type="primary" onclick="myRemove()">Remove</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      arr: [{'string':'this is first original text'},{'string':'this is second original text'},{'string':'this is third original text'},{'string':'this is forth original text'}],
      after_arr:[{'string':'this is first translation'},{'string':'this is second translation'},{'string':'this is third translation'},{'string':'this is forth translation'}],
      info_arr:[{'string':'this is related information'},{'string':'this is another related information'}],
      machine_arr:[{'string':'this is machine translation'},{'string':'this is another machine translation'}],
      chosen_arr:[],
      chosen_info_arr:[],
      jack : 'jack'
    }
  },
  methods:{
    choose(item, index){
    this.chosen_arr=[]
    this.chosen_info_arr=[]
    this.chosen_arr.push(item)
    this.chosen_info_arr.push(this.after_arr[index])
    },
    myRemove(){
      this.chosen_arr=[]
      this.chosen_info_arr=[]
    },
    mySave(){
      this.$alert("Hello Vue Simple Alert.");
    },
    myDownload(){
      this.$confirm("Are you sure?").then(() => {
        //do something...
      });
    },
    myMark(){
      this.$prompt("Input your name").then(text => {
        // do somthing with text
      });
    }
  }
}
</script>
<style scoped>
.grid{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(6,1fr);
  height: 100%;
  width: 100%;
  font-size: 25px;
}

.grid>div{
  margin: 2px;
  min-height: 400px;
  background-image: url("../assets/translationpage.jpg");
}

.main{
  display: grid;
  grid-column: span 3;
  grid-row: span 3;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: repeat(1,3fr);
}

.sub-grid1,.sub-grid2,.sub-grid3{
  max-width: 100%;
  width: 100%;
  display: block;
  grid-column: span 1;
  overflow: hidden;
}

.item2{
  grid-column: span 1;
  grid-row: span 6;
}

.item3,.item4,.item5{
  grid-row: span 3;
  grid-column: span 1;
  overflow: hidden;
}
table{width:100%; max-width:100%;
  margin: 20px auto 0;
  border-spacing: 10px 10px;
  }
th{width:100%;}
td{background-color:antiquewhite;width: 100%;}
tr input{width:100%; height:30px;outline:none; border: 1px solid #333333;overflow:auto;WORD-WRAP: break-word;}
tr{border: 1px solid #333333;}
el-button{width: 100%;height: 100%;margin-top: 10px;}
</style>