<template>
  <div>
    <el-row>
        <el-col :span="4">
            <el-menu
				:default-active="activeIndex"
				class="el-menu-vertical-demo"
				@open="handleOpen"
				@close="handleClose"
				background-color="#222"
				text-color="#fff"
				active-text-color="#ffd04b"
				style="min-height: 768px; border-right: 0px;"
			>
				<el-menu-item index="1" @click="navigate('/dashboard/potholes')">
					<i class="el-icon-menu"></i>
					<span>Asset Manager</span>
				</el-menu-item>
				<el-menu-item index="2" @click="navigate('/dashboard/map')">
					<i class="el-icon-map-location"></i>
					<span>Asset Map</span>
				</el-menu-item>
			</el-menu>
        </el-col>
        <el-col :span="20">
			<router-view></router-view>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import router from '../router'

export default {
	name: 'Dashboard',
	data() {
		return{
			activeIndex: '1'
		}
	},
    methods: {
		handleOpen(key, keyPath){
			console.log(key, keyPath)
		},
		handleClose(key, keyPath){
			console.log(key, keyPath)
		},
		navigate(to){
			router.push({ path: to })
		}
	}
}
</script>