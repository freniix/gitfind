const search = document.querySelector("#search")
const input = document.querySelector("#username")
const errTxt = document.querySelector(".errorText")
const searchSection = document.querySelector("#searchSection")
const xml = new XMLHttpRequest();
const url = "https://api.github.com/users/";
const card= document.querySelector(".card")
const avatar = document.querySelector('#avatar');
let val ="";
search.addEventListener("click", (e)=>{
    e.preventDefault();
    val = input.value.trim();
    let pass = false;
    if(val.includes(" ")){
        errTxt.textContent = "*Can't contain space!!"
    }else if(!val){
        errTxt.textContent= "* Please enter a username"
    }else{
        errTxt.textContent = "";
        pass = true;
        search.textContent= "Searching " 
      }
    if(pass){
        xml.open("GET", url+val);
        xml.send()
        xml.onreadystatechange = function (){
            if(xml.readyState == 4){
                const response = this.response;
                const data = JSON.parse(response) ;
                console.log(data)
                searchSection.style.display = "none" 
                card.style.display = "block"
                avatar.src = data.avatar_url;
                const name = document.querySelector("#name");
                name.textContent = data.name ? `${data.name}`: data.login;
                name.href = data.html_url
                document.getElementById("userId").textContent = data.id;
                document.getElementById("followersCount").textContent = data.followers;
                document.getElementById("followingCount").textContent = data.following;
                const location = document.getElementById("location")
                location.textContent = data.location? `: ${data.location}`:  ": unavailable";
                document.getElementById("reposCount").textContent = `: ${data.public_repos}`;
                document.getElementById("bio").textContent = data.bio? data.bio: "";
                const links = document.getElementById("links")
                if(data.blog){
                    links.href = data.blog;
                }else{
                    links.style.display= "none";
                }
            }
        }
    }
    
})

document.getElementById("reset").addEventListener('click', ()=>{
   card.style.display = "none";
   searchSection.style.display = "block";
   search.textContent = "Find";
   avatar.src = "";
    input.value = "";
})
