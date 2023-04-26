<script>
	import registerPageAnimation from '@/uni_modules/zy-h5-page-animation/js_sdk/index';
	import '@/uni_modules/zy-h5-page-animation/js_sdk/index.scss';
	export default {
		onLaunch: function() {
			// registerPageAnimation(); // = registerPageAnimation({ mode: 'fade-in' });
			registerPageAnimation({
				mode: 'slide-in-right',
				duration: 200
			});
			// registerPageAnimation({ mode: 'slide-in-left' });
			// registerPageAnimation({ mode: 'slide-in-top' });
			// registerPageAnimation({ mode: 'slide-in-bottom' });
			// registerPageAnimation({ mode: 'zoom-out' });

			uni.navigateTo({
				url: '/pages/login/index'
			});
			uni.navigateBack({
				delta: 1
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>