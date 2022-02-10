export const printGames = (games) => {
let precioTotal = games.data().precio-((games.data().descuento*games.data().precio)/100);
let titulo = games.data().nombre.split(" ").join("-");
return `
                        <div class="item force-badge" id="ig-preorders-item-1">
                            <a class="cover" href="/game/${games.id}-${titulo}" title="${games.data().nombre} ${games.data().plataforma} ${games.data().precio}€">
                                <div class="badge ${games.data().plataforma}"></div>
                                <img class="picture mainshadow" src="${games.data().portada}" alt="${games.data().nombre}" title="${games.data().nombre}" loading="lazy">
                                <div class="shadow">
                                    <div class="discount">${games.data().descuento}%</div>
                                    <div class="price">${precioTotal.toFixed(2)}€</div>
                                </div>
                            </a>
                            <div class="name">${games.data().nombre}</div>
                        `
};

export const printDLC = (games) => {
    let precioTotal = games.data().precio-((games.data().descuento*games.data().precio)/100);
    let titulo = games.data().nombre.split(" ").join("-");
    return `
                        <div class="item force-badge" id="ig-preorders-item-1">
                            <a class="cover" href="/game/${games.id}-${titulo}" title="${games.data().nombre} ${games.data().plataforma} ${games.data().precio}€">
                                <div class="badge ${games.data().plataforma}"></div>
                                <img class="picture mainshadow" src="${games.data().portada}" alt="${games.data().nombre}" title="${games.data().nombre}" loading="lazy">
                                <img src="/assets/img/dlc.png" class="dlc" alt="DLC">
                                <div class="shadow">
                                    <div class="discount">${games.data().descuento}%</div>
                                    <div class="price">${precioTotal.toFixed(2)}€</div>
                                </div>
                            </a>
                            <div class="name">${games.data().nombre}</div>
                        `
};

