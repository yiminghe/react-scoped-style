'use strict';

// css3 selector engine for react element

var parser = require('../../vendor/css-selector-parse');
var React = require('react');
var ReactChildren = React.Children;

var EXPANDO_SELECTOR_KEY = '_ks_data_selector_id_';
var caches = {};
var uuid = 0;
var subMatchesCache = {};
var SPACE = ' ';
var aNPlusB = /^(([+-]?(?:\d+)?)?n)?([+-]?\d+)?$/;

// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
var unescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g;

function unescapeFn(_, escaped) {
  var high = '0x' + escaped - 0x10000;
  // NaN means non-codepoint
  return isNaN(high) ?
    escaped :
    // BMP codepoint
    high < 0 ?
      String.fromCharCode(high + 0x10000) :
      // Supplemental Plane codepoint (surrogate pair)
      String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
}

function unEscape(str) {
  return str.replace(unescape, unescapeFn);
}

function resetStatus() {
  subMatchesCache = {};
}

function dir(el, direction) {
  if (!el || !el.props) {
    return null;
  }
  var prop = el.props;
  if (typeof direction === 'string') {
    return prop[direction];
  }
  direction.forEach(function (d) {
    prop = prop[d];
  });
  return prop;
}

function matchIndexByAb(index, a, b, eq) {
  if (a === 0) {
    if (index === b) {
      return eq;
    }
  } else if ((index - b) / a >= 0 && (index - b) % a === 0 && eq) {
    return 1;
  }

  return undefined;
}

function getAb(param) {
  var a = 0;
  var match;
  var b = 0;
  if (typeof param === 'number') {
    b = param;
  } else if (param === 'odd') {
    a = 2;
    b = 1;
  } else if (param === 'even') {
    a = 2;
    b = 0;
  } else if ((match = param.replace(/\s/g, '').match(aNPlusB))) {
    if (match[1]) {
      a = parseInt(match[2], 10);
      if (isNaN(a)) {
        if (match[2] === '-') {
          a = -1;
        } else {
          a = 1;
        }
      }
    } else {
      a = 0;
    }
    b = parseInt(match[3], 10) || 0;
  }
  return {
    a: a,
    b: b
  };
}

function toArray(children) {
  var ret = [];
  ReactChildren.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}

function startsWith(str, prefix) {
  return str.lastIndexOf(prefix, 0) === 0;
}

function endsWith(str, suffix) {
  var ind = str.length - suffix.length;
  return ind >= 0 && str.indexOf(suffix, ind) === ind;
}

function getAttr(el, name) {
  return el.props[name];
}

function isTag(el, value) {
  return el.type && typeof el.type === 'string' && el.type === value;
}

function hasSingleClass(el, cls) {
  var className = el.props.className;
  return className && (className = className.replace(/[\r\t\n]/g, SPACE)) &&
    (SPACE + className + SPACE).indexOf(SPACE + cls + SPACE) > -1;
}

var matchExpr;

var pseudoFnExpr = {
  'nth-child': function (el, param) {
    var ab = getAb(param);
    var a = ab.a;
    var b = ab.b;
    if (a === 0 && b === 0) {
      return 0;
    }
    var index = 0;
    var parent = el.props.__reactScopedCss__anchor.__reactScopedCss__parentNode;
    if (parent) {
      var childNodes = parent.props.children;
      var ret;
      ReactChildren.forEach(childNodes, function (child) {
        if (React.isValidElement(child)) {
          index++;
          ret = matchIndexByAb(index, a, b, child === el);
          if (ret !== undefined) {
            return ret;
          }
        }
      });
    }
    return 0;
  },
  'nth-last-child': function (el, param) {
    var ab = getAb(param);
    var a = ab.a;
    var b = ab.b;
    if (a === 0 && b === 0) {
      return 0;
    }
    var index = 0;
    var parent = el.props.__reactScopedCss__anchor.__reactScopedCss__parentNode;
    if (parent) {
      var childNodes = toArray(parent.props.children);
      var len = childNodes.length;
      var count = len - 1;
      var child, ret;
      for (; count >= 0; count--) {
        child = childNodes[count];
        if (React.isValidElement(child)) {
          index++;
          ret = matchIndexByAb(index, a, b, child === el);
          if (ret !== undefined) {
            return ret;
          }
        }
      }
    }
    return 0;
  },
  'nth-of-type': function (el, param) {
    var ab = getAb(param);
    var a = ab.a;
    var b = ab.b;
    if (a === 0 && b === 0) {
      return 0;
    }
    var index = 0;
    var parent = el.props.__reactScopedCss__anchor.__reactScopedCss__parentNode;
    if (parent) {
      var childNodes = toArray(parent.props.children);
      var elType = el.type;
      var count = 0;
      var child, ret;
      var len = childNodes.length;
      for (; count < len; count++) {
        child = childNodes[count];
        if (child && child.type === elType) {
          index++;
          ret = matchIndexByAb(index, a, b, child === el);
          if (ret !== undefined) {
            return ret;
          }
        }
      }
    }
    return 0;
  },
  'nth-last-of-type': function (el, param) {
    var ab = getAb(param);
    var a = ab.a;
    var b = ab.b;
    if (a === 0 && b === 0) {
      return 0;
    }
    var index = 0;
    var parent = el.props.__reactScopedCss__anchor.__reactScopedCss__parentNode;
    if (parent) {
      var childNodes = toArray(parent.props.children);
      var len = childNodes.length;
      var elType = el.type;
      var count = len - 1;
      var child, ret;
      for (; count >= 0; count--) {
        child = childNodes[count];
        if (child && child.type === elType) {
          index++;
          ret = matchIndexByAb(index, a, b, child === el);
          if (ret !== undefined) {
            return ret;
          }
        }
      }
    }
    return 0;
  },
  not: function (el, negationArg) {
    return !matchExpr[negationArg.t](el, negationArg.value);
  }
};

