/*
* Author : Dang Minh Truong
* Email : mr.dangminhtruong
*/
let app = new Vue({
	el : '#app',
	data : {

	},
	methods : {
		addCart : function(productId){
			axios.get('/shoping-cart/add/' + productId)
				.then(function (response) {
					console.log(response.data);
					swal('Thank you!', 'You just added new item!', 'success');
					$('#show_cart').html(` ${response.data.cart_items} item(s)`);
				})
				.catch(function (error) {
					swal('Failed !', 'Sorry, somthing went wrong!', 'warning');
				}); 
		}
	}
});


const shoppingCart = new Vue({
	el : '#shopping_cart',
	data : {
		items : []
	},
	methods : {
		getImgPath : function(fileName){
			return `/img/${ fileName }`;
		},

		removeItem :  function(index){
			axios.get(`/shoping-cart/remove/${ index }`)
			.then((response) => {
				if(typeof response.data.items !== 'undefined'){
					this.items = response.data.items;
				}
			});
		},

		updateItemQuantity : function(productId, index){
			axios.get(`/shoping-cart/update-quantity/${ productId }`, {
				params : {
					newQuantity : this.items[index].product_quantity
				}
			})
			.then((response) => {
				this.items = response.data.items;
			});
		}
	},
	mounted : function(){
		axios.get('/shoping-cart/cart-data')
		.then((response) => {
			this.items = response.data.items;
		})
		.catch(err => console.log(err));
	}
});