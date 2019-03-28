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
						data.callWithRequest (
							req,
							'count',
							{index:'.x-lff-lookup'}
						).then (
							response => {
								
								data.callWithRequest(
									req, 
									'search', 
									{index: '.x-lff-lookup', size: response.count}
								).then(function (response) {
									reply(response);
								}, function (response) {
									reply(response);
								});
							}
						)
					}
			});
		}
	});
};
