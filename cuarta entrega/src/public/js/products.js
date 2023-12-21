const socket = io()


    const addProductForm = document.getElementById('addProductForm');
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const descriptionInput = document.getElementById('description');
    const messageLogs = document.getElementById('messageLogs')
  


    titleInput.addEventListener('keyup', evt =>{
        if(evt.key === 'Enter'){
            const data = titleInput.value
            titleInput.value = ''
            socket.emit('message', data)
    
        }
       })
   

 

   socket.on('messageProducts', data => {
    let products = ''

    data.forEach(product => (products += `${product} <br>`));
    messageLogs.innerHTML = products
   })