import createElement from "./createElement";
import patchVNode from "./pathVnode";
import sameNode from "./sameNode";

export default function updateChildren(parentElm, oldCh, newCh) {
    console.log("ð ~ file:", parentElm)
    // æ§èç¹ç å¤´é¨æé
    let oldStartIdx = 0;
    // æ§èç¹ç å°¾é¨æé
    let oldEndIdx = oldCh.length - 1;
    // æ°èç¹ç å¤´é¨æé
    let newStartIdx = 0;
    // æ°èç¹ç å°¾é¨æé
    let newEndIdx = newCh.length - 1;

    //æ§èç¹çå¤´é¨ vnode
    let oldStartVnode = oldCh[oldStartIdx]
    //æ§èç¹çå°¾é¨ vnodeâ
    let oldEndVnode = oldCh[oldEndIdx]

    //æ°èç¹çå¤´é¨ vnode
    let newStartVnode = newCh[newStartIdx]
    //æ°èç¹çå¤´é¨ vnode
    let newEndVnode = newCh[newEndIdx]

    // ç¼å­ key 
    let keyMap = new Map()

    while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {

        // è¿æ»¤ å¤çå·²ç»çèç¹
        if (oldStartVnode == null || oldStartVnode == undefined) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (oldEndVnode == null || oldEndVnode == undefined) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (newStartVnode == null || newStartVnode == undefined) {
            newStartVnode = newCh[++newStartIdx]
        } else if (newEndVnode == null || newEndVnode == undefined) {
            newEndVnode = newCh[--newEndIdx]
        } else if (sameNode(oldStartVnode, newStartVnode)) {   // æ°ååæ§å

            // pathVnode æ¯å¯¹æ¯åå®¹åå­èç¹
            patchVNode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (sameNode(oldEndVnode, oldStartVnode)) {
            //æ°åä¸æ§å
            patchVNode(oldStartVnode, newStartVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameNode(oldStartVnode, newEndVnode)) {

            //æ°åä¸æ§å
            patchVNode(oldStartVnode, newEndVnode)
            // å½æ°å ä¸ æ§åå½ä¸­çæ¶åï¼æ­¤æ¶éè¦ç§»å¨èç¹ï¼ç§»å¨ æ§åèç¹æåçåç´ èç¹ å° æ§åèç¹æåçåç´ èç¹ä¹å
            /**
             *  old  A B C
             *  new  C B A     
             *  new_A old_A å½ä¸­äº ä½æ¯å¨æ°çèç¹ä¸­Aå¨æåï¼æä»¥æ­¤æ¶ç§»å¨ æ§åè¿ä¸ªèç¹å° æ§å èç¹
             */
            // ç§»å¨èç¹
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameNode(oldEndVnode, newStartVnode)) {
            //æ°åä¸æ§å
            patchVNode(oldEndVnode, newStartVnode)
            // å½æ°åä¸æ§å å½ä¸­çæ¶å æ­¤æ¶éè¦ç§»å¨èç¹ ç§»å¨ æ§åèç¹æåçåç´ èç¹ å° æ§åèç¹æåçåç´ èç¹ä¹å 
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            // æ§åèç¹ æéåç§»
            oldEndVnode = oldCh[--oldEndIdx]
            // æ°åèç¹ æéåç§»
            newStartVnode = newCh[++newStartIdx]
        } else {
            // ä¸é¢åç§æåµé½æ²¡æå½ä¸­çæ¶å
            // ä»oldStartIdx å° oldEnnIdx åå»ºä¸ä¸ªkey çå½±å°å³ç³»
            for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                const key = oldCh[i].key
                if (!key) {
                    keyMap.set(key, i)
                }
            }
            // å¨ æ§ç keyMap ä¸­ æ¥æ¾ å½åç æ°åèç¹çkey æ¯å¦å­å¨
            const idxInOld = keyMap.get(newStartVnode.key)
            // æ²¡ææ¾å° åä»£è¡¨æ¯ä¸ä¸ªæ°ç èç¹
            if (idxInOld == undefined) {
                console.log("ä¸­é´å¢å é¡¹")
                parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
            } else {
                console.log("ç§»å¨é¡¹")
                // å¦ææ¾å° åéè¦
                const elmToMove = oldCh[idxInOld]
                // å¯¹æ¯ä¸ä¸ èç¹åå®¹æ¯å¦åå
                patchVNode(elmToMove, newStartVnode)
                oldCh[idxInOld] = undefined
                // ç§»å¨èç¹ 
                parentElm.idxInOld(elmToMove.elm, oldStartVnode.elm)

            }
            // ç§»å¨æ°èç¹
            newStartVnode = newCh[++newStartIdx]
        }

    }

    // ç»§ç»­ççææ²¡æå©ä½ç å¾ªç¯ç»æçæ¶å start è¿æ¯æ¯ old å° æè¯´æè¿æå©ä½çèç¹æ²¡æå¤ç
    if (newStartIdx <= newEndIdx) {
        // å¤çæ°å¢çèç¹
        console.log("å°¾é¨å¢å é¡¹")
        // è·å æå¥èç¹çæ æ
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        // 
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // åå»º æ°å¢èç¹ ç¶åæå¥
            parentElm.insertBefore(createElement(newCh[i]), before)
        }

    } else if (oldStartIdx <= oldEndIdx) {
        console.log("å é¤é¡¹")
        // å¤ç å é¤ oldStartIdx -- oldEndIdx ä¹é´ç çèç¹
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }

}