export default function createElement(vnode) {
    // 创建dom节点，绑定到vnode的 elm 属性上，但是此次dom的节点还是一个孤儿dom节点，
    let domNode = document.createElement(vnode.sel);
    // 如果vnode的文本信息不为空，则直接设置为
    if (vnode.text != '' && (vnode.children == undefined || vnode.children.length === 0)) {
        domNode.innerHTML = vnode.text;
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 如果vnode的chilren不为空，递归创建子节点
        for (let i = 0; i < vnode.children.length; i++) {
            // 创建子节点的真实dom
            let domChild = createElement(vnode.children[i])
            // 将获取到的真实dom 添加到 父节点中
            domNode.appendChild(domChild)
        }
    }
    // 绑定dom到 虚拟节点的elm属性
    vnode.elm = domNode
    // 返回创建的真实 dom
    return vnode.elm
}