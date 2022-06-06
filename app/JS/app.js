const urlBase = window.location.origin;

window.onload = () => {
    
    includeBase();
    includeHtml();

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



const dd = (message) => {
    console.log(message);
}