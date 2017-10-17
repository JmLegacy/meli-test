import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fs from '../Assets/ic_shipping.png';


export default class Result extends Component {

  render() {

    const { className, ...props } = this.props;

   if(!this.props.result.items)return(<p className='text-center'>Loading..</p>);
      var categoriesList = null;
      if(this.props.result.categories.length > 0){
        categoriesList = this.props.result.categories.map(function(cat,val){
              return <li>{cat}</li>
        })
      }
      var List = this.props.result.items.map(function(element,key){
          let freeShipping = null;
          if (element.free_shipping){
            freeShipping = <img className='free-shipping-ic' src={fs} alt='free-shipping' title='Envio Gratis'/>;
          }
          return <li>
                    <div className='product-row'>
                      <div className='list-thumb'>
                        <Link to={`/items/${element.id}`}><img src={element.picture} alt='product-t'/></Link>
                      </div>
                      <div className='list-detail'>
                        <div className='price-location'>
                          <p className='price'>$ {element.price.amount}</p>
                          {freeShipping}
                          <p className='location'>{element.address}</p>
                        </div>
                        <div className='name'>
                          <p><Link to={`/items/${element.id}`}>{element.title}</Link></p>
                        </div>
                      </div>
                    </div>
                </li>
        })
    return (
    <div className='container'>
      <ol className='categoriesList'>{categoriesList}</ol>
      <ul className='result-list'>
          {List}
      </ul>
    </div>
    );
  }
}

