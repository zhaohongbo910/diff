import h from './mySnabbdom/h'

import patch from './mySnabbdom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

let vnode1 = h("p", {}, "这是一个P标签")
// console.log("🚀 ~ file: index.js ~ line 4 ~ vnode1", vnode1)

// patch(container,vnode1)

let vnode2 = h('ul', {}, [
    h('li', {}, 'A'),
    h('li', {}, 'B'),
    h('li', {}, 'C'),
    h('li', {}, 'D')
])

patch(container,vnode2)


// console.log("🚀 ~ file: index.js ~ line 6 ~ voden", vnode2)
