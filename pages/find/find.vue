<template>
	<view class="findHome">
		<!-- 头部搜索栏 -->
		<view class="headerSearch">
			<view class="menuLeft">
				<image src="@/static/images/find/findHome.png" mode="" class="menuImg" @click="showDrawer"></image>
				<uni-drawer ref="showRight">
					<scroll-view style="height: 100%;" scroll-y="true">
						<LeftMenu />
					</scroll-view>
				</uni-drawer>
			</view>
			<view class="search">
				<uni-section type="line">
					<uni-search-bar @focus="searchFocus" cancelText=' '></uni-search-bar>
				</uni-section>
			</view>
			<view class="listen">
				<image src="@/static/images/find/findListen.png" mode="" class="listenImg"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		recommendApi
	} from '@/api/index.js'
	import LeftMenu from './components/LeftMenu.vue'
	export default {
		data() {
			return {

			}
		},
		methods: {
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},

			// 搜索框聚焦
			searchFocus() {

				uni.navigateTo({
					url: './search/search',
				});
			}
		},
		mounted() {
			// console.log('1111')
			recommendApi().then(res => {
				console.log(res)
			})

		},
		components: {
			LeftMenu

		}


	}
</script>

<style>
	.findHome {
		padding: 0 10px;

		.headerSearch {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.menuLeft {
				.menuImg {
					width: 30px;
					height: 30px;
				}
			}

			.search {
				flex: 1;
			}

			.listen {
				.listenImg {
					width: 30px;
					height: 30px;
				}
			}
		}
	}
</style>