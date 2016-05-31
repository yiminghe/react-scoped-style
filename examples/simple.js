import ScopedStyle, { createStyleSheet } from 'react-scoped-style';
import React from 'react';
import ReactDOM from 'react-dom';

const style = createStyleSheet(`
.test {
  color:red;
  zoom:1.5;
}
div>span{
  color:green;
  zoom:1.5;
}
`);

const html = (<div>
  <p className="test">scope react element by transform external style into inline styles</p>
  <p>
    <a href="https://github.com/react-component/react-scoped-style">repo</a>
  </p>

  <ScopedStyle style={style}>
    <div>
      <span>green zoom</span>
      <span style={{ color: 'blue' }}>blue zoom</span>
      <p>
        <span>black</span>
        <span> - </span>
        <a className="test">red zoom</a>
      </p>

      <ScopedStyle>
        <a className="test">black isolate</a>
      </ScopedStyle>

      <ScopedStyle scoped={false}>
        <a className="test">red zoom penetrate</a>
      </ScopedStyle>
    </div>
  </ScopedStyle>
</div>);

ReactDOM.render(html, document.getElementById('__react-content'));
