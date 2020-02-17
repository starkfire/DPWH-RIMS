import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import App from './App.vue'
import {
	Button,
	Col,
	Icon,
	Input,
	InputNumber,
	message,
	Modal,
	notification,
	Row,
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
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(message)
Vue.use(Modal)
Vue.use(notification)
Vue.use(Row)
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