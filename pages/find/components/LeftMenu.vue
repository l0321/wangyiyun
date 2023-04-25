<template>
	<view class="">
		11122223333
	</view>
</template>

<script>
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
			}
		},
		mounted() {
			// console.log('1111')

		},

	}
</script>

<style>
</style>