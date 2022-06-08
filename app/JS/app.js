const urlBase = window.location.origin;

window.onload = () => {
    
    includeBase();
    includeHtml();
    loadEntries();

}




/**
 * Función para cargar un template base
 * @author Luis GP
 * @return {Boolean}
 */
const includeBase = () => {

    try {

        let base = document.getElementById('base')

        if(!base){ return false; }

        let url = base.getAttribute("file");
            
        fetch(urlBase+url)
        .then(response => response.text())
        .then(html => {

            const childs = base;
            const parser = new DOMParser();
            codigo = parser.parseFromString(html, 'text/html');
            codigo.getElementById('content-templates').replaceWith(...childs.childNodes);

            document.documentElement.replaceChildren(...codigo.documentElement.childNodes);

            includeHtml();

            // Load Adsense script
            let script = document.createElement("script");
            script.setAttribute("src", "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1397700931807199");
            script.setAttribute("crossorigin", "anonymous");
            script.setAttribute("async", true);
            document.head.appendChild(script);

        })
        .catch(error => console.log(error));

    } catch (error) {
        console.error(error);
    }

}





/**
 * Funcion para cargar un template dentro de otro
 * @author Luis GP
 * @return {Boolean}
 */
const includeHtml = () => {

    try {

        let includers = document.querySelectorAll("div[include-html-file]")

        for(let i of includers){

            let url = i.getAttribute("include-html-file");
            
            fetch(urlBase+url)
            .then(response => response.text())
            .then(html => {

                let parser = new DOMParser();
                codigo = parser.parseFromString(html, 'text/html').body;

                i.replaceWith(...codigo.childNodes);
                activeButton();

            })
            .catch(error => console.log(error));

        }

    } catch (error) {
        console.error(error);
    }

}




/**
 * Activar el boton actual del menu
 * @author Luis GP
 * @return {Boolean}
 */
const activeButton = () => {

    try {

        let url = window.location.href
        let options = document.getElementById('menu-options').getElementsByTagName('a');

        for(let i of options){
            if(i.href == url){
                i.parentNode.className = "active";
            }else{
                i.parentNode.className = "";
            }
        }

    } catch (error) {
        console.error(error);
    }

}





/**
 * Función para cargar las entradas del blog
 * @author Luis GP
 * @return {Message}
 */
const loadEntries = () => {

    try {
        
        ajax({
            url: "/app/JSON/entradas.json",
            success: function(data){
                let contenedor = document.getElementById('blog-entries');
                
                data.entradas.sort(function(a,b){
                    return new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion);
                });
                
                if(!contenedor){
                    contenedor = document.getElementById('lasest-entries');
                    data.entradas = data.entradas.slice(0, 5);
                }

                if(!contenedor){
                    return false;
                }


                for(let i of data.entradas){

                    let fechaPost = new Date(i.fechaPublicacion);
                    let day       = ("0" + fechaPost.getDate()).slice(-2);
                    let month     = ("0" + (fechaPost.getMonth() + 1)).slice(-2);
                    let year      = fechaPost.getFullYear();
                    
                    let div       = document.createElement('div');
                    div.onclick = function(){ window.location.href = i.rutaArchivo; }
                    div.className = "blog-entrie";
                    div.innerHTML = `
                    <img src="${urlBase}${i.portada}"/>
                    <div class="blog-info">
                        <div>
                            <h6><span class="fa fa-pencil icon" aria-hidden="true"></span><label>${i.autor}</label></h6>
                            <h2>${i.titulo}</h2>
                            <p>${i.descripcion}</p>
                        </div>
                        <div class="blog-info-footer">
                            <span class="fa fa-calendar icon" aria-hidden="true"></span>
                            <label>Publicado: ${day}/${month}/${year}</label>
                        </div>
                    </div>
                    `;

                    contenedor.append(div);

                }
            }
        });

    } catch (error) {
        console.error(error);
    }

}





/**
 * Función para realizar consultas ajax
 * @author Luis GP
 * @param {JSON} json
 * @return {Message}
 */
const ajax = (json) => {

    try {
        
        fetch(urlBase+json.url)
        .then(response => response.json())
        .then(data => json.success(data))
        .catch(error => json.error ? json.error(error) : dd(error));

    } catch (error) {
        console.error(error);
    }

}




/**
 * Función para obtener la fecha y hora actual
 * @author Luis GP
 * @return {Boolean}
 */
 const getCurrentDate = () => {
    let fecha = new Date()
    dd(fecha.toISOString());
}




const dd = (message) => {
    console.log(message);
}