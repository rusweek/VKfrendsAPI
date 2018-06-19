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
           console.log(response);
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
   });
       

    
    
    
};