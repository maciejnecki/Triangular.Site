// Adopted from 2015 Richard Dancsi EU COOKIE LAW CONSENT licensed under MIT License.
// -
// Adopted and modifed on 7 January 2019 by Maciej Necki
// -
// -
// -
// Example Use, Block needed in Template:
// -
// <div id="cookie" class="box cookie">
// 	<h3>We use cookies</h3>
// <span>
// Cookies are small pieces of data stored on your device, which you can manage in your browser settings.
// <br>
// If you continue without changing your settings, we'll assume that you agree to the usage of cookies.
// </span>
// <button class="cookieAccept">Accept</button>
// 	<a href="/privacy-policy">Read More</a>
// </div>
// -


(function($) {

$.fn.euCookieLawPopup = (function() {

	var _self = this;

	// Cookie Expiry
	_self.params = {
		agreementExpiresInDays : 1,
	};

	// Cookie Name
	_self.vars = {
		COOKIE_NAME : 'MYX_SYSTEMS_COOKIE_CONSENT'
	};

	// Storing the consent in a cookie
	var setUserAcceptsCookies = function(consent) {
		var d = new Date();
		var expiresInDays = _self.params.agreementExpiresInDays * 24 * 60 * 60 * 1000;
		d.setTime( d.getTime() + expiresInDays );
		var expires = "expires=" + d.toGMTString();
		document.cookie = _self.vars.COOKIE_NAME + '=' + consent + "; " + expires + ";path=/";

		$(document).trigger("user_cookie_consent_changed", {'consent' : consent});
	};

	// Checking if consent cookie is already present
	var userAlreadyAcceptedCookies = function() {
		var userAcceptedCookies = false;
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {
			var c = cookies[i].trim();
			if (c.indexOf(_self.vars.COOKIE_NAME) == 0) {
				userAcceptedCookies = c.substring(_self.vars.COOKIE_NAME.length + 1, c.length);
			}
		}

		return userAcceptedCookies;
	};


	// Close cookie box
	var hideContainer = function() {
		document.getElementById("cookie").style.display = "none";
	};

	// Public Function
	var publicfunc = {

		// Initialise Cookie Popup
		init : function() {

			// No need to display this if user already accepted the policy
			if (userAlreadyAcceptedCookies()) {
				hideContainer()
				return;
			}

			// Store cookie and close popup on button press
			$('.cookieAccept').click(function() {
				setUserAcceptsCookies(true);
				hideContainer();
				return false;
			});
		}
	};

	return publicfunc;
});

// Ready the document
$(document).ready( function() {
	if ($(".cookie").length > 0) {
		$(document).euCookieLawPopup().init();
	}
});

}(jQuery));
