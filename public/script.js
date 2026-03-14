async function loadProducts(){

let res = await fetch("/products");

let data = await res.json();

let table = document.getElementById("productTable");

table.innerHTML="";

data.forEach(product => {

let row = `
<tr>
<td>${product.id}</td>
<td>${product.name}</td>
<td>${product.quantity}</td>
<td>
<button onclick="deleteProduct(${product.id})">Delete</button>
</td>
</tr>
`;

table.innerHTML += row;

});

}

async function addProduct(){

let name = document.getElementById("name").value;

let quantity = document.getElementById("quantity").value;

if(name === "" || quantity === ""){

alert("Please fill all fields");

return;

}

await fetch("/add-product",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
name:name,
quantity:quantity
})

});

loadProducts();

}

async function deleteProduct(id){

await fetch(`/delete-product/${id}`,{
method:"DELETE"
});

loadProducts();

}

loadProducts();