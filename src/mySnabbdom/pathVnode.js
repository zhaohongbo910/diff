
import updateChildren from './updateChildren'

export default function patchVNode(oldVnode, newVnode){
       // ③ 判断是不是同一个对象
       if (oldVnode === newVnode) return
       // 判断newVnode.text 属性有值  并且 children 为undefined  或者 length == 0
       if (newVnode.text !== "" && (newVnode.children == undefined || newVnode.children.length === 0)) {
           //  如果 新旧vnode 的 text 的属性不相同
           if (newVnode.text != oldVnode.text) {
               // 直接替换
               oldVnode.elm.innerText = newVnode.text
           }
       } else {
           // 判断oldVnode有没有children，新老vnode 都有chilren 的最复杂的情况 在这里
           if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
               // oldVnode 有children
               console.log("🚀 ~ patchVNode ~  oldVnode,newVnode 都有children")
               updateChildren(oldVnode.elm, oldVnode.children,newVnode.children)
           } else {
               // ④ oldVnode 没有 children , newVNode 有 children 则创建 newVnode.children 的 真实dom
               // 清空 oldVnode 的 elm的 文本
               oldVnode.elm.innerText = ""
               // 遍历 newVnode 的 children 生成dom 上树
               for (let i = 0; i < newVnode.children.length; i++) {
                   let dom = createElement(newVnode.children[i])
                   oldVnode.elm.appendChild(dom)
               }
           }   
       }
}