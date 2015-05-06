var parse = require('../vendor/css-parse');
var domify = require('./domify');
var flatten = require('./flatten');
var querySelectorAll = require('./css-selector/select');

function camelCase(str) {
  return str.replace(/-\w/g, function (w) {
    return w.charAt(1).toUpperCase();
  });
}

module.exports = function (element, css) {
  if (typeof css === 'string') {
    css = parse(css);
  }
  //console.log(css);
  //console.log(element);
  element = domify(element);
  //console.log(element);
  var allNodes = flatten(element);
  var stylesheet = css.stylesheet || {};
  var rules = stylesheet.rules || [];
  rules.forEach(function (r) {
    var selectors = r.selectors;
    var declarations = r.declarations;
    selectors.forEach(function (selector) {
      var matchedNodes = querySelectorAll(selector, allNodes);
      //console.log(matchedNodes);
      declarations.forEach(function (d) {
        matchedNodes.forEach(function (n) {
          var style = n.props.style = n.props.style || {};
          var property = camelCase(d.property);
          if (style[property] === undefined) {
            style[property] = d.value;
          }
        });
      });
    });
  });
  return element;
};
