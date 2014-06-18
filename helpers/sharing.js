/* Import the Facebook SDK */
require.config({
	shim: {
		'facebook' : {
			exports: 'FB'
		}
	},
	paths: {
		'facebook': '//connect.facebook.net/en_US/all'
	}
});
require(['fb']);


/* Actual Share module */

define(['../patterns/registry', 'jquery' ,'facebook'], function (Registry, $, FB) {

	FB.init({
		appId : 'REPLACE WITH YOU APP ID',
	});


	var sharingHelper = (function () {
		
		//'Private'

		//Registry for Share Events
		var shareRegistry = new Registry();

		/**
		 * Simple Facebook share with feed method.  Implements optional callback.
		 *
		 * @method faceBookShare
		 * @param {Object} A config data object
		 */
		function faceBookShare(data) {

			var feedData = $.extend({}, {
					method : 'feed'
				}, data);

			FB.ui(
				feedData,
				function(response) {
					if(data.callback) data.callback();
				}
			);
		}

		/**
		 * Simple Twitter share with feed method.
		 *
		 * @method twitterShare
		 * @param {Object} A config data object
		 */
		function twitterShare(data) {
			var maxTweetLength = 140 - (data.shareURL.length + 1),
				tweetMessage = (data.tweetMessage.length > maxTweetLength) ? data.tweetMessage.substr(0, (maxTweetLength - 3))+'...' : data.tweetMessage;

			window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(tweetMessage + ' ' + data.shareURL));
		}

		/**
		 * Registers all custom share events with appropriate methods
		 *
		 * @method registerAllShareEvents
		 * @param {Object} A config data object
		 */
		function registerAllShareEvents() {
			shareRegistry.register("facebook", faceBookShare); //Facebook
			shareRegistry.register("twitter", twitterShare); //Twitter
		}

		registerAllShareEvents();

		//Public
		return {

			/**
			 * Exposes and delegates correct share action
			 *
			 * @method share
			 * @param {String} Name of social network
			 * @param {Object} A config data object for the share action
			 */
			share : function(network, data) {
				//Get Correct Share action from even registry
				var shareAction = shareRegistry.get(network);
				
				shareAction(data);
			}
		};

	}());


	return sharingHelper;

});