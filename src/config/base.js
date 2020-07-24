module.exports.get = config => ({
	appName: 'chat',
	api: {
		baseUrl: 'http://127.0.0.1:3200/api/1.0'
	},
	...config
});
