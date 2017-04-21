var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Ned = React.createClass({
  getDefaultProps:function() {
    return {
      text:""
    };
  },

  getNedFromProps:function() {
    if (this.props.format)
    {
      this.setState({
        text:window.ned.NedDictionary.getHTML(window.ned.NedDictionary.getLanguage(),this.props.textId)
      });
    }
    else
    {
      this.setState({
        text:window.ned.NedDictionary.getText(window.ned.NedDictionary.getLanguage(),this.props.textId)
      });
    } 
  },

  componentDidMount:function() {
    var that = this;

    if (window.ned.NedDictionary.ready)
    {
      this.getNedFromProps();
    }
    
    //@ todo: Figure out how to pass messages in React between components
    $(ReactDOM.findDOMNode(this)).on("ned-loaded language-changed",function(){
      that.getNedFromProps();
    });
  },

  render:function() {
    var props = JSON.parse(JSON.stringify(this.props));

    //remove all custom ned stuff
    delete props.format;
    delete props.textId;
    delete props.inputType;

    var text = this.state.text;

    var ElementType = this.props.inputType || "span";

    if (this.props.format)
    {
      props.dangerouslySetInnerHTML = { __html: text };
      return React.createElement(ElementType,props);
    }
    else
    {
      return React.createElement(ElementType,props,text);
    }
  }
});

module.exports = Ned;