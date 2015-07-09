'use strict';

var expect = require('expect.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var scryRenderedDOMComponentsWithClass = TestUtils.scryRenderedDOMComponentsWithClass;
var ScopedStyle = require('../');

describe('react-scoped-style', function () {
  var container;

  beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(function () {
    React.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  it('simple works', function () {
    var style = ScopedStyle.createStyleSheet(`
.test {
  color:red;
  zoom:1.5;
}
div>span{
  color:green;
  zoom:1.5;
}
`);

    var html = <div>
      <h1 className="test h1" id>scope react element by transform external style into inline styles</h1>
      <ScopedStyle style={style}>
        <div>
          <span className="s1">green zoom</span>
          <span style={{color: 'blue'}} className="s2">blue zoom</span>
          <p>
            <span className="s3">black</span>
            <span>  -   </span>
            <a className='test a1'>red zoom</a>
          </p>
          <ScopedStyle>
            <a className='test a2'>black isolate</a>
          </ScopedStyle>

          <ScopedStyle scoped={false}>
            <a className='test a3'>red zoom penetrate</a>
          </ScopedStyle>
        </div>
      </ScopedStyle>
    </div>;

    var node = React.render(html, container);

    expect(scryRenderedDOMComponentsWithClass(node, 'h1')[0].props.style).not.to.be.ok();
    expect(scryRenderedDOMComponentsWithClass(node, 'h1')[0].props.style).not.to.be.ok();

    expect(scryRenderedDOMComponentsWithClass(node, 's1')[0].props.style.color).to.be('green');
    expect(scryRenderedDOMComponentsWithClass(node, 's1')[0].props.style.zoom).to.be('1.5');


    expect(scryRenderedDOMComponentsWithClass(node, 's2')[0].props.style.color).to.be('blue');
    expect(scryRenderedDOMComponentsWithClass(node, 's2')[0].props.style.zoom).to.be('1.5');


    expect(scryRenderedDOMComponentsWithClass(node, 's3')[0].props.style.color).not.to.be.ok();
    expect(scryRenderedDOMComponentsWithClass(node, 's3')[0].props.style.zoom).not.to.be.ok();


    expect(scryRenderedDOMComponentsWithClass(node, 'a1')[0].props.style.color).to.be('red');
    expect(scryRenderedDOMComponentsWithClass(node, 'a1')[0].props.style.zoom).to.be('1.5');

    expect(scryRenderedDOMComponentsWithClass(node, 'a2')[0].props.style.color).not.to.be.ok();
    expect(scryRenderedDOMComponentsWithClass(node, 'a2')[0].props.style.zoom).not.to.be.ok();

    expect(scryRenderedDOMComponentsWithClass(node, 'a3')[0].props.style.color).to.be('red');
    expect(scryRenderedDOMComponentsWithClass(node, 'a3')[0].props.style.zoom).to.be('1.5');

  });

});
