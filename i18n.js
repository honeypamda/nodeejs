// var i18n = require('i18n');

// i18n.configure({
//   // setup some locales - other locales default to en silently
//   locales:['en', 'es'],

//   // where to store json files - defaults to './locales' relative to modules directory
//   directory: __dirname + '/locales',
  
//   defaultLocale: 'es',
  
//   // sets a custom cookie name to parse locale settings from  - defaults to NULL
//   cookie: 'lang',
// });

// module.exports = function(req, res, next) {

//   i18n.init(req, res);
//   res.local('__', res.__);

//   var current_locale = i18n.getLocale();

//   return next();
// };


var i18n = require('i18n');

i18n.configure({
  locales: ['es', 'en'],
  directory: __dirname+'/locales'
});

module.exports = function(req, res, next) {
  let {lang} = req.query;
  i18n.init(req, res);
  lang = lang ? lang : 'es';
  i18n.setLocale(req, lang);
  var current_locale = i18n.getLocale();
  console.log(current_locale);
  return next();
};