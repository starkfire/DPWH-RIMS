import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import App from './App.vue'
import {
	Button,
	Col,
	Form,
	Icon,
	Input,
	InputNumber,
	List,
	message,
	Modal,
	notification,
	Popconfirm,
	Radio,
	Row,
	Table,
	Upload
} from 'ant-design-vue'

// Config
Vue.config.productionTip = false

// Styles
import './assets/styles.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/mapbox-gl.css'

// Use Plugins
Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.use(Button)
Vue.use(Col)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(List)
Vue.use(message)
Vue.use(Modal)
Vue.use(notification)
Vue.use(Popconfirm)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Table)
Vue.use(Upload)

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;

new Vue({
	router,
	el: '#app',
	render: h => h(App)
})