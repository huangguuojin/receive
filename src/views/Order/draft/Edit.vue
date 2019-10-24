<template>
    <div class="create">
        <el-dialog title="编辑派单" :visible.sync="visible" :show-close="false">
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
                            <el-select v-model="form.source" placeholder="请选择">
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
                        <el-select v-model="form.inId" filterable placeholder="请选择"
                                   v-on:change="insuranceChange(form.inId)">
                            <el-option
                                    v-for="(item,index) in insurance"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
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
                        <el-form-item label="事故号" class="input">
                            <el-input v-model="form.accidentNo"></el-input>
                        </el-form-item>
                        <el-form-item label="修理厂">
                            <el-col :span="11">
                                <el-select v-model="form.rfId" filterable placeholder="请选择"
                                           v-on:change="repairFactoryChange(form.rfId)">
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
                            <el-select v-model="form.rfrId" filterable placeholder="请选择">
                                <el-option
                                        v-for="(itemR,indexR) in repairFactoryRelation"
                                        :key="indexR"
                                        :label="itemR.name"
                                        :value="itemR.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="车牌号" class="input">
                            <el-input v-model="form.carNo"></el-input>
                        </el-form-item>
                        <el-form-item label="车架号" class="input">
                            <el-input v-model="form.carFrameNo"></el-input>
                        </el-form-item>
                        <el-form-item label="车型" class="input">
                            <el-input v-model="form.card"></el-input>
                        </el-form-item>
                        <el-form-item label="报案人" class="input">
                            <el-input v-model="form.report"></el-input>
                        </el-form-item>
                        <el-form-item label="责任方" class="input">
                            <el-input v-model="form.responsibility"></el-input>
                        </el-form-item>
                        <el-form-item label="定损金额" class="input">
                            <el-input v-model="form.fixMoney"></el-input>
                        </el-form-item>
                        <el-form-item label="定损时间">
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
                        <el-table :data="form.parts" border stripe style="width: 100%;">
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    width="50">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名">
                                <template slot-scope="scope">
                                    <span>{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="报价价格">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.price" placeholder="请输入内容">{{scope.row.price}}
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="fixPrice" label="定损价格">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.fixPrice" placeholder="请输入内容">{{scope.row.fixPrice}}
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="定损价格">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.pStatus" filterable placeholder="请选择">
                                        <el-option
                                                v-for="(itemR,indexR) in partsStatus"
                                                :key="indexR"
                                                :label="itemR.name"
                                                :value="itemR.id">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-delete" @click="onDel(scope.$index+1)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row :gutter="20" class="add">
                            <el-col :span="9">
                                <el-input v-model="btnName" placeholder="请输入零件名称"></el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="btnPrice" placeholder="价格"></el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="btnFixPrice" placeholder="定损价格"></el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPart()">增加零件
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-form-item label="预约回收日期">
                                <el-col :span="18">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.appointmentTime"
                                                    style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="保险图片">
                    <el-upload
                            action="/api/common/upload"
                            list-type="picture-card"
                            :multiple=true
                            :show-file-list=true
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            name="files"
                            :file-list="form.dialogImageUrl"
                            :on-success="handleSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-tab-pane>
            </el-tabs>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-check" @click="onSave">保存</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-s-claim" @click="onSend">发布派单</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-success" @click="onFinish">申请完结</el-button>
                </el-col>
            </el-row>
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
            let Authorization = localStorage.getItem('Authorization')
            this.getOne()
            this.getInsurance()
            this.insuranceChange(1)
            this.getRepairFactory()
        },
        data() {
            return {
                form: {
                    id: this.id,
                    type: 1,
                    source: 1,
                    inId: '',
                    inRid: '',
                    accidentNo: '',
                    rfId: '',
                    rfrId: '',
                    carNo: '',
                    carFrameNo: '',
                    card: '',
                    report: '',
                    responsibility: '',
                    fixMoney: 0.00,
                    fixDate: '',
                    remark: '',
                    parts: [{
                        id: 0,
                        name: '',
                        price: '',
                        fixPrice: '',
                        pStatus: 1,
                        type: 1
                    }],
                    appointmentTime: '',
                    dialogImageUrl: [],
                    dialogVisible: false,
                    status: 0
                },
                images: [],
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

                insurance: [],
                insuranceRelation: [],
                repairFactory: [],
                repairFactoryRelation: [],
                parts: [],
                partsStatus: [
                    {
                        id: 1,
                        name: '未回收'
                    },
                    {
                        id: 2,
                        name: '已取件'
                    },
                    {
                        id: 3,
                        name: '已入库'
                    },
                    {
                        id: 4,
                        name: '已出库'
                    },
                    {
                        id: 5,
                        name: '放弃回收'
                    },
                    {
                        id: 6,
                        name: '回收错误'
                    },
                    {
                        id: 7,
                        name: '遗失'
                    },
                    {
                        id: 8,
                        name: '忽略'
                    },
                    {
                        id: 9,
                        name: '剔除'
                    }
                ],
                dialogImageUrl: [],
                btnName: '',
                btnPrice: 0,
                btnFixPrice: 0,
                dialogVisible: false
            }
        },
        methods: {
            cancelModal() {
                // 关闭弹窗，触发父组件修改visible值
                this.$emit('update:visible', false)
            },
            onSubmit() {
                let _this = this
                Vue.axios.post('/api/area/updateInfo', _this.form).then(function (res) {
                    _this.$emit('update:visible', false)
                    _this.$emit('loadData')
                }).catch(function (error) {
                })
            },
            getInsurance() {
                let _this = this
                Vue.axios.post('/api/common/getAllInsurance').then(function (res) {
                    _this.insurance = res.data.data
                }).catch(function (error) {
                    console.log(error)
                })
            },
            getOne() {
                Vue.axios.post('/api/order/view', {id: this.id}).then(res => {
                    let data = res.data.data
                    let _this = this;
                    _this.form.type = data.type
                    _this.form.source = data.source
                    _this.form.inId = data.inId
                    _this.form.inRid = data.inrId
                    _this.form.accidentNo = data.accidentNo
                    _this.form.rfId = data.rfId
                    _this.form.rfrId = data.rfrId
                    _this.form.carNo = data.carNo
                    _this.form.carFrameNo = data.carFrameNo
                    _this.form.card = data.card
                    _this.form.report = data.report
                    _this.form.responsibility = data.responsibility
                    _this.form.fixMoney = data.fixMoney
                    _this.form.fixDate = data.fixDate
                    _this.form.remark = data.remark
                    _this.form.parts = data.parts
                    _this.form.appointmentTime = data.appointmentTime
                    _this.form.dialogImageUrl = data.images
                    _this.images = data.images
                }).catch(error => {
                    console.log(error)
                })
            },
            insuranceChange(val) {
                let _this = this
                Vue.axios.post('/api/common/getAllInsuranceRelation', {inId: val}).then(res => {
                    _this.insuranceRelation = res.data.data
                }).catch(error => {
                    console.log(error)
                })
            },
            getRepairFactory() {
                let _this = this
                Vue.axios.post('/api/common/getAllRepair').then(res => {
                    _this.repairFactory = res.data.data
                }).catch(error => {
                    console.log(error)
                })
            },
            addRepairFactory() {

            },
            repairFactoryChange(val) {
                let _this = this
                Vue.axios.post('/api/common/getRepairFactoryRelation', {rfId: val}).then(res => {
                    _this.repairFactoryRelation = res.data.data
                }).catch(error => {
                    console.log(error)
                })
            },
            addPart() {
                let _this = this
                _this.form.parts.push({name: _this.btnName, price: _this.btnPrice, fixPrice: _this.btnFixPrice, pStatus: 1})
                _this.btnName = ''
                _this.btnPrice = ''
                _this.btnFixPrice = ''
                console.log(_this.form.parts)
            },
            handleRemove(file, fileList) {
                let _this = this
                let dialogImageUrl = _this.form.dialogImageUrl
                for (let i = 0; i < dialogImageUrl.length; i++){
                    if(dialogImageUrl[i].id === file.id){
                        _this.form.dialogImageUrl.splice(i, 1)
                    }
                }
                console.log(file, fileList)
            },
            handlePictureCardPreview(file) {
                console.log(file)
                this.dialogImageUrl =  file.url
                this.dialogVisible = true
            },
            handleSuccess(response, file, fileList) {
                let _this = this
                _this.form.dialogImageUrl.push({ url: response.data.fileName, type: 1})
            },
            onDel(index){
                let len = this.form.parts.length
                if(index === len){
                    this.form.parts.pop()
                }else {
                    this.form.parts.splice(index, 1)
                }
            },
            onSave(){
                let _this = this
                _this.form.status = 1
                Vue.axios.post('/api/order/updateRecord', this.form).then(res => {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    })
                   _this.$emit('update:visible', false)
                    _this.$emit('loadData')
                }).catch(error => {

                })
            },
            onSend(){
                let _this = this
                _this.form.status = 2
                Vue.axios.post('/api/order/updateRecord', this.form).then(res => {
                    if(res.data.code === 200){
                        this.$message({
                            type: 'success',
                            message: '发布成功!'
                        })
                    }else {
                        this.$message({
                            type: 'fail',
                            message: '发布失败!'
                        })
                    }

                    _this.$emit('update:visible', false)
                    _this.$emit('loadData')
                }).catch(error => {
                     console.log(error)
                })
            },
            onFinish(){
                let _this = this
                _this.form.status = 5
                Vue.axios.post('/api/order/updateRecord', this.form).then(res => {
                    if(res.data.code === 200){
                        this.$message({
                            type: 'success',
                            message: '完成成功!'
                        })
                    }else {
                        this.$message({
                            type: 'fail',
                            message: '完成失败!'
                        })
                    }

                    _this.$emit('update:visible', false)
                    _this.$emit('loadData')
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .create {
        text-align: left;
    }

    .input {
        width: 50%;
    }

    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
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

    .add {
        margin-top: 5%;
    }

    .add input {
        width: 5%;
    }
</style>
