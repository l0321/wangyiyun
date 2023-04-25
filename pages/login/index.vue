<template>
	<view class="form">
		<view class="content">
			<!-- 账号登录 -->
			<uni-forms v-if="pageState === 'login'" ref="form" :modelValue="formData" :rules="rules" class="loginForm">
				<img src="/static/images/login/logo.png" alt="" class="logo">
				<uni-forms-item label="账号:" name="name">
					<uni-easyinput type="text" v-model="formData.name" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item label="密码:" name="email">
					<uni-easyinput type="password" v-model="formData.email" placeholder="请输入密码" />
				</uni-forms-item>
				<view class="register">
					<span @click="anonimousLogin">游客登录</span>
					<span @click="qrLogin">二维码登录</span>
				</view>
				<button @click="submit" class="loginButton">登录</button>
			</uni-forms>


			<!-- 二维码登录 -->
			<view v-if="pageState === 'qrCode'" class="contentQrCode">
				<view class="qrCode">
					<img :src="qrCodeData.qrData" alt="">
					<view v-if="qrCodeState===800 || qrCodeState===802" class="codeImg"></view>
					<p v-if="qrCodeState===800 || qrCodeState===802" class="text">
						{{qrCodeState === 800 ? '二维码过期' :'已扫描，等待验证'}}
					</p>
					<p class="title">请用网易云App扫码登陆</p>
				</view>
				<view class="register">
					<span @click="anonimousLogin">游客登录</span>
					<span @click="()=>{pageState='login'}">登录</span>
				</view>
			</view>
		</view>
	</view>
</template>



<script>
	import {
		qrCodeApi,
		anonimousLoginApi
	} from '/api/index.js';

	export default {
		data() {
			return {
				// 登录二维码数据
				qrCodeData: {
					qrData: null,
					qrSize: 200,
					qrColor: '#000',
					qrBgColor: '#fff'
				},
				// 表单数据
				formData: {
					name: 'LiMing',
					email: 'dcloud@email.com'
				},
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
							required: true,
							validateFunction: (rule, value, data, callback) => {
								if (!/^1[3-9]\d{9}$/?.test(value)) {
									callback('账号格式错误')
								}
								return true
							}
						}, ]
					},
					// 对email字段进行必填验证
					email: {
						rules: [{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
					}
				},

				// 当前页面处于什么状态
				// login - 登录   register - 注册   qrCode - 二维码登录
				pageState: 'login',
				// 当前二维码登录处于什么状态
				// 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
				qrCodeState: null
			}
		},
		methods: {
			/**
			 * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
			 * @param {String} name 字段名称
			 * @param {String} value 表单域的值
			 */
			// binddata(name,value){
			// 通过 input 事件设置表单指定 name 的值
			//   this.$refs.form.setValue(name, value)
			// },
			// 触发提交表单
			submit() {
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
				}).catch(async err => {


				})
			},

			// const timer = setInterval(() => {
			// 		console.log(1111)
			// 	}, 1000),
			timer() {
				setInterval(() => {
					console.log(1111)
				}, 1000)
			},

			// 点击二维码登录
			async qrLogin() {
				timer()
				this.pageState = 'qrCode';
				uni.showLoading({
					title: '加载中'
				});
				let res = await qrCodeApi('qrCode')
				this.qrCodeData = {
					...this?.qrCodeData,
					qrData: res?.qrimg
				}
				uni.hideLoading();
				// 设置定时器轮询当前登陆状态
				const timer = setInterval(async () => {
					let stateRes = await qrCodeApi('state', res?.key)
					this.qrCodeState = stateRes?.code;
					if (stateRes?.code === 803) {
						// 登陆成功，清除定时器，跳转首页
						clearInterval(timer)
						uni.setStorageSync({
							key: 'cookie',
							data: stateRes?.cookie,
						});
						uni.switchTab({
							url: '/pages/find/find'
						});
					}
				}, 1000)
			},

			// 游客登录
			async anonimousLogin() {
				let res = await anonimousLoginApi();
				uni.setStorageSync(
					'cookie',
					res?.cookie
				);
				uni.switchTab({
					url: '/pages/find/find'
				});
			}
		},
	}
</script>

<style lang="scss">
	uni-page-body {
		background-color: #F4F5F6;
		height: 100%;
		font-size: 14px;
		// line-height: 1.8;
	}

	.form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		transform: translateY(-10%);
		width: 100%;
		height: 100%;
		text-align: center;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			// margin: 0 auto;
			width: 80%;
			padding: 0 20px;

			.loginForm {
				width: 100%;

				.logo {
					width: 100px;
					height: 100px;
					margin: 60px 0;
				}

				.loginButton {
					margin: 60px 0;
					background-color: $uni-color-primary;
					color: $uni-text-color-inverse;
				}

				.register {
					display: flex;
					justify-content: space-between;

					span:hover {
						color: $uni-color-primary;
						cursor: pointer;
					}
				}
			}

			// 二维码登录
			.contentQrCode {
				padding: 40px 0;

				.qrCode {
					text-align: center;
					margin-bottom: 20px;
					position: relative;
					padding-top: 180px;
					width: 180px;

					.codeImg {
						position: absolute;
						top: 0;
						left: 0;
						z-index: 2;
						width: 180px;
						height: 180px;
						background-color: #000;
						opacity: 0.5;

						line-height: 180px;


					}

					.text {
						position: absolute;
						top: 80px;
						left: 33px;
						z-index: 3;
						color: #fff;
					}

					>img {
						position: absolute;
						z-index: 1;
						top: 0;
						left: 0;
					}

				}

				.register {
					padding: 0 14px;
					display: flex;
					justify-content: space-between;

					span:hover {
						color: $uni-color-primary;
						cursor: pointer;
					}
				}
			}


		}
	}
</style>