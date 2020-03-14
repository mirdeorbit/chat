const path = require('path');
const fs = require('fs');
const jsYaml = require('js-yaml');
const getConfig = require('./base').get;

const checkFileExistence = filePath => {
	let fileExists;

	try {
		fs.accessSync(filePath);
		fileExists = true;
	} catch (err) {
		if (err.code === 'ENOENT') {
			fileExists = false;
		} else {
			throw err;
		}
	}

	return fileExists;
};

const readYamlConfig = params => {
	if (!params.name) {
		throw new Error('Config name is not specified');
	}

	let configPath = params.path;

	if (!configPath) {
		const nameParts = params.name.split('-');
		const baseName = nameParts[0];

		// if there's no path to config, than construct it from NODE_ENV
		configPath = path.join(params.defaultDir, `${baseName}.yaml`);
	}

	if (!checkFileExistence(configPath)) {
		throw new Error(`Config file ${configPath} doesn't exist`);
	}

	return jsYaml.load(fs.readFileSync(configPath, 'utf8'));
};

module.exports = env => {
	const envConfig = readYamlConfig({
		name: env || 'development',
		defaultDir: __dirname
	});

	return getConfig(envConfig);
};
