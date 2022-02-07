export const printGames = (games) => {
let precioTotal = games.data().precio-((games.data().descuento*games.data().precio)/100);

return `
                        <div class="item force-badge" id="ig-preorders-item-1">
                            <a class="cover" href="${games.id}" title="${games.data().nombre} ${games.data().plataforma} ${games.data().precio}€">
                                <div class="badge ${games.data().plataforma}"></div>
                                <img class="picture mainshadow" src="${games.data().portada}" alt="${games.data().nombre}" title="${games.data().nombre}">
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

    return `
                        <div class="item force-badge" id="ig-preorders-item-1">
                            <a class="cover" href="/paginas/index.html" title="${games.data().nombre} ${games.data().plataforma} ${games.data().precio}€">
                                <div class="badge ${games.data().plataforma}"></div>
                                <img class="picture mainshadow" src="${games.data().portada}" alt="${games.data().nombre}" title="${games.data().nombre}">
                                <img src="/assets/img/dlc.png" class="dlc" alt="DLC">
                                <div class="shadow">
                                    <div class="discount">${games.data().descuento}%</div>
                                    <div class="price">${precioTotal.toFixed(2)}€</div>
                                </div>
                            </a>
                            <div class="name">${games.data().nombre}</div>
                        `
};

export const printGame = (game) => {
    let precioTotal = game.data().precio-((game.data().descuento*game.data().precio)/100);
    let fecha = new Date(game.data().descripcion.fechaLanzamiento.seconds*1000);
    const months = ["Enero", "Febrero", "Marzo","Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const formatDate = (date)=>{
        let formatted_date = date.getDate() + " de " + months[date.getMonth()] + " del " + date.getFullYear()
        return formatted_date;
    }
    let fechaFinal = formatDate(fecha);
    document.getElementById("backgroundLink").setAttribute("style",`background: linear-gradient(to bottom, #1d201f 0px, transparent 150px), url(${game.data().fondo}) center 0 no-repeat  #1d201f;`)
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
                    <img src="https://s3.gaming-cdn.com/themes/igv1/modules/product/images/ticked2.png">En stock
                  </div>
                  <div class="download">
                    <img src="https://s3.gaming-cdn.com/themes/igv1/modules/product/images/ticked2.png">Descarga inmediata
                  </div>
                </div>

                <div class="buy">
                  <div class="prices">
                    <div class="retail">
                      Precio de venta al público:
                      <span>${game.data().precio}€</span>
                    </div>
                    <div class="discount">${game.data().descuento}%</div>
                    <div class="price">${precioTotal}€</div>
                  </div>
                  <div class="swap">
                    <a id="ig-product-main-panel-addwishlist" class="button addwishlist hint--top hint--rounded " data-text-add="Añadir a mi wishlist" data-text-remove="Eliminar de mi wishlist" data-hint="Añadir a mi wishlist" href="" data-prodid="7893" data-signed="1"></a>
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
};