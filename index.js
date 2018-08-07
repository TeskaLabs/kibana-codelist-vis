import { resolve } from 'path';

export default function (kibana) {
	return new kibana.Plugin({


		require: ['elasticsearch'],


		uiExports: {
			fieldFormats: [
				'plugins/kibana_codelist_vis/format/index'
			]
		},

		config(Joi) {
			return Joi.object({
				enabled: Joi.boolean().default(true),
			}).default();
		},


		init(server, options) {
			// Receive information from the backend
			server.route({
					path: '/api/kibana_codelist_vis/lookup',
					method: 'GET',
					handler(req, reply) {
						// Getting the ES data cluster
						var data = server.plugins.elasticsearch.getCluster('data');
						// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
						data.callWithRequest(req, 'search', {
							index: '.lookup',
							size: 1000,
							from: 0,
							body: {
								query: {
									match: {
										type: 'x-lff-lookup'
									}
								}
							}
						}).then(function (response) {
							reply(response);
						}, function (response) {
							reply(response);
						});
					}
			});
		}
	});
};
