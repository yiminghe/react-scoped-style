var domify = require('./domify');
var flatten = require('./flatten');
var querySelectorAll = require('./css-selector/select');

function camelCase(str) {
  return str.replace(/-\w/g, function (w) {
    return w.charAt(1).toUpperCase();
  });
}

module.exports = function (element, style) {
  if (!style) {
    return element;
  }
  if (!Array.isArray(style)) {
    style = [style];
  }
  //console.log(css);
  //console.log(element);
  element = domify(element);
  //console.log(element);
  var allNodes = flatten(element);

  style.forEach(function (s) {
    if (s) {
      var stylesheet = s.stylesheet || {};
      var rules = stylesheet.rules || [];
      rules.forEach(function (r) {
        var selectors = r.selectors;
        var declarations = r.declarations;
        selectors.forEach(function (selector) {
          var matchedNodes = querySelectorAll(selector, allNodes);
          //console.log(matchedNodes);
          declarations.forEach(function (d) {
            var property = camelCase(d.property);
            matchedNodes.forEach(function (n) {
              var style = n.props.style = n.props.style || {};
              if (style[property] === undefined) {
                style[property] = d.value;
              }
            });
          });
        });
      });
    }
  });

  return element;
};
