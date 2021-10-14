<template>
  <div id="stats">
    <div class="conditionout">
      <div class="condmsg">
        <div class="condiitem">用户名：****</div>
        <div class="condiitem">当前月份：****</div>
        <div class="condiitem">当月统计总数：****条</div>
        <div class="condiitem">我的统计总数：****条</div>
      </div>
      <div class="condoption">
        <span :class="{'spanactive':showtype === 1}" @click="showType(1)">查看我的</span>
        <span :class="{'spanactive':showtype === 2}" @click="showType(2)">查看全部</span>
        <span>打 印</span>
      </div>
    </div>
    <div class="dataout">
      <div class="statslist" v-for="stats in statsList" :key="stats.id">
        <div class="statstit">{{stats.rname}}</div>
        <div class="statscon" v-for="node in stats.doctor" :key="node.id">{{node.doctorName}}：{{node.num}}</div>
      </div>
      <loding v-show="showLoding"></loding>
    </div>
  </div>
</template>

<script>
import loding from '../../components/loding'
import { getDoctorDrugs } from '../../api/mainApi'
export default {
  name: "stats",
  components:{loding},
  data(){
    return{
      showtype:1,
      showLoding:false,

      statsList:[]
    }
  },
  mounted() {
    this.showType(1);//默认展示当前用户统计的数据
    this.getDoctorDrugs();
  },
  methods:{
    //切换显示数据来源 1-当前用户  2-所有数据
    showType(type){
      this.showtype = type;
    },
    async getDoctorDrugs (){
      const data = await getDoctorDrugs();
      if (data.data.code === 200){
        this.doData(data.data.result)
      }
    },
    doData(data){
      data.map(x=>{
        let index = this.statsList.findIndex(y=>{ return x.drugs_id == y.drugs_id })
        if (index != -1)
          this.statsList[index].doctor.push({
            doctorName:x.dname,
            num:x['SUM(dd.num)']
          })
        else
          this.statsList.push({
            drugs_id:x.drugs_id,
            rname:x.rname,
            doctor:[{
              doctorName:x.dname,
              num:x['SUM(dd.num)']
            }]
          });
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  #stats{
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/img/mainbg.jpeg");
    background-position: center;
    background-size: 100%;
    overflow-y: auto;
    .conditionout{
      width: 80%;
      min-height: 100px;
      background-color: #ffffff;
      border-radius: 20px;
      margin: 20px auto;
      padding: 20px;
      .condiitem{
        font-size: 18px;
        color: #999999;
        width: 30%;
        padding: 10px;
        display: inline-block;
      }
      .condoption{
        padding-top: 30px;
        text-align: center;
        span{
          padding: 8px 15px;
          background-color: #999999;
          border-radius: 10px;
          margin: 0 20px;
          cursor: pointer;
        }
        .spanactive{
          color: #ffffff;
          background-color: #67c23a;
        }
      }
    }
    .dataout{
      width: 80%;
      min-height: 600px;
      background-color: #ffffff;
      border-radius: 20px;
      margin: 0 auto;
      margin-bottom: 20px;
      padding: 20px;
      position: relative;
      .statslist{
        padding: 20px;
        display: inline-block;
        vertical-align: top;
        .statstit{
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          color: #222222;
        }
        .statscon{
          padding-top: 10px;
          text-align: center;
          font-size: 14px;
          color: #999999;
        }
      }
    }
  }
</style>