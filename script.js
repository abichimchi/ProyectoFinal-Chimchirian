
const clave_local_storage = "viajesStorage";
let id = 0;
let viajesStorage = cargar_viajes();


let btn_crear = document.getElementById("btn_crear");
btn_crear.addEventListener("click", () => {

    if (validar_formulario() == true) {
        generarViaje();
        resetear_formulario();
    }

})

function validar_formulario() {

    let km = document.getElementById("km").value;

    if (!km) {
        incorrecto()
        return false;

    } else if (km < 1) {
        incorrecto()
        return false;

    } else {
        correcto()
        return true;

    }


}

function resetear_formulario() {

    document.getElementById("km").value = "";
    document.getElementById("tarifa_social").value = false;


}


let boleto = [];
fetch('../boletos.json')
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data){
    console.log(data);
    boleto = data;
    return boleto;
});

let valor = 0;
async function retornarValor(km, tarifa_social) {
    let i = 0;
    while (i < 4) {
        if (km <= boleto[i].km_max) {
            if (tarifa_social == true) {
                valor = boleto[i].tarifa;
            } else { valor = boleto[i].pasaje; }
            break;
        }
        i = i + 1;
    }

    if (km >= 28) {
        if (tarifa_social == true) {
            valor = 10.35;
        } else { valor = 23 }
    }
    valor= await valor;
    return valor;
}



async function generarViaje() {
    let km = document.getElementById("km").value;
    let tarifa_social = document.getElementById("tarifa_social").checked;
    let valor_boleto = await retornarValor(km, tarifa_social);
    let tiempo=km*5;   //Se tiene como referencia que se tarda 5 minutos en recorrer un kilómetro
    let viaje = new Viaje(id, km, tiempo,valor_boleto);
    id++;
    console.log(viaje);
    mostrar_viaje(id, km, tiempo, valor_boleto);

    viajesStorage.push(viaje);

    localStorage.setItem(clave_local_storage, JSON.stringify(viajesStorage));

}

function mostrar_viaje(id, km, tiempo, valor_boleto) {

    let new_div = document.createElement("div");
    let new_h2 = document.createElement("h2");

    new_h2.textContent = "Este fue tu viaje N°: " + id + ". Recorriste " + km + " kilómetros en " + tiempo+" minutos. Te salio $" + valor_boleto + ".";

    new_div.appendChild(new_h2);

    let contenedor = document.getElementById("contenedor");
    contenedor.appendChild(new_div);



}

function cargar_viajes() {

    let arreglo = localStorage.getItem(clave_local_storage);
    if (arreglo) {

        arreglo = JSON.parse(arreglo);
        for (let i = 0; i < arreglo.length; i++) {

            let viaje = arreglo[i];


        }

        return arreglo;

    }

    return new Array();


}

function correcto() {
    Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'El viaje ha sido agregado!'
    })
    Toastify({
        text: "Bien hecho!",
        duration: 3000,
        style: {
            background: 'green'
        }

    }).showToast();
}


function incorrecto() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo esta mal!'
    })
    Toastify({
        text: "Mmm, estas seguro?",
        duration: 3000,
        style: {
            background: 'red'
        }

    }).showToast();
}
