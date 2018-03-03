let countSum = (cart) => {
    if(cart){
        let total = 0;
        cart.forEach(detail => {
            total +=  (detail.promo_price !== 0 ) ? detail.product_quantity * detail.promo_price :  detail.product_quantity*detail.unit_price;
        });
        return total;
    }
   return 0;
}


module.exports = countSum;