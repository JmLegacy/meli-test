export function searchProducts(param){
    
    var result = {
        author: {name: 'Jose Miguel', lastname: 'Guanique Seguias' },
        categories: [],
        items:[],
        };

    return fetch('https://api.mercadolibre.com/sites/MLA/search?q=:${'+param+'}&limit=4')
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if(res.hasOwnProperty('results')){
            if(res.results.length > 0){
                res.filters.forEach(function(element, arr){
                    if((element.name === 'Categories')){
                        element.values[0].path_from_root.forEach(function(pathC){
                            result.categories.push(pathC.name);
                        });
                    }
                });
                res.results.forEach(function(product){
                    var temp = {id: '', title: '', price: {currency: '',amount: 0, decimals: 0},
                        picture: '',address:'', condition: '', free_shipping: false};

                        temp.id = product.id;
                        temp.title = product.title;
                        temp.price.currency = product.currency_id;
                        temp.price.amount = Math.ceil(product.price);
                        temp.price.amount = temp.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        temp.picture = product.thumbnail;
                        temp.condition = product.condition;
                        temp.free_shipping = product.shipping.free_shipping;
                        temp.address = product.address.state_name;
                        result.items.push(temp);
                    
                });
            }
            return result;
        }
      })
     
};

export function searchSingleProduct(param){
  var result = {
        author: {name: 'Jose Miguel', lastname: 'Guanique Seguias' },
        item: {
                id: '',
                title: '',
                price: {currency: '', amount: 0,decimals: 0},
                picture: '',
                condition: '',
                free_shipping: false,
                sold_quantity:0,
                description: ''
              }
        };

        return fetch('https://api.mercadolibre.com/items/'+param)
            .then((response) => {
                return response.json()
            })
            .then((res) => {

                if(res.hasOwnProperty('error')){
                    return res;
                }else{
                    
                    result.item.id = res.id;
                    result.item.title = res.title;
                    result.item.price.currency = res.currency_id;
                    result.item.price.amount =  Math.ceil(res.price);
                    result.item.price.amount= result.item.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    result.item.picture = res.pictures[0].url;
                    result.item.condition = (res.condition === 'used') ? 'Usado' : 'Nuevo';
                    result.item.free_shipping = res.shipping.free_shipping;
                    result.item.sold_quantity = res.sold_quantity;
                    result.item.category_id = res.category_id;
                    
                    return result;

                }

            })
}

export function productDescription(param){

    return  fetch('https://api.mercadolibre.com/items/'+param+'/description')
    .then((response2) => {
        return response2.json()
    }).then((res2) => {
        return res2.plain_text;
    })

}

export function getProductCategoryRoot(param){
        return  fetch('https://api.mercadolibre.com/categories/'+param)
        .then((response3) => {
            return response3.json()
        }).then((res3) => {
            var categories = [];
            res3.path_from_root.forEach(function(pathC){
                categories.push(pathC.name);
            });
            return categories;
        })
    
    }