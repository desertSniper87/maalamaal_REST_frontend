let productCardTemplateHtml= $('#productCardTemplate').html();
let $productList = $('#productList');

// Query for categories.
$(document).ready(function(){
    $.ajax({
        url: config.backend_url + "/products/",
        method: "GET",
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            html = Mustache.to_html(productCardTemplateHtml, {data: data.results});
            $productList.append(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
            console.log("textStatus: " + textStatus);
            console.log("errorThrown: " + errorThrown);
        }
    });
});


