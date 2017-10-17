import React, { Component } from 'react';
import Search from '../../elements/Search';
import ProductDetail from '../../elements/ProductDetail';
import { searchSingleProduct, productDescription, getProductCategoryRoot } from '../../Service/Meli.js';

import './style.css';

export default class Product extends Component {
constructor(props){
    super(props);
    
    this.state = {product: []};

}

componentWillMount(){
    console.log(this.props.match.params.id);
    searchSingleProduct(this.props.match.params.id).then((response) =>{
        console.log(response);
        if(response.hasOwnProperty('error')){
            this.setState({product: response});
        }else{
            productDescription(this.props.match.params.id).then((description)=>{
                response.item.description = description;
                getProductCategoryRoot(response.item.category_id).then((categories)=>{
                    response.item.categories = categories;
                    this.setState({product: response});
                })
            })
        }
    });
}

render() {
    const { className, ...props } = this.props;
    return (
    <div>
      <Search history={this.props.history} />
      <ProductDetail product={this.state.product} />
    </div>
    );
  }
}