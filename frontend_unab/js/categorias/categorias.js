//Define variables para acceder al elemento a través de su atributo id
let new_category = document.getElementById("new")
let save_category = document.getElementById("save")
let delete_category = document.getElementById("delete")
let list_data = document.getElementById("list_data")
let save_button = document.getElementById("save_category")
let cancel_save_category = document.getElementById("cancel_save_category")
let cancel_new_category = document.getElementById("cancel_new_category")
let new_category_button = document.getElementById("new_category")
let cancel_delete_category = document.getElementById("cancel_delete_category")
let delete_category_button = document.getElementById("delete_category")

//oyentes de eventos
new_category_button.addEventListener("click",insert_)
save_button.addEventListener("click",save_)
cancel_save_category.addEventListener("click",initial)
cancel_new_category.addEventListener("click",initial)
cancel_delete_category.addEventListener("click",initial)
delete_category_button.addEventListener("click",delete_apply)
/**
 *la primera vez que la pagina carga y se muestra al usuario solo estara visible la tabla para consultar 
 *los datos
 */
function initial() {
  load_data()
  new_category.style.display = "none"
  save_category.style.display = "none"
  delete_category.style.display = "none"
  list_data.style.display = "block"
}

/**
 *Aspecto de la pagina cuando voy registrar una categoria
 */
 function new_() {
  document.getElementById('name').value=""
  new_category.style.display = "block"
  save_category.style.display = "none"
  delete_category.style.display = "none"
  list_data.style.display = "none"
  document.getElementById('name').focus()
}

/**
 * Inovca ws para insertar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function insert_(){
  
  //Obtengo información ingresda en la caja de texto o input
  let nameCategory = document.getElementById('name').value

  //creo un objeto javascript
  let objeto = {
    name: nameCategory
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  //Debo crear objeto XMLHttpRequest
  let objetoAjax = new XMLHttpRequest()
  
  objetoAjax.open("POST","http://localhost:8084/api/category/new")
  objetoAjax.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

  objetoAjax.addEventListener('load',data=>{

    console.log(data.target.response)
    initial()
  })

  objetoAjax.send(objetoJson)
  
}

/**
 *Aspecto de la pagina cuando voy editar una categoria
 */
 function edit_(id) {
  new_category.style.display = "none"
  save_category.style.display = "block"
  delete_category.style.display = "none"
  list_data.style.display = "none"

  //invocar al ws: http://localhost:8084/api/categoria/un id de categoria
  //Debo crear objeto XMLHttpRequest
  let objetoAjax = new XMLHttpRequest()

  //Configurar la peticion
  objetoAjax.open("GET","http://localhost:8084/api/category/" + id)
  objetoAjax.addEventListener("load",data=>{
    let responseJson =  JSON.parse(data.target.response)
    
    document.getElementById("id_edit").value = responseJson.id
    document.getElementById("name_edit").value = responseJson.name
  })
  objetoAjax.send()
}

/**
 * Inovca ws para actualizar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function save_(){
  //leer informacion ingresada por el usuario
  let id_edit = document.getElementById("id_edit").value
  let name_edit = document.getElementById("name_edit").value

  //Creo objeto javascript
  let objetoJS = {
    id:id_edit,
    name:name_edit
  }
  //convierto objeto javascript en json
  let objetoJson = JSON.stringify(objetoJS)

  //crear peticion
  //Debo crear objeto XMLHttpRequest
  let objetoAjax = new XMLHttpRequest()

  //Configurar la peticion
  objetoAjax.open("PUT","http://localhost:8084/api/category/save")
  objetoAjax.setRequestHeader("Content-Type","application/json;charset=UTF-8")
  objetoAjax.addEventListener("load",data=>{
    let responseJson =  JSON.parse(data.target.response)
    console.log(responseJson)
    initial()    
  })
  objetoAjax.send(objetoJson)
}

/**
 *Aspecto de la pagina cuando voy eliminar una categoria
 */
 function delete_(id) {
  new_category.style.display = "none"
  save_category.style.display = "none"
  delete_category.style.display = "block"
  list_data.style.display = "none"
  let list_delete = document.getElementById("list_delete")
  //invoca al ws: http://localhost:8084/api/book/un id de categoria
  //Defino el objeto
  let objAajax = new XMLHttpRequest()
  let salida=""
  //configuro la peticion
  objAajax.open("GET","http://localhost:8084/api/category/" + id)

  //controlar la respuesta
  objAajax.addEventListener('load', data =>{
    //obtengo los datos de la respuesta
    const dataJson = JSON.parse(data.target.response) 
    console.log(dataJson)

    //Obtiene la información registrada por el usuario
    salida += `<li><strong>Id :</strong>${dataJson.id}</li>
               <li><strong>Categoría :</strong>${dataJson.name}</li>`

    list_delete.innerHTML = salida

    document.getElementById("id_delete").value = dataJson.id
  })
  
  objAajax.send()
}

/**
 * Invoca ws para eliminar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function delete_apply(){
  //obtengo el id
  let id_delete = document.getElementById("id_delete").value

  //Defino el objeto
  let objAajax = new XMLHttpRequest()
  
  //configuro la peticion
  objAajax.open("DELETE","http://localhost:8084/api/category/" +id_delete)
  objAajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  //controlar la respuesta
  objAajax.addEventListener('load', data =>{
    initial()
  })

  objAajax.send()
}

/**
 * Invocar al ws que obtien informaciòn sobre las categorias, y actualizar la tabla de datos
 * con la informaciòn obtenida
 */
function load_data(){
  let salida = ""
  //Debo crear objeto XMLHttpRequest
  let objetoAjax = new XMLHttpRequest()

  //Configurar la peticion
  objetoAjax.open("GET","http://localhost:8084/api/category/all")

  //Gestionar la respuesta
  objetoAjax.addEventListener('load',data => {
    console.log("Antes de interpretar como JSON")
    console.log(data.target.response)
    let responseJson =  JSON.parse(data.target.response)
    console.log("Despues de interpretar como JSON")
    console.log(responseJson)
    
    for(let i in responseJson){
      //salida += "Id: " + responseJson[i].id + " Categoria: " + responseJson[i].name + "\n"
      //
      salida +=`<tr>
                <td>${responseJson[i].name}</td>
                <td>
                    <button onclick="edit_('${responseJson[i].id}')">Editar</button>
                    <button onclick="delete_('${responseJson[i].id}')">Eliminar</button>
                </td>
              </tr>`

    }
    console.log(salida)

    document.getElementById("table_body").innerHTML=salida

  })

  //enviar la respuesta
  objetoAjax.send()
  
}
//invocar la funcion que muestra la pagina en su estado inicial
initial()



