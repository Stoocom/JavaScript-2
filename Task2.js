//=========================2=УРОК=========================//=========================2=УРОК=========================//


function sendRequest(url) {
    // pending->fulfulled|rejected
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject();
                }
                const users = JSON.parse(xhr.responseText);

                resolve(users);
            }
        };
        xhr.send();
    });
}

// Создание отдельного класса для продукта-обьекта
class Item {
    // Функция-конструктор в классе продукта с двумя свойствами и одним методом(функцией)
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    // Функция-художник в классе продукта (художник нужен при отрисовке продукта)
    render() {
        return `<div class="item"><h3 class="item__title">${this.title}</h3><p class="item__price">${this.price}</p></div>`;
    }
}

// Cоздание класса корзины, где будут хранится наши продукты после перемещения
class Basket {
    // Функция-конструктор в классе продукта с одним пустым массивом
    constructor() {
        this.goods = [];
    }

    // Функция для добавления из сервера товаров-продуктов (уже добавлены)
    fetchItems() {
        return sendRequest('/goods')
            .then((goods) => {
                this.goods = goods;
            });
    }

    // Функция для отрисовки товаров-продуктов в новой корзине
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            good.title = good.title || 0;
            good.price = good.price || 0;
            const goodItem = new Item(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.catalog').innerHTML = listHtml;
    }

    sumPrices() {
        let sum = 0;
        this.goods.forEach((good) => {
            good.title = good.title || 0;
            good.price = good.price || 0;
            const goodItem = new Item(good.title, good.price);
            sum += good.price;
        });

        let footer = document.createElement("div");
        footer.className = "footer";
        footer.innerHTML = "Итого товара(товаров) общей стоимостью " + sum + " рублей";
        document.body.appendChild(footer);
    }
}


let button = document.querySelector('button');
console.log(button);

button.addEventListener("click", add);
function add() {
    //alert("Начинаем отрисовку!");
    const list = new Basket(); //Создание нового обьекта
    list.fetchItems().then(() => {
        list.render();
        list.sumPrices();//Вот тут не знаю, можно ли сделать данную функцию через then???

    });

}
    //alert("Hello");
    //console.log("Я еще тут");
    //const list = new Catalog();
    //list.fetchItems();
    //console.log("Я еще тут");
    //document.querySelector('.catalog').innerHTML = list.render();
    //$button.appendChild();








