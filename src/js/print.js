export const printGames = (games) => {
let precioTotal = games.data().precio-((games.data().descuento*games.data().precio)/100);
console.log(precioTotal);
return `<div class="basic-panel products-trending">
                        <div class="item" id="ig-preorders-item-1">
                            <a class="cover" href="/paginas/index.html" title="${games.data().nombre} ${games.data().plataforma} ${games.data().precio}€">
                                <div class="badge steam"></div>
                                <img class="picture mainshadow" src="${games.data().portada}" alt="${games.data().nombre}" title="${games.data().nombre}">
                                <div class="shadow">
                                    <div class="discount">${games.data().descuento}%</div>
                                    <div class="price">${precioTotal.toFixed(2)}€</div>
                                </div>
                            </a>
                            <div class="name">${games.data().nombre}</div>
                        </div>`
};