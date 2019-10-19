<template>
  <div class="create">
    <el-dialog title="收货地址" :visible.sync="visible"  :show-close="false">
      <el-form :model="form">
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入地址"
            v-model="form.address">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
            v-model="form.remark">
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
    created: function () {
      Vue.axios.post('/api/area/view', {id: this.id}).then(res => {
        let data = res.data.data;
        let _this = this;
        _this.form.name = data.name
        _this.form.address = data.address
        _this.form.remark = data.remark
      }).catch(error => {
        console.log(error)
      })
    },
    data() {
      return {
        form: {
          id: this.id,
          name: '',
          address: '',
          remark: ''
        },
        formLabelWidth: '120px'
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
      }
    }
  }
</script>

<style scoped>
  .create{
    text-align: left;
  }
</style>
