<template>
	<view class="form">
		<view class="content">
			<img src="/static/images/login/logo.png" alt="" class="logo">

			<!-- 账号登录 -->
			<uni-forms v-if="pageState === 'login'" ref="form" :modelValue="formData" :rules="rules" class="loginForm">
				<uni-forms-item label="账号:" name="name">
					<uni-easyinput type="text" v-model="formData.name" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item label="密码:" name="email">
					<uni-easyinput type="password" v-model="formData.email" placeholder="请输入密码" />
				</uni-forms-item>
				<view class="register">
					<span>注册</span>
					<span @click="()=>{
						pageState = 'qrCode';
						
						}">二维码登录</span>
				</view>
				<button @click="submit" class="loginButton">登录</button>
			</uni-forms>


			<!-- 二维码登录 -->
			<view v-if="pageState === 'qrCode'" class="contentQrCode">
				111
			</view>
		</view>
	</view>
</template>



<script>
	import {
		createQR
	} from '/api/index.js';
	export default {
		data() {
			return {
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
				}).catch(err => {
					console.log(createQR());


				})
			}
		}
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

			.logo {
				width: 100px;
				height: 100px;
				margin: 60px 0;
			}

			.loginForm {
				width: 100%;

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




		}
	}
</style>