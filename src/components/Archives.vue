<template>
    <div class="archives">
        <a-row :gutter="12">
            <a-col>
                <p id="header">Archives</p>
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
                <span slot="download" slot-scope="item">
                    <a :href="`http://localhost:3000/archive/${item}`">Download</a>
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
        title: 'Filename',
        key: 'name',
        dataIndex: 'name'
    },
    {
        title: 'Download',
        key: 'download',
        dataIndex: '_id',
        scopedSlots: { customRender: 'download' }
    }
]

export default {
    name: 'Archives',
    data(){
        return {
            loading: false,
            tableData: [],
            columns
        }
    },
    created(){
        this.fetchArchives()
    },
    methods: {
        fetchArchives(){
            this.loading = true
            axios.get('http://localhost:3000/archive').then(res => {
                this.loading = false
                this.tableData = res.data
            })
        }
    }
}
</script>
<style scoped>
.archives{
    margin-left: 24px;
    margin-right: 24px;
}

.archives #header{
    font-family: 'CeraPro Thin';
    font-size: 40px;
}
</style>