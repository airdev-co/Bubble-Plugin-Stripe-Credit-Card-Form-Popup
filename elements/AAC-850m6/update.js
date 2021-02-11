function(instance, properties, context) {
    if (instance.data.handler === undefined ||
       instance.data.handler === null) {
        var handler = StripeCheckout.configure({
          	name: properties.popup_title,
          	key: context.keys["Public Key"],
          	image: properties.logo, //'https://s3.amazonaws.com/appforest_uf/d44/f1552774916710x437759709442758340/05_Open%20Sans_Havelock%20Blue%20and%20White%20%281%29.png',
          	locale: 'auto',
        	panelLabel: properties.button_text,
       		description: properties.popup_description,
            allowRememberMe: properties.remember_user,
          	token: function(token) {
       //       console.log(token.id);
       //       console.log(typeof token.id);
            instance.publishState("token", token.id);
            instance.triggerEvent("card_added", function(err) {console.log(err)});
          }
        });
        instance.data.handler = handler;
        instance.data.popup_title = properties.popup_title;
        instance.data.logo = properties.logo;
        //console.log(properties.logo);
        //console.log(JSON.stringify(properties));

        // Close Checkout on page navigation:
        window.addEventListener('popstate', function() {
          handler.close();
        });
    }
}