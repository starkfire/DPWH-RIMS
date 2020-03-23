<template>
    <div class="asset-manager">
        <a-row :gutter="12">
            <a-col :span="14">
                <p id="header">Manager</p>
            </a-col>
            <a-col :span="8">
                <br>
                <a-input-search placeholder="Search Data" style="float:right;" />
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
        <a-row>
            <a-table
                :columns="columns"
                :rowKey="tableData => tableData._id"
                :dataSource="tableData"
                :loading="loading"
            >
                <span slot="date" slot-scope="item">
                    {{ item.split('T')[0] }}
                </span>
                <span slot="time" slot-scope="item">
                    {{ item.split('T')[1].split('.')[0] }}
                </span>
            </a-table>
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
        key: 'type',
        dataIndex: 'type'
    }
]


export default {
    name: 'Manager',
    data() {
        return {
            loading: false,
            modalVisible: false,
            tableData: [],
            columns
        }
    },
    methods: {
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