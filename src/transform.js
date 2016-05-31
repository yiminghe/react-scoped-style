import domify from './domify';
import flatten from './flatten';
import querySelectorAll from '../vendor/css-selector/select';

function camelCase(str) {
  return str.replace(/-\w/g, (w) => {
    return w.charAt(1).toUpperCase();
  });
}

export default function transform(element, style) {
  if (!style) {
    return element;
  }
  if (!Array.isArray(style)) {
    style = [style];
  }
  // console.log(css);
  // console.log(element);
  element = domify(element);
  // console.log(element);
  const allNodes = flatten(element);

  style.forEach((s) => {
    if (s) {
      const stylesheet = s.stylesheet || {};
      const rules = stylesheet.rules || [];
      rules.forEach((r) => {
        const selectors = r.selectors;
        const declarations = r.declarations;
        selectors.forEach((selector) => {
          const matchedNodes = querySelectorAll(selector, allNodes);
          // console.log(matchedNodes);
          declarations.forEach((d) => {
            const property = camelCase(d.property);
            matchedNodes.forEach((n) => {
              // TODO clone node and modify style?
              const nodeStyle = n.props.style;
              if (nodeStyle[property] === undefined) {
                nodeStyle[property] = d.value;
              }
            });
          });
        });
      });
    }
  });

  return element;
}
