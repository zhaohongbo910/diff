// 实现vnode的包装对象
export default function vnode(sel, data, children, text, elm,) {
    return { sel, data, children, text, elm }
}