function(instance, properties, context) {
    
    if (instance.data.handler !== undefined &&
       instance.data.handler !== null) {
//        console.log(JSON.stringify(properties));
//        console.log(JSON.stringify(instance.data));
      instance.data.handler.open({
        name: instance.data.popup_title, //'AirDev Canvas',
        email: "'" + properties.user_email + "'"});
        instance.data.handler = StripeCheckout.configure({
            key: context.keys["Public Key"],
          image: instance.data.logo, //'https://s3.amazonaws.com/appforest_uf/d44/f1552774916710x437759709442758340/05_Open%20Sans_Havelock%20Blue%20and%20White%20%281%29.png',
          locale: 'auto',
          token: function(token) {
       //       console.log(token.id);
       //       console.log(typeof token.id);
            instance.publishState("token", token.id);
            instance.triggerEvent("card_added", function(err) {console.log(err)});
          }
        });
    }
}