const closeModalBtn = document.getElementById('closeModalBtn');
const infoModal = document.getElementById('infoModal');
const modalContent= document.querySelector('.modal-content');
const formulario =document.querySelector("#formulario");
var data= {page:20};



console.log(infoModal);

fetch('http://181.141.4.209:3000/imagenes',{
  method:'post',
  headers: {"content-type":"application/json"},
  body:JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  // Acceder al contenido del archivo en base64 desde el objeto JSON
  data.forEach(item => {
      

  const archivoBase64 = item.archivo;

  // Convertir el contenido base64 en un blob
  const byteCharacters = atob(archivoBase64);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: item.mimetype });

  // Crear una URL para el blob y establecerlo como src de la imagen
  const dataURL = URL.createObjectURL(blob);
  const imgPreview = document.createElement('iframe');
  imgPreview.src = dataURL;

  item.archivo=dataURL;
  document.querySelector('#listaDocumentos').appendChild(addDocumentsLisa(item));
});
});

formulario.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    if(formulario.querySelector('#formulario-nombre-imagen').value && formulario.querySelector('#formulario-imagen').value ){
        const data=formulario;
        enviarImagen(data)
    }

})


function addDocumentsLisa(element){

    var car= document.createElement('div');
        car.className="cont-info";
    var divCover=document.createElement('div');
    
    divCover.className="covertor";
    car.appendChild(divCover);
    var divIframe= document.createElement('div');
    divCover.appendChild(divIframe);
    var iframe= document.createElement('iframe'); 
    iframe.src=element.archivo;
    divIframe.appendChild(iframe);
    var divTexts= document.createElement('div');
    divTexts.className='cover-text';
    var nombres= document.createElement('h2');
    nombres.innerHTML=element.nombre+element.mimetype;
    var fecha= document.createElement('h3');
    fecha.innerHTML=element.fecha;
    divTexts.appendChild(nombres);
    divTexts.appendChild(fecha);
    car.appendChild(divTexts);
    var divButton = document.createElement('div');
    divButton.className='cover-div';
    var buttonDowloand= document.createElement('a');
    buttonDowloand.className="btn-descargar";
    buttonDowloand.innerHTML="Descargar";
    buttonDowloand.href=element.archivo;
    buttonDowloand.download=element.nombre;
    divButton.appendChild(buttonDowloand);
    car.appendChild(divButton);

    return car;
}


const enviarImagen=(data)=>{
    const formulario= new FormData(data);
   
  fetch('http://181.141.4.209:3000/subir-imagen', {
    method: 'POST',
    body: formulario
  }).then(response =>  response.json())
  .then(data => {
    console.log(data);
    infoModal.style.display = 'block';
    const respuesta=document.createElement('h3');  
    respuesta.innerHTML=data.respuesta;
    modalContent.appendChild(respuesta);
  })
  .catch(error => {
    console.log(error);
    infoModal.style.display = 'block';
    infoModal.innerHTML=error;
  });
}
var button  = document.createElement('button');
button.innerHTML='1';
const paginas= document.querySelector('.paginas');
console.log(paginas.appendChild(button));
 

// Cerrar el modal cuando se hace clic en el botón de cierre
closeModalBtn.addEventListener('click', () => {
  infoModal.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
  if (event.target === infoModal) {
    infoModal.style.display = 'none';
  }
});