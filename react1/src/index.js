
//引入样式
require('./style.css')

const dom = (dom,name) =>{
    document.querySelector(dom).textContent = name;
}
dom('#app','飞机')

console.log('HELLOW WORLD')