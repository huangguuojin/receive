<template>
  <div class="create">
    <el-dialog title="编辑派单" :visible.sync="visible"  :show-close="false">
      <el-tabs type="border-card">
        <el-tab-pane label="详细信息">
          <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="活动名称">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="派单来源">
                <el-select v-model="form.source" placeholder="请选择" >
                  <el-option
                    v-for="item in source"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="保险公司">
              <el-select v-model="form.inId" filterable placeholder="请选择" v-on:change="insuranceChange(form.inId)">
                <el-option
                  v-for="(item,index) in insurance"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保险公司联系人" size="large">
              <el-select v-model="form.inRid" filterable placeholder="请选择" >
                <el-option
                  v-for="(itemR,indexR) in insuranceRelation"
                  :key="indexR"
                  :label="itemR.name"
                  :value="itemR.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="事故号"  class="input">
              <el-input v-model="form.accidentNo"></el-input>
            </el-form-item>
            <el-form-item label="修理厂">
              <el-col :span="11">
                <el-select v-model="form.rfId" filterable placeholder="请选择" v-on:change="repairFactoryChange(form.rfId)">
                  <el-option
                    v-for="(item,index) in repairFactory"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="2"></el-col>
              <el-col :span="11">
                <el-button type="primary" @click="addRepairFactory">增加修理厂</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="修理厂联系人" size="large">
              <el-select v-model="form.rfrId" filterable placeholder="请选择" >
                <el-option
                  v-for="(itemR,indexR) in repairFactoryRelation"
                  :key="indexR"
                  :label="itemR.name"
                  :value="itemR.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车牌号"  class="input">
              <el-input v-model="form.cardNo"></el-input>
            </el-form-item>
            <el-form-item label="车架号"  class="input">
              <el-input v-model="form.carFrameNo"></el-input>
            </el-form-item>
            <el-form-item label="车型"  class="input">
              <el-input v-model="form.card"></el-input>
            </el-form-item>
            <el-form-item label="报案人"  class="input">
              <el-input v-model="form.report"></el-input>
            </el-form-item>
            <el-form-item label="责任方"  class="input">
              <el-input v-model="form.responsibility"></el-input>
            </el-form-item>
            <el-form-item label="定损金额"  class="input">
              <el-input v-model="form.responsibility"></el-input>
            </el-form-item>
            <el-form-item label="定损时间" >
            <el-date-picker
              v-model="form.fixDate"
              type="datetime"
              placeholder="选择日期时间" class="input">
            </el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.remark" class="input"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="零件列表">
          <el-form :model="form" ref="form">
            <el-table :data="parts" border stripe style="width: 100%;">
              <el-table-column prop="name" label="姓名">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="保险图片">角色管理</el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: "Edit",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      id: 0
    },
    created: function () {
      this.getOne()
      this.getInsurance()
      this.getRepairFactory()
    },
    data() {
      return {
        form: {
          id: this.id,
          type: 1,
          source:1,
          inId: '',
          inRid: '',
          accidentNo: '',
          rfId: '',
          rfrId: '',
          cardNo: '',
          carFrameNo: '',
          card: '',
          report: '',
          responsibility: '',
          fixMoney: 0.00,
          fixDate: '',
          remark: '',
          parts: [],
        },
        formLabelWidth: '120px',
        type: [
          {
            id: 1,
            name: '自提'
          },
          {
            id: 2,
            name: '邮寄',
          },
          {
            id: 3,
            name: '代送'
          },
          {
            id: 4,
            name: '其他'
          }
        ],
        source: [
          {
            id: 1,
            name: '微信'
          },
          {
            id: 2,
            name: '电话',
          },
          {
            id: 3,
            name: '公告'
          },
          {
            id: 4,
            name: '其他'
          }
        ],
        insurance:[],
        insuranceRelation: [],
        repairFactory: [],
        repairFactoryRelation: [],
        parts: []
      };
    },
    methods: {
      cancelModal() {
        // 关闭弹窗，触发父组件修改visible值
        this.$emit('update:visible', false);
      },
      onSubmit(){
        let _this  = this
        Vue.axios.post('/api/area/updateInfo', _this.form).then(function (res) {
          _this.$emit('update:visible', false);
          _this.$emit('loadData')
        }).catch(function (error) {
        })
      },
      getInsurance(){
        let _this = this
        Vue.axios.post('/api/common/getAllInsurance').then(function (res) {
          _this.insurance = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      getOne(){
        Vue.axios.post('/api/order/view', {id: this.id}).then(res => {
          let data = res.data.data;
          let _this = this;
          _this.form.type = data.type
          _this.form.source = data.source
          _this.form.inId = data.inId
          _this.form.inrId = data.inrId
          _this.form.accidentNo = data.accidentNo
          _this.form.rfId = data.rfId
          _this.form.rfrId = data.rfrId
          _this.form.cardNo = data.cardNo
          _this.form.carFrameNo = data.carFrameNo
          _this.form.card = data.card
          _this.form.report = data.report
          _this.form.responsibility = data.responsibility
          _this.form.fixMoney = data.fixMoney
          _this.form.fixDate = data.fixDate
          _this.form.remark = data.remark
          _this.parts = data.parts
        }).catch(error => {
          console.log(error)
        })
      },
      insuranceChange(val){
        let _this = this
        Vue.axios.post('/api/common/getAllInsuranceRelation', {inId: val}).then(res => {
          _this.insuranceRelation = res.data.data
        }).catch(error => {
          console.log(error)
        })
      },
      getRepairFactory(){
        let _this = this
        Vue.axios.post('/api/common/getAllRepair').then(res => {
          _this.repairFactory = res.data.data
        }).catch(error => {
          console.log(error)
        })
      },
      addRepairFactory(){

      },
      repairFactoryChange(val){
        let _this = this
        Vue.axios.post('/api/common/getRepairFactoryRelation', {rfId: val}).then(res => {
          _this.repairFactoryRelation = res.data.data
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .create{
    text-align: left;
  }
  .input {
    width: 50%;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
