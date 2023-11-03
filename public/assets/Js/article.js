let mainEle = document.querySelector(".services-container");
    let readBtns = document.querySelectorAll(".article-link");
    let article = document.querySelector(".article .container")
    const setContent = ()=>{
      readBtns.forEach(e=>{
        e.style.cursor = "pointer";
        if(e.classList.contains("currentBtn")){
            let card = e.parentElement.parentElement.parentElement;
            myArticleContent(card,mainEle,readBtns,article);
        }else{
            e.addEventListener("click",()=>{
                e.classList.add("currentBtn");
                let card = e.parentElement.parentElement.parentElement;
                myArticleContent(card,mainEle,readBtns,article);
            
            })
        }
        
      })
    }
    const myArticleContent = (card)=>{
      let noOfParas = card.lastElementChild.children[1].children.length;
          article.firstElementChild.firstElementChild.src = card.firstElementChild.src;
          article.firstElementChild.children[1].children[0].textContent = card.children[1].children[0].textContent;
          article.firstElementChild.children[1].children[1].textContent = card.children[1].children[1].textContent;
          article.firstElementChild.children[1].children[2].textContent = card.lastElementChild.children[0].textContent;
          console.log(card.lastElementChild.children[0])
          article.lastElementChild.innerHTML=''
          for(let i = 0 ; i<noOfParas;i++){
            let div = document.createElement("p");
            div.textContent = card.lastElementChild.children[1].children[i].textContent;
            article.lastElementChild.appendChild(div);
          }
          article.parentElement.style.display = "block"
          mainEle.firstElementChild.style.display = "none"
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
    }
    setContent()
    export{setContent,mainEle,readBtns,article}