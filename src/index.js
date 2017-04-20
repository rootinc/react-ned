//import NedDictionary from './NedDictionary';
//import Ned from './Ned';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export class Ned extends Component {
  constructor() {
    super();

    this.state = {
      text:"",
    };
  }

  getNedFromProps = () => {
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

export class NedDictionary {
  constructor(properties) {
    window.ned = {};
    window.ned.NedDictionary = this;

    this.data = {};

    this.count = 0;
    this.total = 0;

    this.currentLanguage = properties.language || "en";
    this.ready = false;

    this.fetchAll(properties.urls);
  }

  getLanguage = () => {
    return this.currentLanguage;
  }

  setLanguage = (lang) => {
    this.currentLanguage = lang;
    $("*").trigger("language-changed");
  }

  getHTML = (lang,textId) => {
    return this.data[lang].find(function(item){
      return item.id === textId;
    }).text;
  }

  getText = (lang,textId) => {
    var html = this.getHTML(lang,textId);

    var $div = $("<div/>");
    $div.html(html);

    return $div.text();
  }

  fetchAll = (urls) => {
    this.count = 0;
    this.total = Object.keys(urls).length;

    for (var lang in urls)
    {
      this.fetchData(lang,urls[lang]);
    }
  }

  fetchData = (lang,url) => {
    var that = this;

    $.ajax({
      type: "GET",
      url: url
    })
    .done((response)=>{
      that.data[lang] = JSON.parse(response);

      that.count ++;
      if (that.count === that.total)
      {
        $("*").trigger("ned-loaded");
        that.ready = true;
      }
    })
    .fail((err)=>{
      console.log(err)
    });
  }
}