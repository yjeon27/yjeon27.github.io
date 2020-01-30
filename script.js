window.onload=function(){
    const projectTable = document.getElementById("projectTable");

    updateTable();

    //  for debugging purposes
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async function updateTable() {
        const urlRepos = "https://api.github.com/users/yjeon27/repos";
        const responseRepos = await fetch(urlRepos);
        const resultRepos = await responseRepos.json();

        for(let i=0; i<resultRepos.length; i++){
            // debugger;
            const url = "https://api.github.com/repos/yjeon27/"+resultRepos[i].name+"/readme";
            const response = await fetch(url);
            const result = await response.json();
            const readMe = atob(result.content);

            // let title = readMe.substr(2, readMe.indexOf("##")-3);

            let splitTitle = resultRepos[i].name.replace(/_/g, " ");
            const lang = resultRepos[i].language;
            let icon = document.createElement("i"); 

            switch(lang){
                case "C++":
                    icon.setAttribute("class", "devicon-cplusplus-plain colored");
                    break;
                case "JavaScript":
                    icon.setAttribute("class", "devicon-nodejs-plain colored");
                    break;
                case "CSS":
                    icon.setAttribute("class", "devicon-css3-plain colored");
                    break;
                case "Java":
                    icon.setAttribute("class", "devicon-java-plain colored");
                    break;
                default:
                    icon.setAttribute("class", "devicon-github-plain colored");
            }

            // debugger;
            let start = readMe.indexOf("##")+3;
            let end = readMe.indexOf("*");
            console.log(start+"   "+end);
            let summary = readMe.substring(start, end);
            if (summary === ""){
                summary = readMe.substr(readMe.indexOf("##")+3);
                console.log('REPLACED for '+splitTitle);
            }
    
            // debugger;
    
            const section = document.createElement('section');
            const span = document.createElement('span');
            span.setAttribute('class', 'icon style2 major');
            const h3 = document.createElement('h3');
            // h3.innerHTML = splitTitle;

            const linkGit = document.createElement("a");
            linkGit.setAttribute("href", resultRepos[i].svn_url);
            linkGit.innerHTML = splitTitle;

            h3.appendChild(linkGit);
            // debugger;
            // edge case icon change to Java for "Spring-Boot_HTML5UP"
            if(splitTitle == "Spring-Boot HTML5UP"){
                icon.setAttribute("class", "devicon-java-plain-wordmark colored");
            }

            const p = document.createElement('p');
            p.innerHTML = summary;

            section.appendChild(icon);
            section.appendChild(span);
            section.appendChild(h3);
            section.appendChild(p);

    
            projectTable.appendChild(section);
        }
        
    }

}