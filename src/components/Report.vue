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
            <a-col :span="16">
                Map
            </a-col>
            <a-col :span="8">
                Inputs
            </a-col>
        </a-row>
    </div>
</template>
<script>
import * as axios from 'axios'

export default {
    name: 'Report',
    data() {
        return {
            modalVisible: false
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'damage_report' })
    },
    methods: {
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