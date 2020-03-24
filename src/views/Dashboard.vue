<template>
	<div>
		<el-container>
			<el-aside style="width: 75px;">
				<el-menu
					:collapse="isCollapse"
					:default-active="activeIndex"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose"
					background-color="#222"
					text-color="#fff"
					active-text-color="#ffd04b"
					style="min-height: 768px; border-right: 0px; height: 100%;"
				>
					<el-menu-item index="1" @click="navigate('/dashboard/manager')">
						<i class="el-icon-coin"></i>
						<span>Inventory Manager</span>
					</el-menu-item>
					<el-menu-item index="2" @click="navigate('/dashboard/report')">
						<i class="el-icon-warning-outline"></i>
						<span>Report</span>
					</el-menu-item>
					<el-menu-item index="3" @click="navigate('/dashboard/archives')">
						<i class="el-icon-takeaway-box"></i>
						<span>Archives</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main class="dashboard-main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>
<script>
import router from '../router'

export default {
	name: 'Dashboard',
	data() {
		return{
			activeIndex: '1',
			isCollapse: true
		}
	},
	created() {
		this.activeIndex = this.getActiveIndex()
	},
	watch: {
		'$route': 'getActiveIndex'
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
		},
		getActiveIndex() {
			let currentUrl = window.location.href
			currentUrl = currentUrl.split("/")
			let page = currentUrl[currentUrl.length-1]
			switch (page) {
				case 'archives':
					return '3'
				case 'report':
					return '2'
				case 'manager':
					return '1'
				default:
					return '1'
			}
		}
	}
}
</script>
<style scoped>
.dashboard-main {
	margin-top: 20px;
}
</style>