var pseudoIdentExpr = {
  empty: function (el) {
    var childNodes = toArray(el.props.children);
    var index = 0;
    var len = childNodes.length - 1;
    var child;
    for (; index < len; index++) {
      child = childNodes[index];
      // only element nodes and content nodes
      // (such as Dom [Dom-LEVEL-3-CORE] text nodes,
      // CDATA nodes, and entity references
      if (child !== null) {
        return 0;
      }
    }
    return 1;
  },
  'first-child': function (el) {
    return pseudoFnExpr['nth-child'](el, 1);
  },
  'last-child': function (el) {
    return pseudoFnExpr['nth-last-child'](el, 1);
  },
  'first-of-type': function (el) {
    return pseudoFnExpr['nth-of-type'](el, 1);
  },
  'last-of-type': function (el) {
    return pseudoFnExpr['nth-last-of-type'](el, 1);
  },
  'only-child': function (el) {
    return pseudoIdentExpr['first-child'](el) &&
      pseudoIdentExpr['last-child'](el);
  },
  'only-of-type': function (el) {
    return pseudoIdentExpr['first-of-type'](el) &&
      pseudoIdentExpr['last-of-type'](el);
  },
  enabled: function (el) {
    return !el.props.disabled;
  },
  disabled: function (el) {
    return el.props.disabled;
  },
  checked: function (el) {
    var nodeName = el.type;
    return (nodeName === 'input' && el.props.checked) ||
      (nodeName === 'option' && el.props.selected);
  }
};

var attributeExpr = {
  '~=': function (elValue, value) {
    if (!value || value.indexOf(' ') > -1) {
      return 0;
    }
    return (' ' + elValue + ' ').indexOf(' ' + value + ' ') !== -1;
  },
  '|=': function (elValue, value) {
    return (' ' + elValue).indexOf(' ' + value + '-') !== -1;
  },
  '^=': function (elValue, value) {
    return value && startsWith(elValue, value);
  },
  '$=': function (elValue, value) {
    return value && endsWith(elValue, value);
  },
  '*=': function (elValue, value) {
    return value && elValue.indexOf(value) !== -1;
  },
  '=': function (elValue, value) {
    return elValue === value;
  }
};

var relativeExpr = {
  '>': {
    dir: ['__reactScopedCss__anchor', '__reactScopedCss__parentNode'],
    immediate: 1
  },
  ' ': {
    dir: ['__reactScopedCss__anchor', '__reactScopedCss__parentNode'],
  },
  '+': {
    dir: ['__reactScopedCss__anchor', '__reactScopedCss__previousSibling'],
    immediate: 1
  },
  '~': {
    dir: ['__reactScopedCss__anchor', '__reactScopedCss__previousSibling'],
  }
};

matchExpr = {
  tag: isTag,
  cls: hasSingleClass,
  id: function (el, value) {
    return el && el.props.id === value;
  },
  attrib: function (el, value) {
    var name = value.ident;
    var elValue = getAttr(el, name);
    var match = value.match;
    if (!match && elValue !== undefined) {
      return 1;
    } else if (match) {
      if (elValue === undefined) {
        return 0;
      }
      var matchFn = attributeExpr[match];
      if (matchFn) {
        return matchFn(elValue + '', value.value + '');
      }
    }
    return 0;
  },
  pseudo: function (el, value) {
    var fn, fnStr, ident;
    if ((fnStr = value.fn)) {
      if (!(fn = pseudoFnExpr[fnStr])) {
        throw new SyntaxError('Syntax error: not support pseudo: ' + fnStr);
      }
      return fn(el, value.param);
    }
    if ((ident = value.ident)) {
      if (!pseudoIdentExpr[ident]) {
        throw new SyntaxError('Syntax error: not support pseudo: ' + ident);
      }
      return pseudoIdentExpr[ident](el);
    }
    return 0;
  }
};


