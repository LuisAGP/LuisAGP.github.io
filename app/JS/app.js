const urlBase = window.location.origin;

window.onload = () => {
    
    includeBase();
    includeHtml();

}


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

            })
            .catch(error => console.log(error));

        }

    } catch (error) {
        console.error(error);
    }

}



const activeButton = (button) => {

    try {
        
        let aciveElement = document.getElementById('menu-options').getElementsByClassName('active')[0];
        aciveElement.className = "";

        button.className = "active";


    } catch (error) {
        console.error(error);
    }

}



const dd = (message) => {
    console.log(message);
}