import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class Ned extends Component {
  constructor() {
    super();

    this.state = {
      text:"",
    };

    this.getNedFromProps = this.getNedFromProps.bind(this);
  }

  getNedFromProps() {
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
  }

  componentDidMount() {
    var that = this;

    if (window.ned.NedDictionary.ready)
    {
      this.getNedFromProps();
    }
    
    //@ todo: Figure out how to pass messages in React between components
    $(ReactDOM.findDOMNode(this)).on("ned-loaded language-changed",function(){
      that.getNedFromProps();
    });
  }

  render() {
    var props = JSON.parse(JSON.stringify(this.props));

    //remove all custom ned stuff
    delete props.format;
    delete props.textId;
    delete props.inputType;

    var text = this.state.text;

    var ElementType = this.props.inputType || "span";

    if (this.props.format)
    {
      return (
        <ElementType {...props} dangerouslySetInnerHTML={{__html:text}}></ ElementType>
      )
    }
    else
    {
      return (
        <ElementType {...props}>{text}</ ElementType>
      )
    }
  }
}