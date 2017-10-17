import React, { Component } from 'react';
import fs from '../Assets/ic_shipping.png';

export default class ProductDetail extends Component {

  render() {

    const { className, ...props } = this.props;
    if(!this.props.product.item){
      if(this.props.product.hasOwnProperty('error')){
        return(<h2 className="text-center">{this.props.product.message}</h2>);
      }else{
        return(<p className="text-center">Loading..</p>);
      }
    }
    var categoriesList = null;
      if(this.props.product.item.categories.length > 0){
        categoriesList = this.props.product.item.categories.map(function(cat,val){
              return <li>{cat}</li>
        })
      }
    let freeShipping = null;
        if (this.props.product.item.free_shipping){
          freeShipping = <img className='free-shipping-ic' src={fs} alt='free-shipping' title='Envio Gratis'/>;
        }
    return (
      <div className='container'>
        <ol className='categoriesList'>{categoriesList}</ol>
        <div className='product-cont'>
            <div className="photo">
              <img src={this.props.product.item.picture} alt="productimg" />
            </div>
            <div className="product-info">
              <p className="state-sold">{this.props.product.item.condition} - {this.props.product.item.sold_quantity} Vendidos</p>
              <p className="product-title"><b>{this.props.product.item.title}</b></p>
              <p className="product-price">$ {this.props.product.item.price.amount} {freeShipping}</p>
              <button className="btn-primary">Comprar</button>
            </div>
            <div className="product-description">
              <h2>Descripcion del producto</h2>
              <p>{this.props.product.item.description}</p>
            </div>
        </div>
      </div>
    );
  }
}
