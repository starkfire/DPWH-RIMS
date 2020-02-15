<template>
	<div>
		<div class="first-panel">
			<div id="first-panel-content">
				<h2 style="letter-spacing: 8px; font-family: 'CeraPro Bold'">DPWH-RIMS</h2>
				<p>A Smarter Road Inventory Management for the Department of Public Works and Highways</p>
				<p style="font-family: 'CeraPro Bold'; font-size: 12px;">MADE POSSIBLE WITH</p>
				<span id="stack-logos">
					<a href="https://deck.gl/"><img src="../assets/images/uber.png" style="height: 40px;" /></a>
					<a href="https://mapbox.com/"><img src="../assets/images/mapbox-logo.png" style="height: 40px;" /></a>
					<a href="https://vuejs.org/"><img src="../assets/images/vue.png" style="height: 40px;" /></a>
					<a href="https://www.mongodb.com/"><img src="../assets/images/mongodb.png" style="height: 40px;" /></a>
				</span>
			</div>
		</div>
		<div class="second-panel">
			<el-row>
				<el-col :span="12">
					<div id="second-panel-content-a">
						<h2 style="letter-spacing: 4px; font-family: 'CeraPro Bold'">Technology Stack</h2>
						<p>We use modern and well-maintained open source libraries to provide a competitive edge</p>
					</div>
				</el-col>
				<el-col :span="12">
					<div id="second-panel-content-b">
						<div>
							<el-row id="library-header">
								<img src="../assets/images/uber.png" style="height: 40px;" />
								Uber DeckGL
							</el-row>
							<el-row id="library-content">
								We use Deck.gl, a data-driven spatial visualization library by Uber Engineering.
							</el-row>
						</div>
						<div class="library">
							<el-row id="library-header">
								<img src="../assets/images/mapbox-logo.png" style="height: 40px;" />
								Mapbox
							</el-row>
							<el-row id="library-content">
								Mapbox is a customizable open source mapping platform which uses OpenStreetMap.
							</el-row>
						</div>
						<div class="library">
							<el-row id="library-header">
								<img src="../assets/images/vue.png" style="height: 40px;" />
								Vue.js
							</el-row>
							<el-row id="library-content">
								DPWH-RIMS is implemented as a Single Page Application (SPA) to provide data reactivity and better performance
							</el-row>
						</div>
						<div class="library">
							<el-row id="library-header">
								<img src="../assets/images/mongodb.png" style="height: 40px;" />
								MongoDB
							</el-row>
							<el-row id="library-content">
								MongoDB is a document-oriented, NoSQL database solution.
							</el-row>
						</div>
					</div>
				</el-col>
			</el-row>
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
	background-color: #111;
	font-size: 24px;
	color: #fff;
}

#first-panel-content{
	padding-top: 185px;
	padding-left: 30%;
	padding-right: 25%;
	padding-bottom: 200px;
	animation: transformBox 2s;
}

#stack-logos img{
	margin-right: 15px;
	animation: roll 2s;
}

.second-panel{
	font-family: 'CeraPro Thin';
	font-size: 24px;
	color: #fff;
}

#second-panel-content-a{
	padding-left: 10%;
	background-color: #55f;
	padding-bottom: 230px;
	padding-top: 250px;
}

#second-panel-content-b{
	padding-top: 45px;
	padding-bottom: 29px;
	padding-left: 10%;
	padding-right: 10%;
	background-color: #555;
}

.library{
	margin-top: 50px;
}

#library-header{
	font-family: 'CeraPro Light';
	font-size: 24px;
}

#library-content{
	font-family: 'CeraPro Thin';
	font-size: 18px;
	padding-top: 25px;
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