// npm includes
var i18n = require("i18n");

// configure i18n
i18n.configure({
	locales:		["en"],
	defaultLocale:	"en",
	directory:		__dirname + "/locales"
});

// exposes only the gettext-style function for our purposes.
module.exports = i18n.__.bind(i18n);
