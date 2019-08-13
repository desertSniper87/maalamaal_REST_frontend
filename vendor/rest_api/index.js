let productCardTemplateHtml= $('#productCardTemplate').html();
let cartTemplateHtml= $('#cartTemplate').html();
let $productList = $('#productList');

// Query for products (and cart).
$(document).ready(function(){
    if (getCartStatusInCookie) {
        $('#cartButton').removeClass('d-none');
    }
    $('#cartButton').removeClass('d-none');

    $.ajax({
        url: config.backend_url + "/products/",
        method: "GET",
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            globalProductData = data.results;
            html = Mustache.to_html(productCardTemplateHtml, {data: data.results});
            $productList.append(html);
            $('#loadingSpinner').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#loadingSpinner').hide();
            $('#serverErrorMsg').show();
            console.log("error");
            console.log("textStatus: " + textStatus);
            console.log("errorThrown: " + errorThrown);
        },
        timeout: 10000
    });
});

let $productDetailsModal= $('#productDetailsModal');
let $btnProductDetails = $('.btnProductDetails');
var currentlySelectedProductId;
var currentlySelectedProductUnitPrice;

var getCurrentProduct = function (currentlySelectedProductId){ 
    let currentProduct = globalProductData.filter(obj => {
      return obj.id === currentlySelectedProductId;
    })[0];

    return currentProduct;
}

$(document).on("click", ".btnProductDetails", function(){
    currentlySelectedProductId = Number($(this).attr('data-itemId'));
    currentProduct = getCurrentProduct(currentlySelectedProductId);

    $('#productDetailsCardImage').attr('src', currentProduct.image);
    $('#modalProductName').text(currentProduct.name);
    $('#modalProductPrice').text('Per unit price: ' + currentProduct.price_taka + ' Taka');
    $('#modalInputQuantity').attr('max', currentProduct.available_quantity);
    $('#modalInputProductUrl').val(config.backend_url + "/products/" + currentProduct.id + "/");
    $('#modalAvailableQuantity').text(currentProduct.available_quantity + 'pc. Available');
    $('#modalProductSeller').text('Seller name: ' + currentProduct.seller);
    $('#modalProductDesc').text(currentProduct.description);

    $productDetailsModal.modal('show');
});

$(document).on("change", "#modalInputQuantity", function(){
    currentProduct = getCurrentProduct(currentlySelectedProductId)
    total_cost = currentProduct.price_taka * $(this).val();
    $('#modalTotalPrice').text(total_cost);
    $('#modalTotalCostText').removeClass('d-none');
});

var getCartData = function (){ 
    let result;
    $.ajax({
        url: config.backend_url + "/carts/",
        data: $(this).serialize(),
        // dataType
        method: "GET",
        crossDomain: true,
        async: false,
        headers: {
            "Authorization": "Token " + Cookies.get('token'),
        },
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            //$('#cartButton').removeClass('d-none');
            result = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
            console.log("textStatus: " + textStatus);
            console.log("errorThrown: " + errorThrown);
        },
    });
    return result;
};

var setCartStatusInCookie = function(val){
    username = Cookies.get('username');
    Cookies.set(username + '-cart', val);
}

var getCartStatusInCookie = function(){
    username = Cookies.get('username');
    return Cookies.get(username + '-cart');
}

// Cart creation.
$(document).ready(function(){
    $('#cartCreationForm').submit(function(event){
        event.preventDefault();
        $.ajax({
            url: config.backend_url + "/carts/",
            data: $(this).serialize(),
            // dataType
            method: "POST",
            crossDomain: true,
            headers: {
                "Authorization": "Token " + Cookies.get('token'),
            },
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                //getCartData();
                setCartStatusInCookie(true);
                //$productDetailsModal.modal('hide');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error");
                console.log("textStatus: " + textStatus);
                console.log("errorThrown: " + errorThrown);
            },
        });
    });

    // Show cart
    $('#cartButton').click(function(event){
        event.preventDefault();

        data = getCartData();
        console.log(data);
        var idx = 1;
        console.log(data);
        html = Mustache.to_html(cartTemplateHtml, {
            data: data.results,
            idx: function(){ return idx++; 
        }});
        $('#cartDetailsModal').modal('show');
        $('#cartDetailModalBody').html(html);
    });
});


