<template>
    <div class="report">
        <a-row :gutter="12">
            <a-col :span="22">
                <p id="header">Report</p>
                <p id="subheader">Report infrastructure damages</p>
            </a-col>
            <a-col :span="2">
                <br>
                <a-button type="danger" ghost @click="() => modalVisible = true">Button</a-button>
                <a-modal
                    title="Report Damage"
                    centered
                    v-model="modalVisible"
                    @ok="() => modalVisible = false"
                >
                    <a-form :form="form" @submit="handleSubmit">
                        <a-form-item label="Type">
                            <a-radio-group v-decorator="['radio-button', { rules: [{ required: true, message: 'Please select the type' }] }]">
                                <a-radio-button value="pothole">Pothole</a-radio-button>
                                <a-radio-button value="crack">Crack</a-radio-button>
                            </a-radio-group>
                        </a-form-item>
                        <a-row :gutter="12">
                            <a-col :span="8">
                                <a-form-item label="Length">
                                    <a-input v-decorator="['length']" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="Width">
                                    <a-input v-decorator="['width']" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="Depth">
                                    <a-input v-decorator="['depth']" />
                                </a-form-item>
                            </a-col>
                        </a-row>
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
                            <a-input v-decorator="['address', { rules: [{ required: true, message: 'Plug in the address' }] }]" />
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit">Submit</a-button>
                        </a-form-item>
                    </a-form>
                </a-modal>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="15">
                <PotholeMap></PotholeMap>
            </a-col>
            <a-col :span="9">
                <a-list
                    :loading="loading"
                    itemLayout="horizontal"
                    :dataSource="entries"
                    style="padding-left: 12px;"
                >
                    <div 
                        v-if="showLoadingMore"
                        slot="loadMore"
                        :style="{
                            textAlign: 'center',
                            marginTop: '12px',
                            height: '32px',
                            lineHeight: '32px'
                        }"
                    >
                        <div>
                            <a-spin v-if="loadingMore" />
                            <a-button v-else @click="onLoadMore">Load More</a-button>
                        </div>
                    </div>
                    <a-list-item slot="renderItem" slot-scope="item, index">
                        <a-list-item-meta :description="`(${item.location[0]}, ${item.location[1]})`">
                            <p slot="title">{{ item.address }}</p>
                        </a-list-item-meta>
                        <div>
                            <a-popconfirm
                                title="Are you sure you want to delete this data?"
                                @confirm="deleteReport(entries[index]._id, index)"
                                @cancel="cancel"
                                okText="Yes"
                                cancelText="No"
                            >
                                <a>Delete</a>
                            </a-popconfirm>
                        </div>
                    </a-list-item>
                </a-list>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import * as axios from 'axios'

import PotholeMap from '../components/PotholeMap.vue'

export default {
    name: 'Report',
    components: {
        PotholeMap
    },
    data() {
        return {
            modalVisible: false,
            entries: [],
            entriesVisible: [],
            count: 0,
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            remaining: 0
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'damage_report' })
    },
    mounted() {
        this.getCount()
        this.getInitialData()
    },
    methods: {
        // fetches existing reports
        getCount() {
            axios.get('http://127.0.0.1:3000/api/pothole').then(res => {
                this.count = Object.keys(res.data)
            })
        },
        getInitialData() {
            this.fetchData(res => {
                this.loading = false
                this.entries = res.data
                if(this.count < 10) {
                    for(let i = 0; i < this.count; i++) {
                        this.entriesVisible.push(this.entries[i])
                    }
                    this.showLoadingMore = false
                    this.remaining = 0
                } else {
                    for(let i = 0; i < 10; i++){
                        this.entriesVisible.push(this.entries[i])
                    }
                    this.remaining = this.entries.length - this.entriesVisible.length
                }
            })
        },
        fetchData(callback) {
            axios.get('http://127.0.0.1:3000/api/pothole').then(res => {
                callback(res)
            }).catch(err => this.handleNetworkError(err))
        },
        // performs delete requests
        deleteReport(id, index, e) {
            console.log(e)
            axios.delete(`http://127.0.0.1:3000/api/pothole/${id}`, {
                headers: {
                    Authorization: 'authorization'
                },
            }).then(res => {
                console.log('Delete Success')
            }).catch(err => this.handleNetworkError(err))
            this.entriesVisible.splice(index, 1)
            this.getInitialData()
            this.$message.success('Delete success')
        },
        // respond on canceled deletion
        cancel(e) {
            console.log(e)
            this.$message.error('Delete failed')
        },
        // pagination
        onLoadMore(){
            this.loadingMore = true
            if(this.remaining < 10){
                for(let i = 0; i < this.remaining; i++){
                    this.entriesVisible.push(this.entries[i])
                }
                this.showLoadingMore = false
                this.remaining = 0
            }else{
                for(let i = 0; i < 10; i++){
                    this.entriesVisible.push(this.entries[i])
                }
                this.loadingMore = false
                this.remaining = this.entries.length - this.entriesVisible.length
                this.$nextTick(() => {
                    window.dispatchEvent(new Event('resize'))
                })
            }
        },
        // handling network errors
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
        // handles report submission
        handleSubmit(e) {
            e.preventDefault()

            this.form.validateFields((err, fieldsValue) => {
                if(err) {
                    return
                }

                const formData = {
                    length: fieldsValue['length'],
                    width: fieldsValue['width'],
                    depth: fieldsValue['depth'],
                    address: fieldsValue['address'],
                    lat: fieldsValue['latitude'],
                    lon: fieldsValue['longitude']
                }

                axios({
                    method: 'POST',
                    url: 'http://127.0.0.1:3000/api/pothole',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: formData
                }).then(res => {
                    return
                })
            })
        }
    }
}
</script>
<style scoped>
.report {
    margin-left: 24px;
    margin-right: 24px;
}

.report #header {
    margin-bottom: 15px;
    font-family: 'CeraPro Thin';
    font-size: 40px;
}

.report #subheader {
    margin-top: 0px;
    font-family: 'CeraPro Regular';
    font-size: 18px;
}
</style>