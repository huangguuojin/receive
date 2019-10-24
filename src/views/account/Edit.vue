<template>
  <div class="create">
    <el-dialog title="添加员工" :visible.sync="visible"  :show-close="true" :before-close="handleClose">
      <el-form :model="form" label-width="150px" :rules="rules" ref="ruleForm">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>
        <el-form-item label="员工手机号" prop="mobile">
          <el-input v-model="form.mobile" class="input" ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="员工邮箱">
          <el-input v-model="form.email" class="input"></el-input>
        </el-form-item>
        <el-form-item label="角色"  prop="role">
          <el-select v-model="form.role"  placeholder="请选择" class="input" @change="onRoleSelect">
            <el-option
              v-for="item in role"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域"  v-show="show" >
          <el-select v-model="form.area" multiple placeholder="请选择" class="input" @change="onAreaSelect">
            <el-option
              v-for="item in area"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址"  >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入地址"
            v-model="form.address" class="input">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
            v-model="form.remark" class="input">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
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
    data() {
      return {
        form: {
          id: this.id,
          name: '',
          address: '',
          remark: '',
          email: '',
          area: [],
          role: '',
          sex: '1'
        },
        role: [
          {
            id: '',
            name: '',
          }
        ],
        area: [{
          id: '',
          name: '',
        }],
        show: false,
        formLabelWidth: '120px',
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          mobile: [
            { required: true, message: '手机号不能为空'},
          ],
          role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
        }
      };
    },
    created(){
      this.getRole()
      this.getOne()
    },
    methods: {
      cancelModal() {
        // 关闭弹窗，触发父组件修改visible值
        this.$emit('update:visible', false);
      },
      onSubmit(){
        let _this  = this
        console.log(_this.form)
        Vue.axios.post('/api/account/newUser', _this.form).then(function (res) {
          _this.$emit('update:visible', false);
          _this.$emit('loadData')
        }).catch(function (error) {
          console.log(error)
        })
      },
      getArea(){
        let _this = this
        Vue.axios.post('/api/common/getAllArea').then(function (res) {
          _this.area = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      handleClose(){
        this.$emit('update:visible', false)
      },
      getRole(){
        let _this = this
        Vue.axios.post('/api/common/getRole').then(function (res) {
          _this.role = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      onRoleSelect(val){
        let _this = this
        let roleName = ''
        for (let i = 0; i< _this.role.length; i++){
          if(_this.role[i].id === val){
            roleName = _this.role[i].name
            break
          }
        }
        if(roleName === '外勤'){
          _this.show = true
          _this.getArea()
        }
      },
      onAreaSelect(val){
        this.form.area = val
      },
      getOne(){
        let _this = this
        Vue.axios.post('/api/account/view', {uid: this.id}).then(function (res) {
          let data = res.data.data
          _this.form.name = data.name
          _this.form.mobile = data.mobile
          _this.form.sex = data.sex
          _this.form.email = data.email
          _this.form.area = data.area
          _this.form.role = data.role
        }).catch(function (error) {
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
  .input{
    width: 50%;
  }
</style>
