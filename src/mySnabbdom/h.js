import vnode from './vnode'
/**
 *   h 函数调用的 传递参数的形式 
 *   返回的是 vnode
 *   ① h('p',{},'这是一个P标签的文本')
 * 
 *   ② h('p',{},[
 *      h('p',{},'A'),
 *      h('p',{},'b') 
 *    ])
 * 
 *   ③ h('p',{},h('p',{},'A'))
 * 
 */


// 生成vnode的函数
export default function h(sel, data, c) {

    // ① 如果 c 的类型是字符串 则将其赋值为 文本节点 类型
    if (typeof c == 'string') {
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c) && c.length > 0) {
    // ② 如果是数组类型，遍历判断是不是vnode 类型的节点类型
        let children = []
        for (let i = 0; i < c.length; i++) {
            if (! (typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
                throw new TypeError('传入的数组的参数，又不是 h 函数')
            }
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
    // ③ 如果是对象类型，重新包装成数组
        return vnode(sel, data, [c], undefined, undefined)
    }

}