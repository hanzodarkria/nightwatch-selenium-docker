const args = require('minimist')(process.argv);

const isProd = args['grid'] === 'true';

const SELENIUM_HOST = "YOUR OWN SELENIUM DOCKER CONTAINER IP";

const FIREFOX_CONF = {
	browserName: 'firefox',
	javascriptEnabled: true,
	acceptSslCerts: true
};

const CHROME_CONF = {
	browserName: 'chrome',
	javascriptEnabled: true,
	acceptSslCerts: true
};

const DEFAULT_CONF = {
	launch_url: "http://localhost",
	selenium_port: 4444,
	selenium_host: SELENIUM_HOST,
	silent: true,
	screenshots: {
		enabled: true,
		path: "screenshots",
		on_failure: true,
		on_error: true
	},
	desiredCapabilities: CHROME_CONF
};

const ENVIRONMENTS = {
	default: DEFAULT_CONF,
	"firefox": {
		"desiredCapabilities": FIREFOX_CONF
	},
	"chrome": {
		"desiredCapabilities": CHROME_CONF
	}
};

const SELENIUM_CONFIGURATION = {
	"start_process": isProd,
	"server_path": "node_modules/selenium-server-standalone/index.jar",
	"log_path": "logs",
	"host": "localhost",
	"port": 4444,
	"cli_args": {
		"trustAllSSLCertificates": true,
		"webdriver.chrome.driver": "node_modules/chromedriver/lib/chromedriver/chromedriver",
		"webdriver.gecko.driver": "node_modules/geckodriver/geckodriver"
	}
};

module.exports = {
	src_folders: ['src'],
	output_folder: 'reports',
	globals_path: 'nightwatch.globals.js',
	selenium: SELENIUM_CONFIGURATION,
	test_settings: ENVIRONMENTS
};
