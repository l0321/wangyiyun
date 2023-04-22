export default function servers(url, data = {}, method = 'GET', ) {
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			data,
			success: (res) => {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			},
		});
	});
}