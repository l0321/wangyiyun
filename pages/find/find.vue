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
				<uni-search-bar @focus="searchFocus" cancelText=' '></uni-search-bar>

			</view>
			<view class="listen">
				<image src="@/static/images/find/findListen.png" mode="" class="listenImg"></image>
			</view>
		</view>

		<!-- 推荐歌单 -->
		<view class="songList">
			<view class="title">
				推荐歌单>
			</view>
			<view class="swiper">
				<swiper class="swiperContent">
					<swiper-item v-for="(item,index) in songList" class="swiperItem">
						<view v-for="(itemData,indexData) in item" class="itemList">
							<view class="item">
								<text class="playCount">{{itemData?.playcount % 10000 + '万'}}</text>
								<!-- <image :src="itemData?.picUrl" mode=""></image> -->
								<img :src="itemData?.picUrl" alt="">
								<text class="title">{{itemData?.name}}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 每日推荐歌曲 -->
		<view class="recommendSong">
			<view class="title">
				每日推荐歌曲>
			</view>
			<swiper class="swiperContent">
				<swiper-item v-for="(item,index) in recommendSongList" class="swiperItem">
					<view v-for="(itemData,indexData) in item" class="itemList">
						<image class="pic" :src="itemData?.al?.picUrl" mode=""></image>
						<view class="text">
							<text class="title">{{itemData?.name}}</text>
							<text class="author">{{itemData?.ar[0]?.name}}</text>
						</view>
						<image class="play" src="@/static/images/find/find_play.png"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 数字专辑 -->
		<view class="recommendSong">
			<view class="title">
				数字专辑>
			</view>
			<swiper class="swiperContent">
				<swiper-item v-for="(item,index) in albumList" class="swiperItem">
					<view v-for="(itemData,indexData) in item" class="itemList">
						<image class="pic" :src="itemData?.coverUrl" mode=""></image>
						<view class="text">
							<text class="title">{{itemData?.albumName}}</text>
							<text class="author">{{itemData?.artistName}}</text>
						</view>
						<image class="play" src="@/static/images/find/find_play.png"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		recommendApi,
		recommendSongsApi,
		albumListApi,
	} from '@/api/index.js'
	import LeftMenu from './components/LeftMenu.vue'
	export default {
		data() {
			return {
				// 推荐歌单列表
				songList: [],

				// 每日推荐歌曲
				recommendSongList: [],

				// 数字专辑
				albumList: [],
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
		onShow() {

			const format = (data) => {
				console.log(data)
				let newArr = [];
				let temp = [];
				data?.forEach((item, index) => {
					temp?.push(item);

					if (temp?.length >= 3) {
						newArr?.push(temp);
						temp = [];
					}
					if (index === data?.length - 1) {
						newArr?.push(temp);
					}

				})
				return newArr
			}

			// 推荐歌单
			recommendApi().then(res => {
				this.songList = format(res?.recommend)
			})

			// 每日推荐歌曲
			recommendSongsApi().then(res => {
				this.recommendSongList = format(res?.data?.dailySongs)
			})

			// 	数字专辑
			albumListApi().then(res => {
				this.albumList = format(res?.products)
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

		/* 推荐歌单swpier */
		.songList {
			>.title {
				font-weight: 600;
				margin-bottom: 10px;
				font-size: 18px
			}

			.swiper {
				.swiperContent {
					height: 180px;

					.swiperItem {
						height: auto;
						display: flex;
						justify-content: space-between;

						.itemList {
							width: 30%;

							.item {
								position: relative;

								>.playCount {
									position: absolute;
									color: #fff;
									font-weight: bold;
									right: 0;
								}

								>img {
									width: 100%;
									height: auto;
									object-fit: contain;
									/* height: 100px; */
									/* width: 30%; */
									/* height: 80rpx; */
								}

								>.title {
									font-size: 14px;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
									text-overflow: ellipsis;
								}
							}
						}
					}
				}
			}
		}

		/* 每日推荐歌曲 */
		.recommendSong {
			>.title {
				font-weight: 600;
				margin-bottom: 10px;
				font-size: 18px
			}

			.swiperContent {
				height: 230px;

				.swiperItem {
					.itemList {
						display: flex;
						align-items: center;
						margin: 10px 0;

						>.text {
							margin: 0 20px;
							height: 60px;
							display: flex;
							flex-direction: column;
							flex: 1;
							justify-content: space-evenly;

							>.title {
								font-size: 18px;
								font-weight: 600;

							}

							>.author {
								font-size: 14px
							}
						}

						.pic {
							width: 60px;
							height: 60px;
						}

						.play {
							width: 20px;
							height: 20px;
							float: right;
						}
					}
				}
			}
		}
	}
</style>