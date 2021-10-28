import { get } from "./getajax.js";
const parametro = window.location.href;
const param = new URL(parametro);
var nombredelinea = param.searchParams.get("lineanombre");
var nombredelaagencia = param.searchParams.get("nombreagencia");
var idedelaagencia = param.searchParams.get("agenciaide");
const listaparadas = document.getElementById("listaparadas");
const nombreagenciaURL = document.getElementById("nombreagenciaurl");
const nombrelineaURL = document.getElementById("nombrelineaurl");
const numerodeLinea = document.getElementById("numeroLinea");
/*<p class="ms-2 text-dark fw-bold">Numero de linea</p> */
var crearInfoLinea = function(){
    let nuevonumerodelinea = document.createElement("p");
    nuevonumerodelinea.className = "ms-2 text-dark fw-bold";
    nuevonumerodelinea.innerText= nombredelinea;
    let nuevonombrelineaURL = document.createElement("a");
    nuevonombrelineaURL.className = "text-dark text-center";
    nuevonombrelineaURL.innerText= nombredelinea;
    nuevonombrelineaURL.href = "#";
    let nuevonombreagenciaURL = document.createElement("a");
    nuevonombreagenciaURL.className = "text-dark text-center";
    nuevonombreagenciaURL.innerText = nombredelaagencia.substring(0,16) + "...";
    nuevonombreagenciaURL.href = "agenciainfo.html?agenciaid=" + idedelaagencia;
    if(nuevonombreagenciaURL.innerText.length == 0)
    {
        nuevonombreagenciaURL.innerText = "Agencia";
    }
    numerodeLinea.appendChild(nuevonumerodelinea);
    nombrelineaURL.appendChild(nuevonombrelineaURL);
    nombreagenciaURL.appendChild(nuevonombreagenciaURL);
}
crearInfoLinea(); 
var urldelineaparadas = ""
var urldelineashapes = ""
get("https://api.npoint.io/eff65b985e9ac4a03d76")
    .done((data)=>{
        for(let i = 0;i < data.length;i++)
        {
            if(data[i].route_short_name == nombredelinea)
            {
                urldelineaparadas = data[i].stopspath;
                urldelineashapes = data[i].shapespath;
                get(urldelineaparadas)
                    .done((lineas) => {
                        lineas.forEach(linea =>{
                            if(linea.nombre_linea == nombredelinea)
                            {
                                linea.paradas.forEach(parada => {
                                    let nuevoLi = document.createElement("li");
                                    nuevoLi.innerText = parada.stop_name.replace('?','Ñ');
                                    nuevoLi.className="py-1";
                                    let imagenSeparador = document.createElement("img");
                                    imagenSeparador.setAttribute("src","separador.png");
                                    imagenSeparador.setAttribute("height","20px");
                                    imagenSeparador.setAttribute("width","20px")
                                    let nuevoLiSeparador = document.createElement("li");
                                    nuevoLiSeparador.className="py-1";
                                    nuevoLiSeparador.appendChild(imagenSeparador);
                                    nuevoLi.onclick = function(){
                                            mapalinea.setView([parada.lat,parada.lon], 16);
                                    }
                                    nuevoLi.onmouseover = function(){
                                        this.style.fontWeight = "bold";
                                        this.style.textDecoration = "underline";
                                    }
                                    nuevoLi.onmouseout = function(){
                                        this.style.fontWeight = "normal";
                                        this.style.textDecoration = "none";
                                    }
                                    L.marker([parada.lat,parada.lon], {icon: iconoparada}).addTo(mapalinea).bindPopup(parada.stop_name.replace('?','Ñ'));
                                    listaparadas.appendChild(nuevoLi);
                                    listaparadas.appendChild(nuevoLiSeparador);
                                });
                            }
                        })
                        listaparadas.removeChild(listaparadas.lastChild)
                    })
                    .fail(() => {
                        alert("Ocurrió un error al hacer la petición.")
                    })
                get(urldelineashapes)
                    .done((lineas) => {
                        var geojson = {
                        "name":"MyFeatureType",
                        "type":"FeatureCollection",
                        "features":[]
                        };
                        geojson.features.push({ "type": "Feature","geometry": {"type": "LineString","coordinates": []},"properties": {"name": ""}});                        
                        lineas.forEach(linea => {
                            if(linea.nombre_linea == nombredelinea)
                            {
                                linea.shapes.forEach(shape =>{
                                    geojson.features[0].geometry.coordinates.push([shape.lon,shape.lat]);  
                                })
                            }
                        }) 
                        let geoJeson = L.geoJSON(geojson, {style: myStyle}).addTo(mapalinea);
                        mapalinea.fitBounds(geoJeson.getBounds());
                    })
            }
        }
    })
