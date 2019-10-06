//=========================2=УРОК=========================//=========================2=УРОК=========================//

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
class Catalog {
    // Функция-конструктор в классе продукта с одним пустым массивом
    constructor() {
        this.goods = [];
    }
    // Функция для добавления из сервера товаров-продуктов (уже добавлены)
    fetchGoods() {
        this.goods = [
            {},
            { title: 'Жесткий диск SSD 1Tb', price: 10000 },
            { title: 'Материнская плата', price: 4000 },
            { title: 'Видеокарта', price: 15000 },
        ];
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

    // Функция для подсчета стоимости товаров
    SumPrices() {
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

class Basket {
    // Конструктор для нового массива для корзины
    constructor() {
        this.goodsInBasket = [];
    }
    // Метод render для отрисовки всего массива в корзине
    render() {
        let listHtml = '';
        this.goodsInBasket.forEach(good => {
            good.title = good.title || "None";
            good.price = good.price || "None";
            const goodItem = new ItemBasket(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.basket').innerHTML = listHtml;

    }
}

class ItemBasket extends Item {
    //добавление отдельного метода для добавления в корзину
    //При этом остальные методы и конструктор остаются базисными
    addToBasket() {
        let button = document.getElementById(this.id);
        button.addEventListener('click', (ItemBasket) => goodsInBasket.push(ItemBasket));
    }
}


