import createElement from "./createElement";
import patchVNode from "./pathVnode";
import sameNode from "./sameNode";

export default function updateChildren(parentElm, oldCh, newCh) {
    console.log("🚀 ~ file:", parentElm)
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

    // 缓存 key 
    let keyMap = new Map()

    while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {

        // 过滤 处理已经的节点
        if (oldStartVnode == null || oldStartVnode == undefined) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (oldEndVnode == null || oldEndVnode == undefined) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (newStartVnode == null || newStartVnode == undefined) {
            newStartVnode = newCh[++newStartIdx]
        } else if (newEndVnode == null || newEndVnode == undefined) {
            newEndVnode = newCh[--newEndIdx]
        } else if (sameNode(oldStartVnode, newStartVnode)) {   // 新前和旧前

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
            // 当新后 与 旧前命中的时候，此时需要移动节点，移动 旧前节点指向的元素节点 到 旧后节点指向的元素节点之后
            /**
             *  old  A B C
             *  new  C B A     
             *  new_A old_A 命中了 但是在新的节点中A在最后，所以此时移动 旧前这个节点到 旧后 节点
             */
            // 移动节点
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameNode(oldEndVnode, newStartVnode)) {
            //新前与旧后
            patchVNode(oldEndVnode, newStartVnode)
            // 当新前与旧后 命中的时候 此时需要移动节点 移动 旧后节点指向的元素节点 到 旧前节点指向的元素节点之前 
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            // 旧后节点 指针前移
            oldEndVnode = oldCh[--oldEndIdx]
            // 新前节点 指针后移
            newStartVnode = newCh[++newStartIdx]
        } else {
            // 上面四种情况都没有命中的时候
            // 从oldStartIdx 到 oldEnnIdx 创建一个key 的影射关系
            for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                const key = oldCh[i].key
                if (!key) {
                    keyMap.set(key, i)
                }
            }
            // 在 旧的 keyMap 中 查找 当前的 新前节点的key 是否存在
            const idxInOld = keyMap.get(newStartVnode.key)
            // 没有找到 则代表是一个新的 节点
            if (idxInOld == undefined) {
                console.log("中间增加项")
                parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
            } else {
                console.log("移动项")
                // 如果找到 则需要
                const elmToMove = oldCh[idxInOld]
                // 对比一下 节点内容是否变化
                patchVNode(elmToMove, newStartVnode)
                oldCh[idxInOld] = undefined
                // 移动节点 
                parentElm.idxInOld(elmToMove.elm, oldStartVnode.elm)

            }
            // 移动新节点
            newStartVnode = newCh[++newStartIdx]
        }

    }

    // 继续看看有没有剩余的 循环结束的时候 start 还是比 old 小 怎说明还有剩余的节点没有处理
    if (newStartIdx <= newEndIdx) {
        // 处理新增的节点
        console.log("尾部增加项")
        // 获取 插入节点的标杆
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        // 
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // 创建 新增节点 然后插入
            parentElm.insertBefore(createElement(newCh[i]), before)
        }

    } else if (oldStartIdx <= oldEndIdx) {
        console.log("删除项")
        // 处理 删除 oldStartIdx -- oldEndIdx 之间的 的节点
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }

}