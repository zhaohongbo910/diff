// 判断是不是相同的虚拟节点
export default function sameNode(oldVnode, newVnode) {
    return oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel
}