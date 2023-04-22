import servers from './servers.js'

const baseUrl = 'http://47.113.230.184:7749';

// 游客登录
export async function createQR() {
	return new Promise(async (resolve, reject) => {
		// 获取二维码key
		let res = await servers(baseUrl + '/login/qr/key');
		// 生成二维码
		let qrImg = await servers(baseUrl + '/login/qr/create', {
			key: res?.data?.unikey,
			qrimg: true
		})
		resolve(qrImg)
	});

}