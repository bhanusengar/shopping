(function($) {
	console.log("Script Start");
	var cartIds = [];
	var productIds;
	if (localStorage.getItem(productIds) !== null) {
		cartProduct();
	}
	
	$(".addProduct").on('click',function(){
		console.log($(this).data('productid'));
		let productId = $(this).data('productid');

		if (localStorage.getItem(productIds) === null) {
			
			console.log('empty')
			
			if(cartIds.length<=0){

				console.log(1)
				
				cartIds.push(productId);
				localStorage.setItem(productIds,cartIds);
				
				let products = localStorage.getItem(productIds);
				console.log(products)
				let productArr = products.split(',')
				console.log(productArr);
				$("#productQty").text(productArr.length);
				
			}else{
				console.log(2)
				cartProduct(productId);
			}
		}else{
			console.log('nO EMPTY')
			cartProduct(productId);
			
		}
	})
	
	$(".cartItemCheck").on('click',function(){
		let cartAddedProduct = localStorage.getItem(productIds).split(',');
		console.log(cartAddedProduct)
	})
	
	console.log("Script Ends");
	
	function cartProduct(productId){
		let products = localStorage.getItem(productIds);
		console.log(products)
		let productArr = products.split(',');
		console.log(productId);
		if(productId!=undefined){
			console.log("productId is empty")
			if($.inArray(productId, productArr) != -1 && productId!=""){
				alert('Product already in cart.');
			}else{
				productArr.push(productId);
				console.log(productArr);
				localStorage.setItem(productIds,productArr);
				$("#productQty").text(productArr.length);
			}
		}else{
			$("#productQty").text(productArr.length);
		}
		
		
	}
	
	function cartPage(){
		let products = localStorage.getItem(productIds);
		$.ajax({
			url:"/cartIds",
			type: 'POST',
			data:{products:products},
			dataType: 'json',
			success:function(dataSet){
				console.log(dataSet)
			}
		})
	}
	cartPage();
	
})(jQuery);




