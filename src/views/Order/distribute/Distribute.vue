<template>
  <div>
    <el-row>
      <el-col :span="2" class="el-col title-ct"><strong class="title">派单列表</strong></el-col>
      <el-col :span="22" class="el-col-23"><strong class="title"></strong></el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="8" class="el-col">
          <el-form-item label="区域" size="large">
            <el-select v-model="form.area" filterable placeholder="请选择" v-on:change="areaChange">
              <el-option
                v-for="(itemR,indexR) in area"
                :key="indexR"
                :label="itemR.name"
                :value="itemR.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el-col">
          <el-form-item label="维修厂列表" size="large">
            <el-select v-model="form.rfRid" filterable placeholder="请选择">
              <el-option
                v-for="(itemR,indexR) in areaRelation"
                :key="indexR"
                :label="itemR.name"
                :value="itemR.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el-col">
          <el-form-item label="保险公司联系人" size="large">
            <el-select v-model="form.inId" filterable placeholder="请选择" v-on:change="insuranceChange">
              <el-option
                v-for="(itemR,indexR) in insurance"
                :key="indexR"
                :label="itemR.name"
                :value="itemR.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="el-col">
          <el-form-item label="保险公司联系人" size="large">
            <el-select v-model="form.inRid" filterable placeholder="请选择">
              <el-option
                v-for="(itemR,indexR) in insuranceRelation"
                :key="indexR"
                :label="itemR.name"
                :value="itemR.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="el-col">
          <el-form-item label="派单状态" size="large">
            <el-select v-model="form.scheduleStatus" filterable placeholder="请选择" v-on:change="insuranceChange">
              <el-option
                v-for="(itemR,indexR) in scheduleStatus"
                :key="indexR"
                :label="itemR.name"
                :value="itemR.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="el-col">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button type="primary" @click="onSend" icon="el-icon-setting">批量发布</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="onCreate" icon="el-icon-circle-plus">创建</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="onExport" icon="el-icon-download">导出</el-button>
      </el-col>
      <el-col :span="6">
        <el-upload
          class="upload-demo"
          action="/api/order/importOrder"
          :on-preview="handlePreview"
          :show-file-list="false"
          name="files"
          :headers="header"
          :on-exceed="handleExceed"
          :on-success="handleSuccess">
          <el-button type="primary" icon="el-icon-upload">上传</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row class="right">
      <el-col :span="22" class="el-col-22">
      </el-col>

      <el-col :span="1" class="btn">
        <v-create v-if="addVisible" :visible.sync="addVisible" @loadData="loadData()"></v-create>
        <v-edit v-if="editVisible" :visible.sync="editVisible" v-bind:id="id" @loadData="loadData()"></v-edit>
      </el-col>
      <el-col :span="1" class="btn"></el-col>
      <el-col :span="1" class="btn">

      </el-col>
      <el-col :span="1" class="btn"></el-col>
      <el-col :span="1" class="btn">
      </el-col>
    </el-row>
    <el-row class="table">
      <el-col :span="23">
        <div>
          <el-table
            :data="tableData"
            border
            header-row-class-name="head"
            style="width: 100%"
            @select="onSelect"
            @select-all="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="no"
              label="派单号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="accidentNo"
              label="事故号"
              width="250">
            </el-table-column>
            <el-table-column
              prop="insuranceName"
              label="保险公司"
              width="150">
            </el-table-column>
            <el-table-column
              prop="insuranceRelationName"
              label="定损人"
              width="180">
            </el-table-column>
            <el-table-column
              prop="areaName"
              label="所属区域"
              width="150">
            </el-table-column>
            <el-table-column
              prop="carNo"
              label="车牌号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="card"
              label="车型"
              width="300">
            </el-table-column>
            <el-table-column
              prop="rfName"
              label="回收单位"
              width="300">
            </el-table-column>
            <el-table-column
              prop="createName"
              label="创建人"
              width="150">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="最后更新时间"
              width="180">
            </el-table-column>
            <!--                        <el-table-column-->
            <!--                                prop="receiveTime"-->
            <!--                                label="收件时间"-->
            <!--                                width="180">-->
            <!--                        </el-table-column>-->
            <el-table-column
              prop="scheduleStatus"
              label="派单状态"
              width="180">
            </el-table-column>
            <el-table-column
              prop="status"
              label="回收状态"
              width="100">
            </el-table-column>
            <el-table-column
              label="操作"
              width="250">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.id)" type="primary" icon="el-icon-edit">
                  编辑
                </el-button>
                <el-button type="primary" icon="el-icon-delete" @click="onDel(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23" class="pagination">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.page"
            :page-sizes="pageList"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Create from './Create'
  import Edit from './Edit'

  export default {
    name: 'Distribute',
    data () {
      return {
        list: [],
        form: {
          inId: '',
          inRid: '',
          area: '',
          rfId: '',
          rfRid: '',
          scheduleStatus: 2,
          //     region: '全部',
          status: 2,
          page: 1,
          partStatus: '',
          pageSize: 10,
          innerWorkerId: '',
          outWorkId: '',
          keyword: '',
          createStartTime: '',
          createEndTime: ''
        },
        area: [],
        scheduleStatus: [
          {
            id: 1,
            name: '未回收'
          },
          {
            id: 2,
            name: '部分回收'
          },
          {
            id: 3,
            name: '已回收'
          },
          {
            id: 4,
            name: '放弃回收'
          },
          {
            id: 5,
            name: '全部忽略'
          }
        ],
        areaRelation: [],
        insuranceRelation: '',
        selectAll: false,
        role: [],
        tableData: [],
        pageList: [10, 20, 50, 100],
        total: 0,
        insurance: '',
        addVisible: false,
        editVisible: false,
        id: 0,
        multipleSelection: [],
        header: {
          Authorization: ''
        },
        idArr: []
      }
    },
    created: function () {
      let Authorization = localStorage.getItem('Authorization')
      this.header.Authorization = Authorization
      this.getInsurance()
      this.getArea()
      this.loadData()
    },
    methods: {
      onSubmit () {
        this.loadData()
      },
      onCreate () {
        this.addVisible = true

      },
      onExport () {

      },
      handleClick (id) {
        this.editVisible = true
        this.id = id
      },
      handleSizeChange (val) {
        this.form.pageSize = val
        this.loadData()
      },
      handleCurrentChange (val) {
        this.form.page = val
        this.loadData()
      },
      onDel (id) {
        let _this = this
        _this.$confirm('是否要删除订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Vue.axios.post('/api/order/del', {id: id}).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'fail',
                message: '删除失败!'
              })
            }

            _this.loadData()
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleSuccess (response, file, fileList) {
        this.loadData()
      },
      loadData () {
        let Authorization = localStorage.getItem('Authorization')
        Vue.axios.post('/api/order/listAll', this.form, {headers: {Authorization: Authorization}}).then(res => {
          let data = res.data.data
          let _this = this
          _this.total = data.count
          _this.form.page = data.page
          _this.form.pageSize = data.pageSize
          _this.tableData = data.list
          if (res.data.code === 202) {
            this.$router.push('/login')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleSelectionChange (val) {
        let _this = this
        _this.multipleSelection = val
        if (val.length !== 0) {
          for (let i = 0; i < val.length; i++) {
            _this.idArr.push(val[i].id)
          }
        } else {
          _this.idArr = []
        }

        console.log(_this.idArr)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      handlePreview (file) {
        console.log(file)
      },
      onSend () {
        let _this = this
        if (_this.idArr.length === 0) {
          this.$message.warning(`没有选择要发布的订单，请选择订单`)
        }
        Vue.axios.post('/api/order/send', {idArr: _this.idArr}).then(res => {
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
          _this.loadData()
        }).catch(error => {
          console.log(error)
        })
      },
      onSelect (selection, row) {
        let _this = this
        if (selection.length === 0) {
          for (let i = 0; i < _this.idArr.length; i++) {
            if (_this.idArr[i] === row.id) {
              _this.idArr.splice(i, 1)
            }
          }
        } else {
          _this.idArr.push(row.id)
        }
        console.log(_this.idArr)
      },
      getInsurance () {
        let _this = this
        Vue.axios.post('/api/common/getAllInsurance').then(function (res) {
          _this.insurance = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      insuranceChange () {
        let _this = this
        Vue.axios.post('/api/common/getAllInsuranceRelation', {inId: this.form.inId}).then(res => {
          _this.insuranceRelation = res.data.data
        }).catch(error => {
          console.log(error)
        })
      },
      areaChange () {

      },
      getArea () {
        let _this = this
        Vue.axios.post('/api/common/getAllArea').then(res => {
          _this.area = res.data.data
        }).catch(error => {
          console.log(error)
        })
      },
      areaChange () {
        let _this = this
        Vue.axios.post('/api/common/getRepair', {area: _this.form.area}).then(res => {
          _this.areaRelation = res.data.data
        }).catch(error => {
          console.log(error)
        })
      }
    },
    components: {
      'v-create': Create,
      'v-edit': Edit
    },
  }
</script>
<style>
  .main {
    bottom: 0;
    left: 240px;
    right: 0;
    background-color: #efefef;
    padding: 20px 20px 0;
    overflow: auto;
  }

  .el-col-24 {
    width: 100%;
  }

  .el-col-1, .el-col-2, .el-col-3, .el-col-4, .el-col-5, .el-col-6, .el-col-7, .el-col-8, .el-col-9, .el-col-10, .el-col-11, .el-col-12, .el-col-13, .el-col-14, .el-col-15, .el-col-16, .el-col-17, .el-col-18, .el-col-19, .el-col-20, .el-col-21, .el-col-22, .el-col-23, .el-col-24 {
    float: left;
    box-sizing: border-box;
  }

  .el-col strong {
    text-align: left;
  }

  .title-ct {
    margin-bottom: 15px;
    font-size: 16px;
    border-left: 4px solid #2dd46d;
    padding-left: 10px;
    letter-spacing: 1px;
  }

  .list-page .btn-group {
    padding-bottom: 10px;
    text-align: right;
  }

  .btn {
    text-align: right;
    float: right;
    margin-right: 10px;
  }

  .right {
    margin-top: 2%;
    margin-right: 6%;
  }

  .table {
    z-index: 100;
    margin-top: 1%;
  }

  .el-col-11 {
    z-index: 50;
  }

  .pagination {
    margin-top: 2%;
  }
</style>
