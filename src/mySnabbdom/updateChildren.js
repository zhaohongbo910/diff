import patchVNode from "./pathVnode";
import sameNode from "./sameNode";

export default function updateChildren(parentElm, oldCh, newCh) {
    console.log("🚀 ~ file: updateChildren.js ~ line 5 ~ updateChildren ~ parentElm", parentElm)
    console.log("🚀 ~ updateChildren ",)
    // 旧节点的 头部指针
    let oldStartIdx = 0;
    // 旧节点的 尾部指针
    let oldEndIdx = oldCh.length - 1;
    // 新节点的 头部指针
    let newStartIdx = 0;
    // 新节点的 尾部指针
    let newEndIdx = newCh.length - 1;

    //旧节点的头部 vnode
    let oldStartVnode = oldCh[oldStartIdx]
    //旧节点的尾部 vnode∏
    let oldEndVnode = oldCh[oldEndIdx]

    //新节点的头部 vnode
    let newStartVnode = newCh[newStartIdx]
    //新节点的头部 vnode
    let newEndVnode = newCh[newEndIdx]

    while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
            // 新前和旧前
        if (sameNode(oldStartVnode, newStartVnode)) {
            // pathVnode 是对比内容和子节点
            patchVNode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (sameNode(oldEndVnode, oldStartVnode)) {
            //新后与旧后
            patchVNode(oldStartVnode, newStartVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameNode(oldStartVnode, newEndVnode)) {
      
            //新后与旧前
            patchVNode(oldStartVnode, newEndVnode)
            // 当新后 与 旧前命中的时候，此时需要移动节点，移动 旧前指向 的这个节点 到 旧后节点
            /**
             *  old  A B C
             *  new  C B A     
             *  new_A old_A 命中了 但是在新的节点中A在最后，所以此时移动 旧前这个节点到 旧后 节点
             */
            // 移动节点
            parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]        
        } else if (sameNode(oldEndVnode, newStartVnode)) {
            //新前与旧后
            patchVNode(oldEndVnode, newStartVnode)
            // 
            parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm) 
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else{
            
        }
           
    }

    if (newStartIdx <= newEndIdx) {
        console.log('有新增的尾部节点')
    }


}