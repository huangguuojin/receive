<template>
  <div>
    <el-row>
      <el-col :span="2" class="el-col title-ct"><strong class="title">职员列表</strong></el-col>
      <el-col :span="22" class="el-col-23"><strong class="title"></strong></el-col>
    </el-row>
    <el-row>
      <el-form ref="form" :model="form" label-width="80px">
        <el-col :span="6" class="el-col">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="el-col">
          <el-form-item label="角色">
            <el-select v-model="form.role" placeholder="角色">
              <el-option
                v-for="(item,index) in role"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="ec-col-6">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="状态">
              <el-option label="全部" value=-1></el-option>
              <el-option label="启用" value=1></el-option>
              <el-option label="冻结" value=2></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="el-col-6">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row class="right">
      <el-col :span="22" class="el-col-22">
      </el-col>
      <el-col :span="1" class="btn">
        <el-button type="primary" @click="onCreate">创建</el-button>
        <v-create v-if="addVisible" :visible.sync="addVisible" @loadData="loadData()"></v-create>
        <v-edit v-if="editVisible" :visible.sync="editVisible" v-bind:id="id" @loadData="loadData()"></v-edit>
      </el-col>
      <el-col :span="1" class="btn"></el-col>
      <el-col :span="1" class="btn">
        <el-button type="primary" @click="onExport">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="table">
      <el-col :span="23">
        <div>
          <el-table
            :data="tableData"
            border
            header-row-class-name="head"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="150">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="250">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="最后更新时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              width="150">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.id)" type="button" size="small"
                           v-if="scope.row.status === 1">修改
                </el-button>
                <el-button type="button" size="small" @click="onEnable(scope.row.id, scope.row.status)">{{scope.row.status === 1? '冻结':'启用'}}</el-button>
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
    name: 'Account',
    data() {
      return {
        list: [],
        form: {
          //     region: '全部',
          name: '',
          role: '',
          status: '',
          page: 1,
          pageSize: 10
        },
        role: [],
        tableData: [],
        pageList: [10, 20, 50, 100],
        total: 0,
        addVisible: false,
        editVisible: false,
        id: 0,
      }
    },
    created: function () {
      this.loadData();
      this.roleList()
    },
    methods: {
      onSubmit() {
        this.loadData()
      },
      onCreate() {
        this.addVisible = true;

      },
      onExport() {

      },
      handleClick(id) {
        this.editVisible = true;
        this.id = id
      },
      handleSizeChange(val) {
        this.form.pageSize = val;
        this.loadData()
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.loadData()
      },
      onEnable(id, status) {
        let _this = this;
        _this.$confirm('是否要删除区域?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Vue.axios.post('/api/area/del', {id: id}).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            _this.loadData()
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      loadData() {
        let Authorization = localStorage.getItem('Authorization');
        Vue.axios.post('/api/account/listAll', this.form, {headers: {Authorization: Authorization}}).then(res => {
          let data = res.data.data;
          let _this = this;
          _this.total = data.count;
          _this.form.page = data.page;
          _this.form.pageSize = data.pageSize;
          _this.tableData = data.list;
          if(res.data.code === 202){
            this.$router.push('/login')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      roleList() {
        Vue.axios.post('/api/common/getRole').then(res => {
          let data = res.data.data;
          let _this = this;
          _this.role = data;
          console.log(data)
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
