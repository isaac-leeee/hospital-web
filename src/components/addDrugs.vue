<template>
  <div id="adddoctor">
    <el-button @click="addFromOpen = true" type="success" round>添加药品</el-button>
    <el-button @click="showAllDoctor" type="success" round>查看药品</el-button>

    <el-dialog title="增加药品" :visible.sync="addFromOpen">
      <el-form ref="addform" :rules="addRules" :model="addFrom">
        <el-form-item prop="doctorName" label="药品名称 : ">
          <el-input v-model="addFrom.doctorName" placeholder="请输入药品姓名"></el-input>
        </el-form-item>
        <el-form-item prop="doctorPingying" label="药品拼音 : ">
          <el-input v-model="addFrom.doctorPingying" placeholder="请输入首字母缩写"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addFromOpen = false">取 消</el-button>
        <el-button size="small"  type="success" @click="addDoctor">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看药品" :visible.sync="showAllDoctorOpen">
      <div class="showOut">
        <span class="doclist" v-for="node in doctorList" :key="node.id">{{node.name+' - '+node.pingying}} <i class="el-icon-delete" @click="deleteDoctor(node)"></i></span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small"  type="success" @click="showAllDoctorOpen = false">关 闭</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {addDrugs,showAllDrugs,deleteDrugs} from '../api/mainApi'
export default {
  name: "addDoctor",
  data(){
    return{
      addFromOpen:false,
      addFrom:{
        doctorName:'',
        doctorPingying:''
      },
      showAllDoctorOpen:false,
      doctorList:[],
      addRules: {
        doctorName: [
          {
            required: true,
            message: "请输入药品名称",
            trigger: "blur"
          }
        ],
        doctorPingying: [
          {
            required: true,
            message: "请输入药品首字母缩写",
            trigger: "blur"
          }
        ]
      },
    }
  },
  methods:{
    //添加药品
    async addDoctor(){
      this.$refs.addform.validate(async valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          const data = await addDrugs({
            doctorName:this.addFrom.doctorName,
            doctorPingying:this.addFrom.doctorPingying
          })
          if (data.data.code === 200) {
            this.$message.success(data.data.msg);
          }else{
            this.addFrom.doctorName = '',
            this.addFrom.doctorPingying = '',
            this.$message.error(data.data.msg);
          }
          loading.close();
        }
      })
    },
    //查看全部药品
    async showAllDoctor(){
      this.showAllDoctorOpen = true
      const data = await showAllDrugs()
      if (data.data.code === 200) {
        this.doctorList = data.data.result;
      }
    },
    //删除药品
    async deleteDoctor(node){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = await deleteDrugs({
          doctorName:node.name,
          doctorPingying:node.pingying
        })
        if (data.data.code === 200) {
          this.$message.success(data.data.msg);
          this.doctorList = data.data.result;
        }
      })
    }
  }
}
</script>

<style lang="scss">
#adddoctor{
  display: inline-block;
  .el-form-item__content{display: inline-block}
  .showOut{
    padding: 20px;
    .doclist{
      margin-right: 10px;
      vertical-align: top;
      padding: 5px 15px;
      background-color: #999999;
      color: #f2f2f2;
      font-size: 14px;
      border-radius: 5px;
      display: inline-block;
      margin-bottom: 10px;
      i{cursor: pointer}
      i:hover{color: #ab4d4d;}
    }
  }
}
</style>