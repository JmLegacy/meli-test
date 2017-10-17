import React, { Component } from 'react';
import Search from '../../elements/Search';
import classnames from 'classnames';

import './style.css';

export default class App extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('App', className)} {...props}>
       <Search history={this.props.history}/>
      </div>
    );
  }
}
