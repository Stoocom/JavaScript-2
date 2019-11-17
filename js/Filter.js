Vue.component('filter-form', {
    data(){
        return {
            searchLine:"",
        }
    },
    template:`
    <div class="catalogFilter">
      <form action="#" method="post" class="search-form" @input="$root.$refs.products.filter(searchLine)">
        <input type="text" class="search-field" v-model="searchLine">
        <input class="btn-search" type="submit" value="search">
      </form>
    </div>
  `
});
