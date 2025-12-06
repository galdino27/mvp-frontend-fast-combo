
// Dados simulados de produtos
const products = [
  {id:1,name:'Combo Batata + Nuggets',price:24.90},
  {id:2,name:'Balde de Frango Frito',price:39.90},
  {id:3,name:'Batata Maluca',price:29.90},
  {id:4,name:'Lasanha',price:27.90}
];

const state = {cart:[]};

function $(sel){return document.querySelector(sel)}
function renderProducts(){
  const container = $('#products');
  container.innerHTML = '';
  products.forEach(p=>{
    const el = document.createElement('div'); el.className='card';
    el.innerHTML = `<h3>${p.name}</h3><p>R$ ${p.price.toFixed(2)}</p><button data-id="${p.id}" class="add">Adicionar</button>`;
    container.appendChild(el);
  });
}
function addToCart(id){
  const p = products.find(x=>x.id===id);
  const it = state.cart.find(x=>x.id===id);
  if(it) it.qty++;
  else state.cart.push({id:p.id,name:p.name,price:p.price,qty:1});
  renderCart();
}
function renderCart(){
  const c = $('#cart-items'); const s = $('#cart-summary');
  if(!c || !s) return;
  c.innerHTML = '';
  let total=0;
  state.cart.forEach(i=>{
    total += i.price * i.qty;
    const div = document.createElement('div');
    div.innerHTML = `<b>${i.name}</b> x ${i.qty} — R$ ${(i.price*i.qty).toFixed(2)}`;
    c.appendChild(div);
  });
  s.innerHTML = `<p>Total: R$ ${total.toFixed(2)}</p>`;
}
document.addEventListener('click', e=>{
  if(e.target.matches('#view-menu')){ $('#menu').classList.remove('hidden'); $('#cart').classList.add('hidden'); renderProducts(); }
  if(e.target.matches('.add')) addToCart(parseInt(e.target.dataset.id));
  if(e.target.matches('#checkout')) alert('Checkout simulado — MVP Front-End');
});
