var scopedStyle = require('react-scoped-style');
var React = require('react');
var css = scopedStyle.parseCss(`
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
  <h1 className="test">scope react element by transform external style into inline styles</h1>
  {
    scopedStyle.transformElement(<div>
      <span>green zoom</span>
      <span style={{color:'blue'}}>blue zoom</span>
      <p>
        <span>black</span>
        <span>  -   </span>
        <a className='test a'>red zoom</a>
      </p>
    </div>, css)
    }
</div>;

React.render(html, document.getElementById('__react-content'));
