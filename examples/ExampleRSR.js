import React, { Component } from 'react';
import ReactSimpleRange from '../src/';

/*
quick and extremely dirty wrapper component for RSR samples.
adds a <pre> element populated by props and some headings so i can update these examples quickly, along with a title prop
*/
export default class ExampleRSR extends Component {
  render() {
    const headingTwoStyles = {
      marginTop: '0px',
    }
    const headingStyles = {
      marginBottom: '5px',
      color: 'rgb(80, 80, 80)',
    };
    const wrapperStyles = {
      backgroundColor: '#fff',
      padding: '10px 10px 20px 10px',
      marginBottom: '25px',
    };
    const numProps = Object.keys(this.props).length - 1; // discounting title
    const propsArray = [];
    let opener = numProps > 0 ? '<ReactSimpleRange\n' : '<ReactSimpleRange />';
    let closer = numProps > 0 ? '/>' : '';
    let openingTagCloser;
    let kids;
    for (const prop in this.props) {
      const type = typeof(this.props[prop]);
      const propName = prop;
      let valueOrFnName = this.props[prop];
      let openBracket = '{';
      let closeBracket = '}';
      let eq = '=';
      switch (type) {
        case 'string': {
          openBracket = '"';
          closeBracket = '"';
          break;
        }
        case 'object': {
          openingTagCloser = '>';
          closer = '</ReactSimpleRange>';
          // faking this for now so i can move on with my life
          kids = '\n  <div style={myCustomThumbStyle}></div>\n';
          break;
        }
        case 'boolean': {
          eq = '';
          openBracket = '';
          closeBracket = '';
          valueOrFnName = '';
          break;
        }
        case 'function': {
          valueOrFnName = this.props[prop].name;
          break;
        }
        default: // nah m8
      }
      if (type !== 'object' && propName !== 'title') propsArray.push(`  ${propName}${eq}${openBracket}${valueOrFnName}${closeBracket}\n`);
    }
    const Pre = () => {
      let preStyles = {
        border: '1px solid f5f5f5',
        borderRadius: '4px',
        color: '#fff',
        backgroundColor: '#242424',
        padding: '15px',
        marginTop: '0px',
      };
      return (
        <div>
          <h4 style={headingStyles}>Code:</h4>
          <pre style={preStyles}>
            {opener}
            {propsArray}
            {openingTagCloser}
            {kids}
            {closer}
          </pre>
          <h4 style={headingStyles}>Output:</h4>
        </div>
      );
    };
    return (
      <div style={wrapperStyles}>
        <h2 style={headingTwoStyles}>{this.props.title}</h2>
        <Pre />
        <ReactSimpleRange {...this.props} />
      </div>
    );
  }
}

