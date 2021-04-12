import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

// let vnode1 = h("ul", {}, "这是一个P标签")

let vnode1 = h('ul', {}, [
    h('li', { key: "A" }, 'A'),
    h('li', { key: "B" }, 'B'),
    h('li', { key: "C" }, 'C'),
    // h('li', { key: "D" }, 'D'),
])


// 首次 patch 上树渲染 dom 
patch(container, vnode1)

let vnode2 = h('ul', {}, [
    h('li', { key: "C" }, 'C'),
    h('li', { key: "B" }, 'B'),
    h('li', { key: "A" }, 'A'),
 
    // h('li', { key: "D" }, 'D')
])

btn.onclick = function () {
    patch(vnode1, vnode2)
}

