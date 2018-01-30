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