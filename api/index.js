import servers from './servers.js'

const baseUrl = 'http://47.113.230.184:7749';

// 获取二维码
export async function createQR(type, key) {

	// 生成二维码
	if (type === 'qrCode') {
		// 获取二维码key
		let res = await servers(baseUrl + '/login/qr/key', {
			timestamp: Date.now()
		});
		let qrImg = await servers(baseUrl + '/login/qr/create', {
			key: res?.data?.unikey,
			qrimg: true,
			timestamp: Date.now()
		})
		return {
			qrimg: qrImg?.data?.qrimg,
			key: res?.data?.unikey,
		}
	}
	// 当前二维码的登陆状态
	if (type === 'state') {
		let stateRes = await servers(baseUrl + '/login/qr/check', {
			key,
			timestamp: Date.now()
		})
		return stateRes
	}

}