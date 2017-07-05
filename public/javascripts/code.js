var myApp = {};
var socket = io();
myApp = (function(){
    function ini(){   
        events();     
        socket.on('quote', function(data){
            let json = JSON.parse(data);
            
            var txtTitle = document.createElement("p");
            var txtPrice = document.createElement("p");
            var txtPriceChange = document.createElement("p");
            var txtPriceChangePercentage = document.createElement("p");
            
            var qDiv = document.createElement("div");
            var titleSpan = document.createElement("span")
            var priceSpan = document.createElement("span")
            var priceChangeSpan = document.createElement("span");
            var priceChangePercentageSpan = document.createElement("span"); 
            
            wrap.appendChild(qDiv);
            qDiv.appendChild(titleSpan);
            qDiv.appendChild(priceSpan);
            qDiv.appendChild(priceChangeSpan);
            qDiv.appendChild(priceChangePercentageSpan);
                
            titleSpan.appendChild(txtTitle);
            priceSpan.appendChild(txtPrice);
            priceChangeSpan.appendChild(txtPriceChange);
            priceChangePercentageSpan.appendChild(txtPriceChangePercentage);
                 
            var symbol = json["Realtime Global Securities Quote"]["01. Symbol"];
            var latestPrice = json["Realtime Global Securities Quote"]["03. Latest Price"];
            var priceChange = json["Realtime Global Securities Quote"]["08. Price Change"];
            var priceChangePercentage = json["Realtime Global Securities Quote"]["09. Price Change Percentage"];
            var plus = getPlus(priceChange);
            
            txtTitle.innerHTML = symbol;
            txtPrice.innerHTML = "$"+latestPrice;
            txtPriceChange.innerHTML = plus+priceChange;
            txtPriceChangePercentage.innerHTML = plus+priceChangePercentage;
            
            function getPlus(pc){
               if(pc > 0){
                   return "+";
               }else{
                   return "";
               }
            }
            
            qDiv.className = "qDiv"
            if(json["Realtime Global Securities Quote"]["08. Price Change"] < 0){
                qDiv.style.backgroundColor = "#FC413F";
            }else{
                qDiv.style.backgroundColor = "#00CE74";
            }
            
            txtTitle.className = "txtTitle";
            
            console.log(json["Realtime Global Securities Quote"]);
            var imgLoading = document.getElementById("imgLoading");
            if(imgLoading){
                imgLoading.parentNode.removeChild(imgLoading);
            }
        });        
    }
        
    function events(){  
        document.getElementById("btnAdd").addEventListener("click", btnAddClick);
    }
    
    function btnAddClick(){    
        var txtQuote = document.getElementById("txtQuote");
        if(txtQuote.value === "") return false;
        
        var img = document.createElement("img");
        imgLoadingDiv.appendChild(img);
        img.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif");
        img.setAttribute("id", "imgLoading");
        
        socket.emit('fromClient', txtQuote.value);
        txtQuote.value = "";
    }
    
    
        
    window.onload = ini;
})();