export const printGame = (game,auth,estar) => {
    let precioTotal = game.data().precio-((game.data().descuento*game.data().precio)/100);
    let fecha = new Date(game.data().descripcion.fechaLanzamiento.seconds*1000);
    const months = ["Enero", "Febrero", "Marzo","Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let titulo = game.data().nombre;
    document.title = "Comprar " + titulo;
    const formatDate = (date)=>{
        let formatted_date = date.getDate() + " de " + months[date.getMonth()] + " del " + date.getFullYear()
        return formatted_date;
    }
    document.getElementById("backgroundLink").style=`background: linear-gradient(to bottom, #1d201f 0px, transparent 150px), url(${game.data().fondo}) center 0 no-repeat  #1d201f;`;
    let fechaFinal = formatDate(fecha);
    let dlc="";
    let dlcNoStock="";
    if(game.data().descripcion.Tipo=="DLC"){
        dlc=`<img src="/assets/img/dlc.png" class="dlc" alt="DLC">`
        dlcNoStock= `<img src="/assets/img/dlc.png" class="dlc noStock" alt="DLC">`;
    }
    let autentificacion;
    if(auth===null){
        autentificacion = "false"
    }else{
        autentificacion = "true"
    }

    let estar_;
    let cssEstar;
    if(estar===false){
        estar_ = "noEsta"
        cssEstar = "";
    }else{
        estar_ = "esta"
        cssEstar = "wishlist-added";
    }

    if(game.data().keys.length==0) {
        return `

          <div id="ig-main-container">
        
            <div class="ig-wrapper ig-mainwrapper mainshadow  rounded">
        
              <div id="ig-panel-center">
        
                <div id="juego">
                  <div id="ig-product-main-panel">
                    <div class="product">
                      <div class="blur">
                        <div class="cover mainshadow">
                          <!--imagen-->
                          <img class="picture noStock" src="${game.data().portada}">
                           ${dlcNoStock}
                        </div>
                      </div>
                      <div class="infos mainshadow">
                        <h1>${game.data().nombre}</h1>
                        <div class="subinfos">
                          <a class="platform">
                            <div class="badge ${game.data().plataforma}"></div>
                            ${game.data().plataforma}
                          </a>
                          <div class="download">
                            <img src="https://firebasestorage.googleapis.com/v0/b/indiekeys-d0568.appspot.com/o/images%2FStock%2Fnostock.svg?alt=media&token=c8e937d3-46fa-4dce-b8ae-aa9e8af501a6">No queda Stock
                          </div>
                          <div class="download">
                            <img src="https://firebasestorage.googleapis.com/v0/b/indiekeys-d0568.appspot.com/o/images%2FStock%2Fstock.webp?alt=media&token=a5020a31-0a83-4aa9-8f59-da43ee2fe8aa">Descarga inmediata
                          </div>
                        </div>
        
                        <div class="buy">
                          <div class="prices">
                            <div class="retail">
                              Precio de venta al público:
                              <span>${game.data().precio}€</span>
                            </div>
                            <div class="discount">${game.data().descuento}%</div>
                            <div class="price">${precioTotal.toFixed(2)}€</div>
                          </div>
                          <div class="swap">
                            <a id="ig-product-main-panel-addwishlist" class="button addwishlist hint--top hint--rounded ${autentificacion} ${estar_} ${cssEstar}"  name="${game.id}"></a>
                            <a  href="#" rel="nofollow" class="button buybutton not-active">Comprar</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="information">
        
                    <div class="info mainshadow" id="ig-product-desc-content" style="">
                      <!--Posible Video de ampliación -->
                      <div class="description readmore in" itemprop="description" id="descripcion">
                        <!--Descripción -->
                        <h2>Acerca del Juego</h2>
                        <p>${game.data().descripcion.Descripcion}</p>
                        <p><b>Fecha de lanzamiento: </b>${fechaFinal}</p>
                        <p><b>Desarrollador: </b>${game.data().descripcion.Desarrollador}</p>
                        <p><b>Tipo: </b> ${game.data().descripcion.Tipo}</p>
                      </div>
                      <!--Posible Requisitos de ampliación -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
    }else{
        return `

          <div id="ig-main-container">
        
            <div class="ig-wrapper ig-mainwrapper mainshadow  rounded">
        
              <div id="ig-panel-center">
        
                <div id="juego">
                  <div id="ig-product-main-panel">
                    <div class="product">
                      <div class="blur">
                        <div class="cover mainshadow">
                          <!--imagen-->
                          <img class="picture" src="${game.data().portada}">
                          ${dlc}
                        </div>
                      </div>
                      <div class="infos mainshadow">
                        <h1>${game.data().nombre}</h1>
                        <div class="subinfos">
                          <a class="platform">
                            <div class="badge ${game.data().plataforma}"></div>
                            ${game.data().plataforma}
                          </a>
                          <div class="download">
                            <img src="https://firebasestorage.googleapis.com/v0/b/indiekeys-d0568.appspot.com/o/images%2FStock%2Fstock.webp?alt=media&token=a5020a31-0a83-4aa9-8f59-da43ee2fe8aa">En stock
                          </div>
                          <div class="download">
                            <img src="https://firebasestorage.googleapis.com/v0/b/indiekeys-d0568.appspot.com/o/images%2FStock%2Fstock.webp?alt=media&token=a5020a31-0a83-4aa9-8f59-da43ee2fe8aa">Descarga inmediata
                          </div>
                        </div>
        
                        <div class="buy">
                          <div class="prices">
                            <div class="retail">
                              Precio de venta al público:
                              <span>${game.data().precio}€</span>
                            </div>
                            <div class="discount">${game.data().descuento}%</div>
                            <div class="price">${precioTotal.toFixed(2)}€</div>
                          </div>
                          <div class="swap">
                            <a id="ig-product-main-panel-addwishlist" class="button addwishlist hint--top hint--rounded ${autentificacion} ${estar_} ${cssEstar}" name="${game.id}" ></a>
                            <a href="https://www.instant-gaming.com/es/pagos-7893-monster-hunter-rise-pc-juego-steam/" rel="nofollow" class="button buybutton">Comprar</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="information">
        
                    <div class="info mainshadow" id="ig-product-desc-content" style="">
                      <!--Posible Video de ampliación -->
                      <div class="description readmore in" itemprop="description" id="descripcion">
                        <!--Descripción -->
                        <h2>Acerca del Juego</h2>
                        <p>${game.data().descripcion.Descripcion}</p>
                        <p><b>Fecha de lanzamiento: </b>${fechaFinal}</p>
                        <p><b>Desarrollador: </b>${game.data().descripcion.Desarrollador}</p>
                        <p><b>Tipo: </b> ${game.data().descripcion.Tipo}</p>
                      </div>
                      <!--Posible Requisitos de ampliación -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
    }
};

export const printNoGame = () => {

    return `<div><br><h2 id="ningunJuego">No se ha podido encontrar ningún Juego =(</h2><a href="#" class="boton" id="botonJuegos" >Click aquí para ver todo el catálogo</a></div>`

};

export const printAvatar = (auth) => {

    return `<div class="avatar"><img src="${auth.photoURL}" class="ig-avatar"></div>`

};

