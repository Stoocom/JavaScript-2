const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
/*
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};
*/
let getRequest2 = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        reject();
        } else {
        const users = JSON.parse(xhr.responseText);
        resolve(users);
        }
      }
    };
    xhr.send();

  })
};

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts()
      .then(data => {
        this.goods = data;
        this._render();
      });
    // this._fetchProducts();
    // this._render();
  }

  // _fetchProducts() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     this.goods = JSON.parse(data);
  //     this._render();
  //     console.log(this.goods);
  //   });
  // }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

}

const list = new ProductList();

// ============================= CREATE BASKET =====================================//


class ProductItemBasket {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.product_name = product[contents].product_name;
    this.price = product[contents].price;
    this.id = product[contents].id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class ProductListBasket {
  constructor(container = '.basket') {
    this.container = container;
    this.goods = [];
    this.sum = 0;
    this.allProducts = [];
    this._getProducts()
        .then(data => {
        this.goods = data.contents;
        this.sum = data.amount;
        this._render();
        this._sumPrices();
    });

  }

  _getProducts() {
    return fetch(`${API}/getBasket.json`)
        .then(result => result.json())
        .catch(error => {
        console.log('Error: ', error);
    });
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  _sumPrices() {

    let footer = document.createElement("div");
    footer.className = "footer";
    footer.innerHTML = "Итого товара(товаров) общей стоимостью " + this.sum + " рублей";
    document.body.appendChild(footer);
  }
}
let button = document.querySelector('button');

button.addEventListener("click", () => {
  const listBasket = new ProductListBasket();
});



// const products = [
//   {id: 1, title: 'Notebook', price: 40000},
//   {id: 2, title: 'Mouse', price: 1000},
//   {id: 3, title: 'Keyboard', price: 2500},
//   {id: 4, title: 'Gamepad', price: 1500},
// ];
//
// const renderProduct = (item, img = 'https://placehold.it/200x150') => `<div class="product-item">
//             <img src="${img}" alt="Some img">
//             <h3>${item.title}</h3>
//             <p>${item.price}</p>
//             <button class="by-btn">Добавить</button>
//           </div>`;
//
// const renderProducts = list => document.querySelector('.products')
//   .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
//
// renderProducts(products);
