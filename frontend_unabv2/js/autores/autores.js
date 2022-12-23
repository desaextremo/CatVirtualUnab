//Define variables para acceder al elemento a través de su atributo id
let new_autor = document.getElementById("new")
let save_autor = document.getElementById("save")
let delete_autor = document.getElementById("delete")
let list_data = document.getElementById("list_data")
let save_button = document.getElementById("save_autor")
let cancel_save_autor = document.getElementById("cancel_save_autor")
let cancel_new_autor = document.getElementById("cancel_new_autor")
let new_autor_button = document.getElementById("new_autor")
let cancel_delete_autor = document.getElementById("cancel_delete_autor")
let delete_autor_button = document.getElementById("delete_autor")

//oyentes de eventos
new_autor_button.addEventListener("click", insert_)
save_button.addEventListener("click", save_)
cancel_save_autor.addEventListener("click", initial)
cancel_new_autor.addEventListener("click", initial)
cancel_delete_autor.addEventListener("click", initial)
delete_autor_button.addEventListener("click", delete_apply)
/**
 *la primera vez que la pagina carga y se muestra al usuario solo estara visible la tabla para consultar 
 *los datos
 */
function initial() {
  load_data()
  new_autor.style.display = "none"
  save_autor.style.display = "none"
  delete_autor.style.display = "none"
  list_data.style.display = "block"
}

/**
 *Aspecto de la pagina cuando voy registrar una categoria
 */
function new_() {
  document.getElementById('fisrtName').value = ""
  new_autor.style.display = "block"
  save_autor.style.display = "none"
  delete_autor.style.display = "none"
  list_data.style.display = "none"
  document.getElementById('fisrtName').focus()
}

/**
 * Inovca ws para insertar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function insert_() {

  //Obtengo información ingresda en la caja de texto o input
  let fisrtName_val = document.getElementById('fisrtName').value
  let lastName_val = document.getElementById('lastName').value
  let dateBorn_val = document.getElementById('dateBorn').value
  let country_val = document.getElementById('country').value
  let about_val = document.getElementById('about').value

  axios.post('http://localhost:8084/api/author/new', {
    fisrtName: fisrtName_val,
    lastName: lastName_val,
    dateBorn: dateBorn_val,
    country: country_val,
    about: about_val 
})
  .then(function (response) {
    console.log(response.data)
    initial()  
  })
  .catch(function (error) {
    console.log(error);
  });
}

/**
 *Aspecto de la pagina cuando voy editar una categoria
 */
function edit_(id) {
  new_autor.style.display = "none"
  save_autor.style.display = "block"
  delete_autor.style.display = "none"
  list_data.style.display = "none"

  axios.get('http://localhost:8084/api/author/' + id)
  .then(function (response) {
    document.getElementById("id_edit").value = response.data.id
    document.getElementById("fisrtName_edit").value = response.data.fisrtName
    document.getElementById("lastName_edit").value = response.data.lastName
    document.getElementById("dateBorn_edit").value = response.data.dateBorn
    document.getElementById("country_edit").value = response.data.country
    document.getElementById("about_edit").value = response.data.about
	//armar la salida en pantalla
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  });
}

/**
 * Inovca ws para actualizar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function save_() {
  //leer informacion ingresada por el usuario
  let id_edit = document.getElementById("id_edit").value
  //Obtengo información ingresda en la caja de texto o input
  let fisrtName_val = document.getElementById('fisrtName_edit').value
  let lastName_val = document.getElementById('lastName_edit').value
  let dateBorn_val = document.getElementById('dateBorn_edit').value
  let country_val = document.getElementById('country_edit').value
  let about_val = document.getElementById('about_edit').value

  axios.put('http://localhost:8084/api/author/save', {
    id: id_edit,
	fisrtName: fisrtName_val,
    lastName: lastName_val,
    dateBorn: dateBorn_val,
    country: country_val,
    about: about_val
})
  .then(function (response) {
    console.log(response.data);
    initial()
    
	//armar la salida en pantalla
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
}

/**
 *Aspecto de la pagina cuando voy eliminar una categoria
 */
function delete_(id) {
  new_autor.style.display = "none"
  save_autor.style.display = "none"
  delete_autor.style.display = "block"
  list_data.style.display = "none"

  let salida=""
  let list_delete = document.getElementById("list_delete")
  //invoca al ws: http://localhost:8084/api/book/un id de categoria

  axios.get('http://localhost:8084/api/author/' + id)
  .then(function (response) {
    //armar la salida en pantalla
    //Obtiene la información registrada por el usuario
    salida += `<li><strong>Id :</strong>${response.data.id}</li>
               <li><strong>Nombres :</strong>${response.data.fisrtName} ${response.data.lastName}</li>
               <li><strong>Nombres :</strong>${response.data.dateBorn}</li>
               <li><strong>Nombres :</strong>${response.data.country}</li>
               <li><strong>Nombres :</strong>${response.data.about}</li>
               `
    list_delete.innerHTML = salida
    document.getElementById("id_delete").value = response.data.id
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  });
}

/**
 * Invoca ws para eliminar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function delete_apply() {
  //obtengo el id
  let id_delete = document.getElementById("id_delete").value

  axios.delete('http://localhost:8084/api/author/' + id_delete)
  .then(function (response) {
    console.log(response.data);
    //armar la salida en pantalla
    initial()
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
}

/**
 * Invocar al ws que obtien informaciòn sobre las categorias, y actualizar la tabla de datos
 * con la informaciòn obtenida
 */
function load_data() {
  let salida = ""
  // Hacer una petición para un usuario con ID especifico
  axios.get('http://localhost:8084/api/author/all')
    .then(function (response) {
      let datos = response.data
      //armar la salida en pantalla
      for(let i in datos){
        salida +=`<tr>
                  <td>${datos[i].fisrtName} ${datos[i].lastName}</td>
                  <td>${datos[i].dateBorn}</td>
                  <td>${datos[i].country}</td>
                  <td>
                      <button class="btn btn-outline-primary" onclick="edit_('${datos[i].id}')">Editar</button>
                      <button class="btn btn-outline-primary" onclick="delete_('${datos[i].id}')">Eliminar</button>
                  </td>
                </tr>`
    
      }
      //console.log(salida)
    
      document.getElementById("table_body").innerHTML=salida
    })
    .catch(function (error) {
      // manejar error
      alert(error.message)
    })
    .then(function () {
      // siempre sera executado
    });
}
//invocar la funcion que muestra la pagina en su estado inicial
initial()



