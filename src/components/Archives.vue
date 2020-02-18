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
        dataIndex: 'date'
    },
    {
        title: 'Filename',
        key: 'name',
        dataIndex: 'name'
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