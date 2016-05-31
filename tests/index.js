import expect from 'expect.js';
import ScopedStyle, { createStyleSheet } from '../';
import React from 'react';
import ReactDOM from 'react-dom';

describe('react-scoped-style', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  it('simple works', () => {
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
      <h1 className="test h1" id>
        scope react element by transform external style into inline styles
      </h1>
      <ScopedStyle style={style}>
        <div>
          <span className="s1">green zoom</span>
          <span style={{ color: 'blue' }} className="s2">blue zoom</span>
          <p>
            <span className="s3">black</span>
            <span> - </span>
            <a className="test a1">red zoom</a>
          </p>
          <ScopedStyle>
            <a className="test a2">black isolate</a>
          </ScopedStyle>

          <ScopedStyle scoped={false}>
            <a className="test a3">red zoom penetrate</a>
          </ScopedStyle>
        </div>
      </ScopedStyle>
    </div>);

    const node = ReactDOM.render(html, container);


    expect((node.getElementsByClassName('h1')[0]).style.color).not.to.be.ok();
    expect((node.getElementsByClassName('h1')[0]).style.zoom).not.to.be.ok();

    expect(node.getElementsByClassName('s1')[0].style.color).to.be('green');
    expect(node.getElementsByClassName('s1')[0].style.zoom).to.be('1.5');


    expect(node.getElementsByClassName('s2')[0].style.color).to.be('blue');
    expect(node.getElementsByClassName('s2')[0].style.zoom).to.be('1.5');


    expect(node.getElementsByClassName('s3')[0].style.color).not.to.be.ok();
    expect(node.getElementsByClassName('s3')[0].style.zoom).not.to.be.ok();


    expect(node.getElementsByClassName('a1')[0].style.color).to.be('red');
    expect(node.getElementsByClassName('a1')[0].style.zoom).to.be('1.5');

    expect(node.getElementsByClassName('a2')[0].style.color).not.to.be.ok();
    expect(node.getElementsByClassName('a2')[0].style.zoom).not.to.be.ok();

    expect(node.getElementsByClassName('a3')[0].style.color).to.be('red');
    expect(node.getElementsByClassName('a3')[0].style.zoom).to.be('1.5');
  });
});