parser.lexer.yy = {
  trim: function (s) {
    return s.trim();
  },
  unEscape: unEscape,
  unEscapeStr: function (str) {
    return this.unEscape(str.slice(1, -1));
  }
};

function singleMatch(el, match) {
  if (!match) {
    return true;
  }
  if (!el) {
    return false;
  }

  var matched = 1;
  var matchSuffix = match.suffix;
  var matchSuffixLen;
  var matchSuffixIndex;

  if (match.t === 'tag') {
    matched &= matchExpr.tag(el, match.value);
  }

  if (matched && matchSuffix) {
    matchSuffixLen = matchSuffix.length;
    matchSuffixIndex = 0;
    for (; matched && matchSuffixIndex < matchSuffixLen; matchSuffixIndex++) {
      var singleMatchSuffix = matchSuffix[matchSuffixIndex],
        singleMatchSuffixType = singleMatchSuffix.t;
      if (matchExpr[singleMatchSuffixType]) {
        matched &= matchExpr[singleMatchSuffixType](el, singleMatchSuffix.value);
      }
    }
  }

  return matched;
}

// match by adjacent immediate single selector match

function matchImmediate(el, match) {
  var matched = 1;
  var startEl = el;
  var relativeOp;
  var startMatch = match;

  do {
    matched &= singleMatch(el, match);
    if (matched) {
      // advance
      match = match && match.prev;
      if (!match) {
        return true;
      }
      relativeOp = relativeExpr[match.nextCombinator];
      el = dir(el, relativeOp.dir);
      if (!relativeOp.immediate) {
        return {
          // advance for non-immediate
          el: el,
          match: match
        };
      }
    } else {
      relativeOp = relativeExpr[match.nextCombinator];
      if (relativeOp.immediate) {
        // retreat but advance startEl
        return {
          el: dir(startEl, relativeExpr[startMatch.nextCombinator].dir),
          match: startMatch
        };
      } else {
        // advance (before immediate match + jump unmatched)
        return {
          el: el && dir(el, relativeOp.dir),
          match: match
        };
      }
    }
  } while (el);

  // only occur when match immediate
  return {
    el: dir(startEl, relativeExpr[startMatch.nextCombinator].dir),
    match: startMatch
  };
}

// find fixed part, fixed with seeds
function findFixedMatchFromHead(el, head) {
  var relativeOp;
  var cur = head;
  do {
    if (!singleMatch(el, cur)) {
      return null;
    }
    cur = cur.prev;
    if (!cur) {
      return true;
    }
    relativeOp = relativeExpr[cur.nextCombinator];
    el = dir(el, relativeOp.dir);
  } while (el && relativeOp.immediate);
  if (!el) {
    return null;
  }
  return {
    el: el,
    match: cur
  };
}

function genId(el) {
  var selectorId;
  if (!(selectorId = el.props[EXPANDO_SELECTOR_KEY])) {
    selectorId = el.props[EXPANDO_SELECTOR_KEY] = (+new Date()) + '_' + (++uuid);
  }
  return selectorId;
}

// recursive match by sub selector string from right to left
// grouped by immediate selectors

var matchSubInternal, matchSub;

matchSubInternal = (el, match) => {
  var matchImmediateRet = matchImmediate(el, match);
  if (matchImmediateRet === true) {
    return true;
  } else {
    el = matchImmediateRet.el;
    match = matchImmediateRet.match;
    while (el) {
      if (matchSub(el, match)) {
        return true;
      }
      el = dir(el, relativeExpr[match.nextCombinator].dir);
    }
    return false;
  }
};

matchSub = (el, match) => {
  var selectorId = genId(el);
  var matchKey = selectorId + '_' + (match.order || 0);
  if (matchKey in subMatchesCache) {
    return subMatchesCache[matchKey];
  }
  subMatchesCache[matchKey] = matchSubInternal(el, match);
  return subMatchesCache[matchKey];
};

function select(str, seeds) {
  if (!seeds.length) {
    return [];
  }
  var selector = caches[str];
  if (!selector) {
    selector = caches[str] = parser.parse(str);
  }
  var groupIndex = 0;
  var groupLen = selector.length;
  var group;
  var ret = [];
  var seedsLen = seeds.length;
  for (; groupIndex < groupLen; groupIndex++) {
    resetStatus();
    group = selector[groupIndex];
    var seedsIndex = 0;
    for (; seedsIndex < seedsLen; seedsIndex++) {
      var seed = seeds[seedsIndex];
      var matchHead = findFixedMatchFromHead(seed, group);
      if (matchHead === true) {
        ret.push(seed);
      } else if (matchHead) {
        if (matchSub(matchHead.el, matchHead.match)) {
          ret.push(seed);
        }
      }
    }
  }
  return ret;
}

module.exports = select;
