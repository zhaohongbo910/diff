import createElement from './createElement'
import vnode from './vnode'
/**
 * 
 * @param {*} oldVnode 
 * @param {*} newVnode 
 * 
 *   patch 函数被调用 
 *  
 *   oldVnode 是不是虚拟节点 --- NO --- 将oldVnodo包装成虚拟节点
 *   |
 *   yes
 *   |
 *   oldVnode 和 newVnode是不是同一个节点 --- NO -- 暴力删除旧的 oldVnode 插入新的  
 *   |
 *   yes
 *   |         
 *   做精细化比较
 * 
 *   如何判断是不是同一个虚拟节点
 *   判断节点的key 并且 节点的 sel 属性  是否相同
 *
 * 
 */ 


// patch 函数的功能只要是对比 vdom 进行 diff 算法 操作
export default function patch(oldVnode,newVnode){

    // 判断旧节点是不是有sel 属性，如果没有 包装成 vnode 节点
    if(!oldVnode.hasOwnProperty('sel')){
        oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode)
    }

    // 判断是不是同一个节点
    if(sameNode(oldVnode,newVnode)){

    }else{  
        //不是同一个节点，需要插入
        let newVnodeElement = createElement(newVnode)        
        oldVnode.elm.parentNode.insertBefore(newVnode.elm,oldVnode.elm)         
    }

}


// 判断是不是相同的虚拟节点
function sameNode(oldVnode,newVnode){
    return oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel
}