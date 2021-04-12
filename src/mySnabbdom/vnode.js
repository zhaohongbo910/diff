// 实现vnode的包装对象
export default function vnode(sel, data, children, text, elm,) {
    let { key } = data
    return { sel, key, data, children, text, elm }
}