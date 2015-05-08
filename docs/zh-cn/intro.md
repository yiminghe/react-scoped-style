# 在 react 中使用 scoped style

记得初次接触这个问题是希望优化店铺装修项目，当时没有想到好的方法，只能还是按照已有方案在后端进行 css 预处理，导致后面仍然零星有安全问题，
一直期待着什么时候 [shadow dom](www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/) 能够普及，然而现实是残酷的，还好现在有了 virtual dom 中间层，通过这一层或许能够解决这个问题.
下面结合例子展示下目前的实验效果，代码库 https://github.com/react-component/react-scoped-style


## 实验

方法是将想要隔离样式的元素包裹在自定义组件 [ScopeStyle](https://github.com/react-component/react-scoped-style) 里面，将自定义样式定义在 style 属性中，
那么自定义样式只会作用于 ScopeStyle 组件里面的普通 dom 元素，而不会泄漏到外边以及更里面的自定义组件（类似 custom element shadow dom）

## app

```js
class App extends React.Component {
  render() {
    return <div className="container">

      <Region>
        <SubRegion/>
      </Region>
    </div>;
  }
}
```

app 包括两个互相嵌套的组件 region 与 subRegion，目标是 region 和 subRegion 除非显示声明否则不能共享样式


## 共享的样式

block.css

```css
div > h2.block {
  color: red;
}
```

需要通过 ScopeStyle.createStyleSheet 转换为 ScopeStyle 能够理解的格式

blockStyle.js

```js
var ScopedStyle = require('react-scoped-style');
var css = require('raw!./block.css');
module.exports = ScopedStyle.createStyleSheet(css);
module.exports.raw = css;
```

## Region 特有的样式

Region.css

```css
.container {
  border-style: solid;
  border-color: red;
  margin: 10px;
  padding:50px;
  border-width: 10px;
}
```

regionStyle.js

```js
var ScopedStyle = require('react-scoped-style');
var css = require('raw!./Region.css');
module.exports = ScopedStyle.createStyleSheet(css);
module.exports.raw = css;
```

## SubRegion 特有的样式

SubRegion.css
```css
.container {
  border: 1px solid green;
  margin: 100px;
}
```

subRegionStyle.js
```js
var ScopedStyle = require('react-scoped-style');
var css = require('raw!./SubRegion.css');
module.exports = ScopedStyle.createStyleSheet(css);
module.exports.raw = css;
```

## Region 组件

编写 Region 组件，指定其特有的 style 和公用 style

```js
var React = require('react');
var ScopedStyle = require('react-scoped-style');
var regionStyle = require('./regionStyle');
var blockStyle = require('./blockStyle');

class Region extends React.Component {
  render() {
    return <ScopedStyle style={[blockStyle, regionStyle]}>
      <div className="container">
        <h2 className="block">css:</h2>
        <p className="block">
        {blockStyle.raw}
        {regionStyle.raw}
        </p>
      {this.props.children}
      </div>
    </ScopedStyle>;
  }
}

module.exports = Region;
```

## SubRegion 组件

编写 SubRegion 组件，指定其特有的 style 和公用 style

```js
var React = require('react');
var ScopedStyle = require('react-scoped-style');
var subRegionStyle = require('./subRegionStyle');
var blockStyle = require('./blockStyle');

class SubRegion extends React.Component {
  render() {
    return <ScopedStyle style={[blockStyle, subRegionStyle]}>
      <div className="container">
        <h2 className="block">Sub Region css</h2>
        <p className="block">
        {blockStyle.raw}
        {subRegionStyle.raw}
        </p>
      </div>
    </ScopedStyle>;
  }
}

module.exports = SubRegion;
```

## 最终效果

最终渲染 app 后可以看到 region 和 subRegion 进行了成功隔离，样式不会互相冲突了.

<img src='http://gtms01.alicdn.com/tps/i1/TB1rWMzHFXXXXbyXpXXRilo7FXX-1944-1130.png'/>

http://react-component.github.io/react-scoped-style/build/webpack-examples/
