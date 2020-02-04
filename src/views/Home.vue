<template>
	<div>
		<div class="first-panel">
			<div id="first-panel-content">
				<h2 style="letter-spacing: 8px; font-family: 'CeraPro Bold'">DPWH-RIMS</h2>
				<p>A Road Inventory Management System for the Department of Public Works and Highways</p>
				<p style="font-family: 'CeraPro Bold'; font-size: 12px;">MADE POSSIBLE WITH</p>
				<span id="stack-logos">
					<a href="https://deck.gl/"><img src="../assets/images/uber.png" style="height: 40px;" /></a>
					<a href="https://mapbox.com/"><img src="../assets/images/mapbox-logo.png" style="height: 40px;" /></a>
					<a href="https://vuejs.org/"><img src="../assets/images/vue.png" style="height: 40px;" /></a>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Home'
}
</script>
<style scoped>
.first-panel{
	font-family: 'CeraPro Thin';
	font-size: 24px;
	color: #fff;
}

#first-panel-content{
	padding-top: 185px;
	padding-left: 30%;
	padding-right: 25%;
	padding-bottom: 230px;
	animation: transformBox 2s;
}

#stack-logos img{
	margin-right: 15px;
	animation: roll 2s;
}

@keyframes transformBox {
	0% {
		transform: translate(-150px, 0px);
		opacity: 0;
	}

	100% {
		transform: translate(0px, 0px);
		opacity: 1;
	}
}

@keyframes roll {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>