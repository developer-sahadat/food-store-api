//loading section
(function(loader) {

  window.addEventListener('beforeunload', function(e) {
    activateLoader();
  });

  window.addEventListener('load', function(e) {
    deactivateLoader();
  });

  function activateLoader() {
    loader.style.display = 'block';
    loader.style.opacity = 1;
  }

  function deactivateLoader() {
    /**
     * ensures that the loading animation plays for at least a second to give the
     * appearance of seamless loading on pages that execute and load extremely
     * quickly (i.e., intranet pages)
     */
    setTimeout(function() {
      deactivate();
    }, 1000);

    function deactivate() {
      loader.style.opacity = 0;
      loader.addEventListener('transitionend', function() {
        loader.style.display = 'none';
      }, false);
    }
  }
})(document.querySelector('.o-page-loader'));



//seatch-btn 
document.getElementById("seatch-btn").addEventListener('click', ()=>{
   const searchFilder=document.getElementById('search-Filder')
   if(searchFilder.value==''){
       const h2=document.getElementById('errorr-msg')
       h2.innerText='Sorry, we did not find any products with this name.'
       const all_products=document.getElementById('all-products');
       all_products.textContent=''
       all_products.appendChild(h2)
    
   }else{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFilder.value}`
    fetch(url)
    .then(res=>res.json())
    .then(res=> seatchProducts(res.meals))
   }
  
})
const seatchProducts=product=>{
    const all_products=document.getElementById('all-products');
    if(product==null){
        const h2=document.getElementById('errorr-msg')
        h2.innerText='Sorry, we did not find any products with this name.'
        all_products.textContent=''
        all_products.appendChild(h2)
    }else{

        all_products.textContent=''
        all_products.classList.add('all-product')
       
    product.forEach(products=>{
    
        const div=document.createElement('div');
    
        div.innerHTML=`
              
            <div class="card">
            <img src="${products.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${products.strMeal}</h5>
            </div>
            <button class='my-btn w-50 mx-auto my-3'
            type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" 
           onclick="orderNow('${products.idMeal}')">Order Now</button>
            </div>
            `
            all_products.appendChild(div)
    
    })      
    }
}



// fish food items code star now

const food_fish_items=()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=fish')
    .then(res=>res.json())
    .then(res=> food_fish(res.meals))
}
food_fish_items()

const food_fish=fish=>{
const fish_food_section=document.getElementById('fish-food-section')
fish.forEach(element => {
    const div=document.createElement('div');

    div.innerHTML=`
        <div class="card h-100">
            <img src="${element.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.strMeal}</h5>
                <p class="card-text">${element.strInstructions.slice(0,100)}</p>
            </div>
            <button class='my-btn w-50 mx-auto my-3' type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="orderNow('${element.idMeal}')">Order Now</button>
        </div>
    `
    fish_food_section.appendChild(div)
});

}

// fish food items code end now



// our best selling food strat now

const ourBestSellingFood=()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then(res=>res.json())
    .then(res=> bestSellingFood(res.meals))
}

ourBestSellingFood()

const bestSellingFood=food=>{
    const best_selling_food_section=document.getElementById('best-selling-food-section');
    food.forEach(foods=>{
        
        const div=document.createElement('div');

        div.innerHTML=`
            <div class="card h-100">
                <img src="${foods.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${foods.strMeal}</h5>
                </div>
                <button  class='my-btn w-50 mx-auto my-3'  type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="orderNow('${foods.idMeal}')">Order Now</button>
            </div>
            `
        best_selling_food_section.appendChild(div)

    })
}
// our best selling food ends now




// order page

function orderNow(id){
console.log(id);
const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

fetch(url)
.then(res=>res.json())
.then(res=>{
    
console.log(res);
const div=document.createElement('div')

div.innerHTML=`
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
  <div  class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="d-flex m-2 justify-content-center align-items-center ">
      <div class="card border-0 shadow-none  w-50">
      <img src="${res.meals[0].strMealThumb}" class=" img-fluied rounded-start" alt="...">
          
      </div>
      <div class="ms-5 w-50">
          <h3  >Title: ${res.meals[0].strIngredient2}</h3>
          <h3>Price: $10</h3>
          <p  ><span class='h4'>Description:</span> ${res.meals[0].strInstructions.slice(0,107)}</p>
          <p ><span class='h3'>Review: </span> <span class='text-warning'> <i class="fa-solid fa-star "></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> </span> </p>
         
      </div>
  </div>
      </div>
    
    </div>
  </div>
</div>

`
document.body.appendChild(div)
}) 

}
 