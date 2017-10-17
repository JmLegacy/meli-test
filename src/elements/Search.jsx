import React, { Component } from 'react';

import classnames from 'classnames';

import logo from '../Assets/Logo_ML.png';
import searchIcon from '../Assets/ic_Search.png';
import {  Link } from 'react-router-dom';

export default class Search extends Component {
    constructor(props) {
        
        super(props);

        this.state = {search: ''};
        
        this.handleSearch = this.handleSearch.bind(this);
        this.SearchProduct = this.SearchProduct.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
      }

  handleSearch(event) {
    this.setState({search: event.target.value});
  }
  
  SearchProduct(event){
      if(this.state.search !== '')
      {
        this.props.history.push('/items?search='+this.state.search);
      }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.SearchProduct();
    }
  }
  
  render() {
    const { className, ...props } = this.props;
    return (
    <div>
        <div className={classnames("navbar navbar-light bg-light", className)}>
            <div className={classnames("form-inline", className)}>
                <div className={classnames("input-group meli-input-cont", className)}>
                    <Link to={`/`}><img className={classnames("meli-logo", className)} src={logo} alt="meli-logo"/></Link>
                    <input type="text" value={this.state.search} onChange={this.handleSearch} onKeyPress={this.handleKeyPress} className={classnames("meli-search form-control", className)} placeholder="Nunca dejes de buscar"/>
                    <span className={classnames("input-group-addon", className)} 
                        onClick={this.SearchProduct}
                    > 
                       <img src={searchIcon} alt="search" />
                     </span>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
