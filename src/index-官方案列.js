
import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom";

const patch = init([  
    // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule, // attaches event listeners
]);

const container = document.getElementById("container");

const vnode = h("div#container.two.classes", {
    on: {
        click: function (event) {

            console.log("🚀 ~ file: index.js 这个DIV 被点击了", event)
        }
    }
}, [

    h("span", { style: { fontWeight: "bold" } }, "This is bold"),
    " and this is just normal text",
    h("a", { props: { href: "/foo" } }, "I'll take you places!"),
]);
console.log("🚀 ~ file: index.js ~ line 29 ~ vnode", vnode)
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);

const newVnode = h(
    "div#container.two.classes",
    {
        on: {
            click: function (event) {
                console.log("🚀 ~ file: index.js ~ line 38 ~ event", event)

            }
        }
    },
    [
        h(
            "span",
            { style: { fontWeight: "normal", fontStyle: "italic" } },
            "This is now italic type"
        ),
        " and this is still just normal text",
        h("a", { props: { href: "/bar" } }, "I'll take you places!"),
    ]
);
// Second `patch` invocation
// patch(vnode, newVnode); //