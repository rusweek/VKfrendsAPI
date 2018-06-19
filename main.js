window.onload = function(e){
    
   new Promise(function(resolve, reject){
       VK.init({
            apiId: 6609808
        });
      
       
       VK.Auth.login(function(respons){
            if(respons.session){
                resolve(respons);
                console.log('all norm');
            } else { console.log('wtf')};
        }, 8);
       
    }).then(function(){ return new Promise(function(resolve, reject){
       VK.Api.call('users.get', {v:'5.80', 'name_case': 'mon', fields: 'bdate'}, function(response){
           
           if(response.error){
               reject(new Error(response.error.error_msg))
           } else {
                let headerInfo = document.querySelector('.headerInfo');
                headerInfo.textContent = ` Я есть ${response.response[0].first_name} ${response.response[0].last_name} произведен в
                ${response.response[0].bdate} и вот мои кенты:`;
                resolve();
            }
           });
       });
   }).then(function(){ return new Promise (function(resolve, reject){
       VK.Api.call('friends.get', {v:'5.80', 'name_case': 'mon', fields: 'bdate, photo_200_orig'}, function(response){
           console.log(response);
           if(response.error){ reject(new Error(response.error.error_msg))
            } else {
                let source = playerItemTemplate.innerHTML;
                let templateFn = Handlebars.compile(source);
                let template = templateFn({list: response.response.items});
                console.log(template)
                let result = document.querySelector('.result');
                console.log(result)
                result.innerHTML = template;
            };
           
       })
   })});
       

    
    
    
};