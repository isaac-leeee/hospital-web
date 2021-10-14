<template>
  <div id="main">
    <div class="abcout">
      <span class="letterout" :class="{'activeLetter':node == activeLetter}" @click="findDoctor(node)" v-for="node in doctorList" :key="node.id">{{node}}</span>
    </div>

    <div class="doctorout">
      <div class="doctorlist" v-for="node in findDoctorList" :key="node.name" @click="openAddStatistics(node)">
        <span>{{node.name}}</span>
        <i class="el-icon-s-help"></i>
      </div>
      <div class="nullpage" v-show="findDoctorList.length === 0"><img src="../../assets/img/null.png" alt=""></div>
      <loding v-show="showLoding"></loding>
    </div>

    <div class="addoption">
      <el-button @click="toStatsPage" class="ststsbtn" type="success" round>查看统计</el-button>
      <addDoctor></addDoctor>
      <addDrugs></addDrugs>
    </div>

    <el-dialog title="增加药品" :visible.sync="doctorOpen">
      <el-form :model="drugForm">
        <el-form-item label="当前医生 : ">
          <span class="nowdoctor">{{touchDoctorNode.name}}</span>
        </el-form-item>
        <el-form-item label="药品名称 : ">
          <el-autocomplete
              popper-class="drugin"
              class="inline-input drugin"
              v-model="drugForm.drugname"
              :trigger-on-focus="false"
              :fetch-suggestions="querySearch"
              placeholder="请输入药品首字母缩写"
              @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="药品数量 : ">
          <span class="drugnum" @click="drugnumActive = node" :class="{'drugnumactive':node == drugnumActive}" v-for="node in drugnumList" :key="node.id">{{node}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="doctorOpen = false">取 消</el-button>
        <el-button size="small"  type="success" @click="submitDrugs">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import addDoctor from "../../components/addDoctor";
import addDrugs from "../../components/addDrugs";
import loding from "../../components/loding"
import { findDoctor,findDrugs,submitDrugs } from '../../api/mainApi'
export default {
  name: "main",
  data(){
    return{
      doctorList:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      drugnumList:[1,2,3,4,5,6,7,8,9,10,11,12],
      activeName: '1',
      activeLetter:'',
      drugnumActive:1,//添加的药品数量
      doctorOpen:false,
      nowDoctor:'李春秋',
      showLoding:false,
      drugForm:{
        drugname:''
      },
      restaurants: [],
      findDoctorList:[],
      allAnotherDrugs:[],
      touchDoctorNode:'',
      touchDrugsNode:'',
    }
  },
  components:{addDoctor,addDrugs,loding},
  methods:{
    //通过首字母查询医生列表
    async findDoctor(node){
      this.showLoding = true
      this.activeLetter = node;
      const data = await findDoctor({doctorPingying:node})
      if (data.data.code === 200){
        this.findDoctorList = data.data.result;
      }else {
        this.$message.error(data.data.msg)
      }
      this.showLoding = false;
    },
    async openAddStatistics(node){
      this.doctorOpen = true;
      this.touchDoctorNode = node;
    },
    //药品的联想模糊搜索
    async querySearch(queryString, cb) {
      const data = await findDrugs({drugsPingying:queryString})
      if (data.data.code === 200){
        this.allAnotherDrugs = data.data.result.map((x) => {
          return {
            id:x.id,
            value: x.name,
            address: x.pingying,
          };
        });
        // 调用 callback 返回建议列表的数据
        cb(this.allAnotherDrugs);
      }else {
        this.$message.error(data.data.msg)
      }
    },
    //选中的药品
    handleSelect(item) {
      this.touchDrugsNode = item;
    },
    //提交医生所开具的药品
    async submitDrugs(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if (this.drugForm.drugname == '') {
        this.$message.error('请先填写药品')
        return
      }
      const data = await submitDrugs({
        userId:1,
        doctorId:this.touchDoctorNode.id,
        drugsId:this.touchDrugsNode.id,
        num:this.drugnumActive,
        drugsName:this.touchDrugsNode.value,
      })
      if (data.data.code === 200){
        this.doctorOpen = false;
        this.drugForm.drugname = '';
        this.$message.success(data.data.msg)
      }else {
        this.$message.error(data.data.msg)
      }
      loading.close();
    },
    //跳转到我到统计页面
    toStatsPage(){
      this.$router.push('/stats')
    }
  }
}
</script>

<style lang="scss">
  #main{
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/img/mainbg.jpeg");
    background-position: center;
    background-size: 100%;
    .el-input__inner{width: 400px;}
    .drugnum{
      padding: 5px 10px;
      background-color: #f2f2f2;
      color: #999999;
      font-size: 16px;
      border-radius: 3px;
      margin-right: 8px;
      cursor: pointer;
    }
    .drugnum:hover{
      color: #ffffff;
      background-color: #42b983;
    }
    .drugnumactive{
      color: #ffffff;
      background-color: #42b983;
    }

    .abcout{
      padding: 20px;
      text-align: center;
      min-height: 80px;
      width: 80%;
      margin: 0 auto;
      .letterout{
        vertical-align: bottom;
        color: #ffffff;
        font-size: 36px;
        font-weight: bold;
        cursor: pointer;
        display: inline-block;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
      }
      .letterout:hover{
        font-size: 62px;
        color: #42b983;
      }
      .activeLetter{
        font-size: 62px;
        color: #42b983;
      }
    }
    .doctorout{
      padding: 20px;
      background-color: #ffffff;
      border-radius: 20px;
      min-height: 400px;
      max-height: 600px;
      overflow: auto;
      width: 80%;
      margin: 0 auto;
      position: relative;
      .nullpage{
        text-align: center;
      }
      .doctorlist{
        width: 177px;
        text-align: center;
        cursor: pointer;
        height: 50px;
        padding: 0 10px;
        font-size: 28px;
        line-height: 50px;
        background-color: #cccccc;
        color: #999999;
        border-radius: 5px;
        display: inline-block;
        vertical-align: top;
        margin-right: 20px;
        margin-top: 20px;
      }
      .doctorlist:hover{
        background-color: #42b983;
        color: #ffffff;
      }
    }
    .addoption{
      position: absolute;
      bottom: 20px;
      left: 3%;
      .ststsbtn{margin-right: 10px}
    }
  }
</style>