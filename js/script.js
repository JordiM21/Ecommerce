const clickButton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let cart = [];
//el cart es el carrito de compras vacío y vamos a ir pusheando a medida que hacemos click

clickButton.forEach(btn => {
    btn.addEventListener('click', addToCartItem)
})


function addToCartItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent
    const itemImg = item.querySelector('.card-img-top').src;
    //despues de tomar los elementos por la clase los establecemos como newitem para pushearlos a el array
    //aun no estamos pusheando solo estamos identificando a que elemento vamos a añadir o a cual se le dio click

    const newItem = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        amount: 1
    }
    addItemCarrito(newItem)
    //aca estamos ejecutando la funcion de añadir el newitem al carrito, la funcion de pushearlo a el nuevo array la haremos a continuacion

}


function addItemCarrito(newItem){
    const InputElement = tbody.getElementsByClassName('input_element')
    for(let i = 0; i<cart.length; i++){
        if(cart[i].title == newItem.title){
            //aca solo modificamos el numero de el amount para que si añadimos mas de uno incremente el input con el numero
            cart[i].amount++;
            const inputValue = InputElement[i]
            inputValue.value++
            carritoTotal()
            return null;
        }
    }
    //pusheamos el newitem a el cart 
    cart.push(newItem);
    //ejecutamos el render que es nuestra estructura en html para que se muestre
    renderCarrito()
}


//plasmamos nuestro newitem en la section de shopping cart
function renderCarrito(){
    tbody.innerHTML = ''
    cart.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        <th scope="row">1</th>
            <td class="table__products">
                <img src=${item.img} alt="">
                <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price">   
                <p>${item.price}</p>
            </td>
            <td class="table_amount">
                <input type="number" min="1" value=${item.amount} class="input_element">
                <button class="delete btn btn-danger">x</button>
            </td>`
            tr.innerHTML = Content;
            tbody.append(tr)

            tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
            tr.querySelector(".input_element").addEventListener('change', sumaCantidad)
    })
    carritoTotal()
}


//aca estamos modificando el total, para que se sumen los precios y nos muestre un total
function carritoTotal(){
    let Total = 0;
    const itemCarTotal = document.querySelector('.itemCarTotal')
    cart.forEach((item) => {
        //reempalazamos este simbolo para poder transformarlo a number, ya que no podemos sumar strings
        const price = item.price.replace("$", '')
        Total = Total + price*item.amount
        Total = parseInt(Total)
        console.log(price)
    })
    itemCarTotal.innerHTML = `Total $${Total}`
    // esto es lo que vamos a plasmar en el html 
}


//aca le estamos dando la funcionalidad a el boton delete de borrar los elementos del shopping cart
function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<cart.length; i++){
        if(cart[i].title.trim() == title){
            cart.splice(i, 1)
            console.log("test si entra en el if")
        }
    }
    tr.remove()
    carritoTotal()
    //ejecutamos el remove y la sumatoria para que actualize los datos
} 

//esta funcion nos permite modificar el total conforme se modifica manualmente nuestro input de numeros
function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector(".title").textContent;
    cart.forEach(item => {
        if(item.title.trim() == title){
            sumaInput.value < 1 ? (sumaInput.value = 1): sumaInput.value;
            item.amount = sumaInput.value
            carritoTotal()
        }
    })

}
