//Validation form
function validateForm(){

    let IdProducto = document.getElementById('inputIdProducto').value;
    let Nombre = document.getElementById('inputNombre').value;
    let Categoria = document.getElementById('inputCategoria').value;
    let Precio = document.getElementById('inputPrecio').value;
    let Descripcion = document.getElementById('inputDescripcion').value;
    let Date = document.getElementById('inputDate').value;


    if (IdProducto == "") {
        alert('El Id Producto es requerido');
        return false;
    }

    if (Nombre == "") {
        alert('El Nombre es requerido');
        return false;
    }

    if (Categoria == "") {
        alert('La Categoria es requerida');
        return false;
    }

    if (Precio == "") {
        alert('El Precio es requerido');
        return false;
    }

    if (Descripcion == "") {
        alert('La Descripcion es requerida');
        return false;
    }

    if (Date == "") {
        alert('La Fecha es requerida');
        return false;
    }
   

    return true;
}

//read
function showData(){

    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    var html = "";

    listPeople.forEach(function(element, index){
        html += "<tr>";
        html += '<td class="col-md-1"; style="text-align: center "><button onclick="updateData(' + index + ') " class="btn btn-outline-primary"><i class="bi bi-pencil-square text-primary" ></i></i></button></td>';
        html += '<td class="col-md-1">' + element.IdProducto + '</td>';
        html += '<td class="col-md-1">' + element.Nombre + '</td>';
        html += '<td class="col-md-1">' + element.Categoria + '</td>';
        html += '<td class="col-md-1">' + element.Precio + '</td>';
        html += '<td class="col-md-4">' + element.Descripcion + '</td>';
        html += '<td class="col-md-2 text-center"><img src="' + element.Imagen + '" alt="Imagen del producto" style="width: 90px; height: auto;"></td>'; // Muestra la imagen
        html += '<td class="col-md-1">' + element.Date + '</td>';
        html += '<td class="col-md-1"; style="text-align: center"><button onclick="deleteData(' + index + ')" class="btn btn-outline-danger"><i class="bi bi-x-lg text-danger"></i></button></td>';
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;
}

//create
document.onload = showData();

function AddData(){
    if (validateForm() == true) {
        
        let IdProducto = document.getElementById('inputIdProducto').value;
        let Nombre = document.getElementById('inputNombre').value;
        let Categoria = document.getElementById('inputCategoria').value;
        let Precio = document.getElementById('inputPrecio').value;
        let Descripcion = document.getElementById('inputDescripcion').value;
        let Date = document.getElementById('inputDate').value;
        let ImagenInput = document.getElementById('inputImagen');
        
        let Imagen = "";

        if (ImagenInput.files.length > 0) {
            let reader = new FileReader();
            reader.onload = function (e) {
                Imagen = e.target.result;

                var listPeople;

                if (localStorage.getItem('listPeople') == null) {
                    listPeople = [];
                } else {
                    listPeople = JSON.parse(localStorage.getItem("listPeople"));
                }

                listPeople.push({
                    IdProducto: IdProducto,
                    Nombre: Nombre,
                    Categoria: Categoria,
                    Precio: Precio,
                    Descripcion: Descripcion,
                    Imagen: Imagen, // Guarda la URL de la imagen
                    Date: Date
                });

                localStorage.setItem('listPeople', JSON.stringify(listPeople));

                showData();

                document.getElementById('inputIdProducto').value = "";
                document.getElementById('inputNombre').value = "";
                document.getElementById('inputCategoria').value = "";
                document.getElementById('inputPrecio').value = "";
                document.getElementById('inputDescripcion').value = "";
                document.getElementById('inputDate').value = "";
                document.getElementById('inputImagen').value = ""; // Limpia el campo de la imagen
                
            };
            reader.readAsDataURL(ImagenInput.files[0]);
        } else {
            // Si no se seleccionó un archivo, guarda sin imagen
            alert('La Imagen es requerida');
        }
    }
}
/*delete */
function deleteData(index){

    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    showData();
}

/*update */

function updateData(index){
    document.getElementById("btnAdd").style.display = 'none';
    document.getElementById("btnUpdate",btnAdd).style.display = 'block';

    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    
    document.getElementById('inputIdProducto').value = listPeople[index].IdProducto;
    document.getElementById('inputNombre').value = listPeople[index].Nombre;
    document.getElementById('inputCategoria').value = listPeople[index].Categoria;
    document.getElementById('inputPrecio').value = listPeople[index].Precio;
    document.getElementById('inputDescripcion').value = listPeople[index].Descripcion;
    document.getElementById('inputDate').value = listPeople[index].Date;
 

    document.querySelector("#btnUpdate").onclick = function(){
        if (validateForm() == true) {
            
            listPeople[index].IdProducto = document.getElementById('inputIdProducto').value;
            listPeople[index].Nombre = document.getElementById('inputNombre').value;
            listPeople[index].Categoria = document.getElementById('inputCategoria').value;
            listPeople[index].Precio = document.getElementById('inputPrecio').value;
            listPeople[index].Descripcion = document.getElementById('inputDescripcion').value;
            listPeople[index].Date = document.getElementById('inputDate').value;
           
         

            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            showData();

            
            document.getElementById('inputName').value = "";
            document.getElementById('inputDate').value = "";
            document.getElementById('inputIdProducto').value = "";
            document.getElementById('inputNombre').value = "";
            document.getElementById('inputCategoria').value = "";
            document.getElementById('inputPrecio').value = "";
            document.getElementById('inputDescripcion').value = "";
            document.getElementById('inputDate').value = "";
          

            document.getElementById("btnAdd").style.display = 'block';
            document.getElementById("btnUpdate",btnAdd).style.display = 'none';
        }
    };
}
