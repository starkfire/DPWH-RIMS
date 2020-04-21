<template>
    <div class="asset-manager">
        <a-row :gutter="12">
            <a-col :span="20">
                <p id="header">Manager</p>
            </a-col>
            <a-col :span="2">
                <br>
                <a-button type="primary" @click="() => postVisible = true">Post Data</a-button>
                <a-modal
                    title="Post Data"
                    centered
                    v-model="postVisible"
                    @ok="() => postVisible = false"
                >
                    <a-form :form="form" @submit="handleSubmit">
                        <a-form-item label="Type">
                            <a-radio-group v-decorator="['type', { rules: [{ required: true, message: 'Please select the type' }] }]">
                                <a-radio-button value="guardRail">Guard Rail</a-radio-button>
                                <a-radio-button value="signage">Signage</a-radio-button>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item label="Value">
                            <a-input v-decorator="['value']" />
                        </a-form-item>
                        <a-row :gutter="12">
                            <a-col :span="12">
                                <a-form-item label="Latitude">
                                    <a-input v-decorator="['latitude']" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Longitude">
                                    <a-input v-decorator="['longitude']" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-form-item label="Address">
                            <a-input v-decorator="['address', { rules: [{ required: true, message: 'Please specify an address' }] }]" />
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit">Submit</a-button>
                        </a-form-item>
                    </a-form>
                </a-modal>
            </a-col>
            <a-col :span="2">
                <br>
                <a-button type="primary" @click="() => modalVisible = true">Upload</a-button> 
                <a-modal
                    title="Upload Data Spreadsheet"
                    centered
                    v-model="modalVisible"
                    @ok="() => modalVisible = false"
                >
                    <el-row>
                        <el-col :span="10">
                            <a-upload
                                name="file"
                                accept=".csv"
                                action="http://127.0.0.1:3000/api/asset/upload"
                                :multiple="false"
                                @change="handleChange"
                            >
                                <a-button><a-icon type="cloud-upload" />Upload</a-button>
                            </a-upload>
                        </el-col>
                        <el-col :span="14">
                            <el-alert
                                title="CSV Files Only"
                                type="warning"
                                description="Make sure your CSV file follows the prescribed format"
                                show-icon
                                :closable="false"
                            >
                            </el-alert>
                        </el-col>
                    </el-row>
                </a-modal>
            </a-col>
        </a-row>
        <a-row style="margin-bottom: 75px;">
            <a-table
                :columns="columns"
                :rowKey="entriesVisible => entriesVisible._id"
                :dataSource="entriesVisible"
                :loading="loading"
                :pagination="false"
            >
                <span slot="date" slot-scope="item">
                    {{ item.split('T')[0] }}
                </span>
                <span slot="time" slot-scope="item">
                    {{ item.split('T')[1].split('.')[0] }}
                </span>
            </a-table>
            <br>
            <center>
                <div>
                    <a-spin v-if="loadingMore" />
                    <a-button v-else @click="onLoadMore">Load More</a-button>
                </div>
            </center>
        </a-row>
    </div>
</template>
<script>
import * as axios from 'axios'

const columns = [
    {
        title: 'Date',
        key: 'date',
        dataIndex: 'date',
        scopedSlots: { customRender: 'date' }
    },
    {
        title: 'Time',
        key: 'time',
        dataIndex: 'date',
        scopedSlots: { customRender: 'time' }
    },
    {
        title: 'Type',
        key: 'type',
        dataIndex: 'type'
    },
    {
        title: 'Value',
        key: 'value',
        dataIndex: 'value'
    }
]


export default {
    name: 'Manager',
    data() {
        return {
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            entries: [],
            entriesVisible: [],
            count: 0,
            remaining: 0,
            postVisible: false,
            modalVisible: false,
            columns
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'post_data' })
    },
    mounted() {
        this.getCount()
        this.getInitialData()
    },
    methods: {
        // count number of items in database
        getCount() {
            axios.get('http://127.0.0.1:3000/api/asset/').then(res => {
                let countArr = Object.keys(res.data)
                this.count = countArr.filter(x => x).length
            })
        },
        // fetch inventory
        getInitialData() {
            this.fetchData(res => {
                this.loading = false
                this.entries = res.data
                if (this.count < 5) {
                    for(let i = 0; i < this.count; i++) {
                        this.entriesVisible.push(this.entries[i])
                    }
                    this.showLoadingMore = false
                } else {
                    for(let i = 0; i < 5; i++) {
                        this.entriesVisible.push(this.entries[i])
                    }
                    this.remaining = this.entries.length - this.entriesVisible.length
                }
            })
        },
        fetchData(callback) {
            axios.get('http://127.0.0.1:3000/api/asset/').then(res => {
                callback(res)
            }).catch(err => this.handleNetworkError(err))
        },
        // pagination
        onLoadMore(){
            this.loadingMore = true
            if(this.remaining < 5){
                for(let i = 0; i < this.remaining; i++){
                    this.entriesVisible.push(this.entries[i])
                }
                this.showLoadingMore = false
                this.remaining = 0
            }else{
                for(let i = 0; i < 5; i++){
                    this.entriesVisible.push(this.entries[i])
                }
                this.loadingMore = false
                this.remaining = this.entries.length - this.entriesVisible.length
                this.$nextTick(() => {
                    window.dispatchEvent(new Event('resize'))
                })
            }
        },
        // handle network error
        handleNetworkError (err) {
            this.loading = false
            this.showLoadingMore = false
            this.$notification.config({
                placement: 'bottomLeft'
            })
            this.$notification['error']({
                message: `Cannot Connect to API`,
                description: 'Please check if the API is running and accessible'
            })
        },
        // handles asset posting
        handleSubmit(e) {
            e.preventDefault()

            this.form.validateFields((err, fieldsValue) => {
                if (err) return

                let loader = this.$message.loading('Publishing data...', 0)
                setTimeout(loader, 1000)

                const formData = {
                    type: fieldsValue['type'],
                    value: fieldsValue['value'],
                    lat: fieldsValue['latitude'],
                    lon: fieldsValue['longitude'],
                    address: fieldsValue['address']
                }

                axios({
                    method: 'POST',
                    url: 'http://127.0.0.1:3000/api/asset',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: formData
                }).then(res => {
                    this.$message.destroy()
                    this.$message.success('Data Published')
                }).catch(err => {
                    this.$message.error('Unknown error occurred')
                })
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handleChange(info) {
            if(info.file.status !== 'uploading'){
                console.log(info.file, info.fileList)
            }
            if(info.file.status === 'done'){
                this.$message.success('Upload Success')
            } else if(info.file.status === 'error') {
                this.$message.error(`${info.file.response.message}`)
            }
        }
    }
    
}
</script>
<style scoped>
.asset-manager{
    margin-left: 24px;
    margin-right: 24px;
}

.asset-manager #header{
    font-family: 'CeraPro Thin';
    font-size: 40px;
}
</style>