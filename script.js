
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        allProducts: [],
        searchLine: '',
        imgCatalog: 'https://placehold.it/200x150',
        cartItems: [],
        imgCart: 'https://placehold.it/150x80',
        show: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        filter() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(el => regexp.test(el.product_name));
            return this.filteredGoods;
        },
        addProduct(product) {
            this.getJson(`${API_URL}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            console.log(find);
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        removeProduct(product) {
            this.getJson(`${API_URL}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
                            find.quantity--;
                        } else { // удаляем
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        calcSum() {
            return this.cartItems.reduce((sum, good) => sum += good.price * good.quantity, 0);
        }
    },
    mounted() {
        this.getJson(`${API_URL}/catalogData.json`)
            .then(data => {
            for (let el of data) {
                this.goods.push(el);
                this.filteredGoods.push(el);
            }
        });
        this.getJson(`${API_URL}/getBasket.json`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });

    }
});
