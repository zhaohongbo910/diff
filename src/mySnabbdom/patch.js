import createElement from './createElement'
import patchVNode from './pathVnode'
import sameNode from './sameNode'
import vnode from './vnode'
/**
 * 
 * @param {*} oldVnode 
 * @param {*} newVnode 
 *  
 *   patch 是一个阉割版本的  就是说 childrenNode 的类型要么是 文本节点 或者是 标签节点 只能有一个 
 *   vnode 的text 和 children 只能一个有值
 * 
 *   patch 函数被调用 
 *  
 *   ① oldVnode 是不是虚拟节点 --- NO --- 将oldVnodo包装成虚拟节点
 *   |
 *   yes
 *   |
 *   ② oldVnode 和 newVnode是不是同一个节点 --- NO -- 暴力删除旧的 oldVnode 插入新的  
 *   |
 *   yes
 *   |         
 *   ③ 如果oldVnode 和 newVnode 是内存中同一个对象，? 则什么操作都不做，直接return :
 *   |  newVnode 有没有text 属性 --- 有 ---  newVnode.text === oldVnode.text ?  
 *   |        什么都不做 : 把 elm.innerText = newVnode.text 直接更改 
 *   |
 *   |
 *   ④  oldVnode 有没有children -- No -- 清空oldVnode的text  并且把newVnode 的children 添加到 dom 中
 *   | 
 *   |
 *   | 
 *   ⑤
 *     
 * 
 *   
 * 
 *   如何判断是不是同一个虚拟节点
 *   判断节点的key 并且 节点的 sel 属性 是否相同
 *  
 *   子节点插入 两种方法
 *   insertBefore(插入的节点,插入到那个节点之前)  // 变化位置插入
 *   appendChild(插入的节点)  // 顺序插入  
 * 
 */


// patch 函数的功能只要是对比 vdom 进行 diff 算法 操作
export default function patch(oldVnode, newVnode) {

    // ① 判断旧节点是不是有sel 属性，如果没有 包装成 vnode 节点
    if (!oldVnode.hasOwnProperty('sel')) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }

    // 判断是不是同一个节点
    if (sameNode(oldVnode, newVnode)) {
        // ③
        patchVNode(oldVnode, newVnode)
    } else {
        // ② 不是同一个节点 暴力删除，用新的替换
        let newVnodeElement = createElement(newVnode)
        if (oldVnode.elm.parentNode != undefined && oldVnode.elm.parentNode.insertBefore) {
            // 将新节点插入到 旧节点的父元素的 之前
            oldVnode.elm.parentNode.insertBefore(newVnode.elm, oldVnode.elm)
            oldVnode.elm.parentNode.removeChild(oldVnode.elm)
        }
    }

}

