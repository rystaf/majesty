(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/mithril/render/vnode.js
  var require_vnode = __commonJS({
    "node_modules/mithril/render/vnode.js"(exports, module) {
      "use strict";
      function Vnode(tag, key, attrs, children, text, dom) {
        return { tag, key, attrs, children, text, dom, is: void 0, domSize: void 0, state: void 0, events: void 0, instance: void 0 };
      }
      Vnode.normalize = function(node) {
        if (Array.isArray(node)) return Vnode("[", void 0, void 0, Vnode.normalizeChildren(node), void 0, void 0);
        if (node == null || typeof node === "boolean") return null;
        if (typeof node === "object") return node;
        return Vnode("#", void 0, void 0, String(node), void 0, void 0);
      };
      Vnode.normalizeChildren = function(input) {
        var children = [];
        if (input.length) {
          var isKeyed = input[0] != null && input[0].key != null;
          for (var i = 1; i < input.length; i++) {
            if ((input[i] != null && input[i].key != null) !== isKeyed) {
              throw new TypeError(
                isKeyed && (input[i] != null || typeof input[i] === "boolean") ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole." : "In fragments, vnodes must either all have keys or none have keys."
              );
            }
          }
          for (var i = 0; i < input.length; i++) {
            children[i] = Vnode.normalize(input[i]);
          }
        }
        return children;
      };
      module.exports = Vnode;
    }
  });

  // node_modules/mithril/render/hyperscriptVnode.js
  var require_hyperscriptVnode = __commonJS({
    "node_modules/mithril/render/hyperscriptVnode.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      module.exports = function() {
        var attrs = arguments[this], start = this + 1, children;
        if (attrs == null) {
          attrs = {};
        } else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
          attrs = {};
          start = this;
        }
        if (arguments.length === start + 1) {
          children = arguments[start];
          if (!Array.isArray(children)) children = [children];
        } else {
          children = [];
          while (start < arguments.length) children.push(arguments[start++]);
        }
        return Vnode("", attrs.key, attrs, children);
      };
    }
  });

  // node_modules/mithril/util/hasOwn.js
  var require_hasOwn = __commonJS({
    "node_modules/mithril/util/hasOwn.js"(exports, module) {
      "use strict";
      module.exports = {}.hasOwnProperty;
    }
  });

  // node_modules/mithril/render/hyperscript.js
  var require_hyperscript = __commonJS({
    "node_modules/mithril/render/hyperscript.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      var hyperscriptVnode = require_hyperscriptVnode();
      var hasOwn = require_hasOwn();
      var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
      var selectorCache = /* @__PURE__ */ Object.create(null);
      function isEmpty(object) {
        for (var key in object) if (hasOwn.call(object, key)) return false;
        return true;
      }
      function compileSelector(selector) {
        var match, tag = "div", classes = [], attrs = {};
        while (match = selectorParser.exec(selector)) {
          var type = match[1], value = match[2];
          if (type === "" && value !== "") tag = value;
          else if (type === "#") attrs.id = value;
          else if (type === ".") classes.push(value);
          else if (match[3][0] === "[") {
            var attrValue = match[6];
            if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
            if (match[4] === "class") classes.push(attrValue);
            else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
          }
        }
        if (classes.length > 0) attrs.className = classes.join(" ");
        if (isEmpty(attrs)) attrs = null;
        return selectorCache[selector] = { tag, attrs };
      }
      function execSelector(state2, vnode) {
        var attrs = vnode.attrs;
        var hasClass = hasOwn.call(attrs, "class");
        var className = hasClass ? attrs.class : attrs.className;
        vnode.tag = state2.tag;
        if (state2.attrs != null) {
          attrs = Object.assign({}, state2.attrs, attrs);
          if (className != null || state2.attrs.className != null) attrs.className = className != null ? state2.attrs.className != null ? String(state2.attrs.className) + " " + String(className) : className : state2.attrs.className != null ? state2.attrs.className : null;
        } else {
          if (className != null) attrs.className = className;
        }
        if (hasClass) attrs.class = null;
        if (state2.tag === "input" && hasOwn.call(attrs, "type")) {
          attrs = Object.assign({ type: attrs.type }, attrs);
        }
        vnode.is = attrs.is;
        vnode.attrs = attrs;
        return vnode;
      }
      function hyperscript(selector) {
        if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
          throw Error("The selector must be either a string or a component.");
        }
        var vnode = hyperscriptVnode.apply(1, arguments);
        if (typeof selector === "string") {
          vnode.children = Vnode.normalizeChildren(vnode.children);
          if (selector !== "[") return execSelector(selectorCache[selector] || compileSelector(selector), vnode);
        }
        vnode.tag = selector;
        return vnode;
      }
      module.exports = hyperscript;
    }
  });

  // node_modules/mithril/render/trust.js
  var require_trust = __commonJS({
    "node_modules/mithril/render/trust.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      module.exports = function(html) {
        if (html == null) html = "";
        return Vnode("<", void 0, void 0, html, void 0, void 0);
      };
    }
  });

  // node_modules/mithril/render/fragment.js
  var require_fragment = __commonJS({
    "node_modules/mithril/render/fragment.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      var hyperscriptVnode = require_hyperscriptVnode();
      module.exports = function() {
        var vnode = hyperscriptVnode.apply(0, arguments);
        vnode.tag = "[";
        vnode.children = Vnode.normalizeChildren(vnode.children);
        return vnode;
      };
    }
  });

  // node_modules/mithril/hyperscript.js
  var require_hyperscript2 = __commonJS({
    "node_modules/mithril/hyperscript.js"(exports, module) {
      "use strict";
      var hyperscript = require_hyperscript();
      hyperscript.trust = require_trust();
      hyperscript.fragment = require_fragment();
      module.exports = hyperscript;
    }
  });

  // node_modules/mithril/render/domFor.js
  var require_domFor = __commonJS({
    "node_modules/mithril/render/domFor.js"(exports, module) {
      "use strict";
      var delayedRemoval = /* @__PURE__ */ new WeakMap();
      function* domFor(vnode) {
        var dom = vnode.dom;
        var domSize = vnode.domSize;
        var generation = delayedRemoval.get(dom);
        if (dom != null) do {
          var nextSibling = dom.nextSibling;
          if (delayedRemoval.get(dom) === generation) {
            yield dom;
            domSize--;
          }
          dom = nextSibling;
        } while (domSize);
      }
      module.exports = {
        delayedRemoval,
        domFor
      };
    }
  });

  // node_modules/mithril/render/render.js
  var require_render = __commonJS({
    "node_modules/mithril/render/render.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      var df = require_domFor();
      var delayedRemoval = df.delayedRemoval;
      var domFor = df.domFor;
      module.exports = function() {
        var nameSpace = {
          svg: "http://www.w3.org/2000/svg",
          math: "http://www.w3.org/1998/Math/MathML"
        };
        var currentRedraw;
        var currentRender;
        function getDocument(dom) {
          return dom.ownerDocument;
        }
        function getNameSpace(vnode) {
          return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag];
        }
        function checkState(vnode, original) {
          if (vnode.state !== original) throw new Error("'vnode.state' must not be modified.");
        }
        function callHook(vnode) {
          var original = vnode.state;
          try {
            return this.apply(original, arguments);
          } finally {
            checkState(vnode, original);
          }
        }
        function activeElement(dom) {
          try {
            return getDocument(dom).activeElement;
          } catch (e) {
            return null;
          }
        }
        function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
          for (var i = start; i < end; i++) {
            var vnode = vnodes[i];
            if (vnode != null) {
              createNode(parent, vnode, hooks, ns, nextSibling);
            }
          }
        }
        function createNode(parent, vnode, hooks, ns, nextSibling) {
          var tag = vnode.tag;
          if (typeof tag === "string") {
            vnode.state = {};
            if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
            switch (tag) {
              case "#":
                createText(parent, vnode, nextSibling);
                break;
              case "<":
                createHTML(parent, vnode, ns, nextSibling);
                break;
              case "[":
                createFragment(parent, vnode, hooks, ns, nextSibling);
                break;
              default:
                createElement(parent, vnode, hooks, ns, nextSibling);
            }
          } else createComponent(parent, vnode, hooks, ns, nextSibling);
        }
        function createText(parent, vnode, nextSibling) {
          vnode.dom = getDocument(parent).createTextNode(vnode.children);
          insertDOM(parent, vnode.dom, nextSibling);
        }
        var possibleParents = { caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup" };
        function createHTML(parent, vnode, ns, nextSibling) {
          var match = vnode.children.match(/^\s*?<(\w+)/im) || [];
          var temp = getDocument(parent).createElement(possibleParents[match[1]] || "div");
          if (ns === "http://www.w3.org/2000/svg") {
            temp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + vnode.children + "</svg>";
            temp = temp.firstChild;
          } else {
            temp.innerHTML = vnode.children;
          }
          vnode.dom = temp.firstChild;
          vnode.domSize = temp.childNodes.length;
          var fragment = getDocument(parent).createDocumentFragment();
          var child;
          while (child = temp.firstChild) {
            fragment.appendChild(child);
          }
          insertDOM(parent, fragment, nextSibling);
        }
        function createFragment(parent, vnode, hooks, ns, nextSibling) {
          var fragment = getDocument(parent).createDocumentFragment();
          if (vnode.children != null) {
            var children = vnode.children;
            createNodes(fragment, children, 0, children.length, hooks, null, ns);
          }
          vnode.dom = fragment.firstChild;
          vnode.domSize = fragment.childNodes.length;
          insertDOM(parent, fragment, nextSibling);
        }
        function createElement(parent, vnode, hooks, ns, nextSibling) {
          var tag = vnode.tag;
          var attrs = vnode.attrs;
          var is = vnode.is;
          ns = getNameSpace(vnode) || ns;
          var element = ns ? is ? getDocument(parent).createElementNS(ns, tag, { is }) : getDocument(parent).createElementNS(ns, tag) : is ? getDocument(parent).createElement(tag, { is }) : getDocument(parent).createElement(tag);
          vnode.dom = element;
          if (attrs != null) {
            setAttrs(vnode, attrs, ns);
          }
          insertDOM(parent, element, nextSibling);
          if (!maybeSetContentEditable(vnode)) {
            if (vnode.children != null) {
              var children = vnode.children;
              createNodes(element, children, 0, children.length, hooks, null, ns);
              if (vnode.tag === "select" && attrs != null) setLateSelectAttrs(vnode, attrs);
            }
          }
        }
        function initComponent(vnode, hooks) {
          var sentinel;
          if (typeof vnode.tag.view === "function") {
            vnode.state = Object.create(vnode.tag);
            sentinel = vnode.state.view;
            if (sentinel.$$reentrantLock$$ != null) return;
            sentinel.$$reentrantLock$$ = true;
          } else {
            vnode.state = void 0;
            sentinel = vnode.tag;
            if (sentinel.$$reentrantLock$$ != null) return;
            sentinel.$$reentrantLock$$ = true;
            vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
          }
          initLifecycle(vnode.state, vnode, hooks);
          if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
          vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
          if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
          sentinel.$$reentrantLock$$ = null;
        }
        function createComponent(parent, vnode, hooks, ns, nextSibling) {
          initComponent(vnode, hooks);
          if (vnode.instance != null) {
            createNode(parent, vnode.instance, hooks, ns, nextSibling);
            vnode.dom = vnode.instance.dom;
            vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
          } else {
            vnode.domSize = 0;
          }
        }
        function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
          if (old === vnodes || old == null && vnodes == null) return;
          else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);
          else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length);
          else {
            var isOldKeyed = old[0] != null && old[0].key != null;
            var isKeyed = vnodes[0] != null && vnodes[0].key != null;
            var start = 0, oldStart = 0;
            if (!isOldKeyed) while (oldStart < old.length && old[oldStart] == null) oldStart++;
            if (!isKeyed) while (start < vnodes.length && vnodes[start] == null) start++;
            if (isOldKeyed !== isKeyed) {
              removeNodes(parent, old, oldStart, old.length);
              createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
            } else if (!isKeyed) {
              var commonLength = old.length < vnodes.length ? old.length : vnodes.length;
              start = start < oldStart ? start : oldStart;
              for (; start < commonLength; start++) {
                o = old[start];
                v = vnodes[start];
                if (o === v || o == null && v == null) continue;
                else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling));
                else if (v == null) removeNode(parent, o);
                else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns);
              }
              if (old.length > commonLength) removeNodes(parent, old, start, old.length);
              if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
            } else {
              var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling;
              while (oldEnd >= oldStart && end >= start) {
                oe = old[oldEnd];
                ve = vnodes[end];
                if (oe.key !== ve.key) break;
                if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                if (ve.dom != null) nextSibling = ve.dom;
                oldEnd--, end--;
              }
              while (oldEnd >= oldStart && end >= start) {
                o = old[oldStart];
                v = vnodes[start];
                if (o.key !== v.key) break;
                oldStart++, start++;
                if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns);
              }
              while (oldEnd >= oldStart && end >= start) {
                if (start === end) break;
                if (o.key !== ve.key || oe.key !== v.key) break;
                topSibling = getNextSibling(old, oldStart, nextSibling);
                moveDOM(parent, oe, topSibling);
                if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns);
                if (++start <= --end) moveDOM(parent, o, nextSibling);
                if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns);
                if (ve.dom != null) nextSibling = ve.dom;
                oldStart++;
                oldEnd--;
                oe = old[oldEnd];
                ve = vnodes[end];
                o = old[oldStart];
                v = vnodes[start];
              }
              while (oldEnd >= oldStart && end >= start) {
                if (oe.key !== ve.key) break;
                if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                if (ve.dom != null) nextSibling = ve.dom;
                oldEnd--, end--;
                oe = old[oldEnd];
                ve = vnodes[end];
              }
              if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1);
              else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
              else {
                var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li = 0, i = 0, pos = 2147483647, matched = 0, map, lisIndices;
                for (i = 0; i < vnodesLength; i++) oldIndices[i] = -1;
                for (i = end; i >= start; i--) {
                  if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1);
                  ve = vnodes[i];
                  var oldIndex = map[ve.key];
                  if (oldIndex != null) {
                    pos = oldIndex < pos ? oldIndex : -1;
                    oldIndices[i - start] = oldIndex;
                    oe = old[oldIndex];
                    old[oldIndex] = null;
                    if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                    if (ve.dom != null) nextSibling = ve.dom;
                    matched++;
                  }
                }
                nextSibling = originalNextSibling;
                if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1);
                if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                else {
                  if (pos === -1) {
                    lisIndices = makeLisIndices(oldIndices);
                    li = lisIndices.length - 1;
                    for (i = end; i >= start; i--) {
                      v = vnodes[i];
                      if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                      else {
                        if (lisIndices[li] === i - start) li--;
                        else moveDOM(parent, v, nextSibling);
                      }
                      if (v.dom != null) nextSibling = vnodes[i].dom;
                    }
                  } else {
                    for (i = end; i >= start; i--) {
                      v = vnodes[i];
                      if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                      if (v.dom != null) nextSibling = vnodes[i].dom;
                    }
                  }
                }
              }
            }
          }
        }
        function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
          var oldTag = old.tag, tag = vnode.tag;
          if (oldTag === tag && old.is === vnode.is) {
            vnode.state = old.state;
            vnode.events = old.events;
            if (shouldNotUpdate(vnode, old)) return;
            if (typeof oldTag === "string") {
              if (vnode.attrs != null) {
                updateLifecycle(vnode.attrs, vnode, hooks);
              }
              switch (oldTag) {
                case "#":
                  updateText(old, vnode);
                  break;
                case "<":
                  updateHTML(parent, old, vnode, ns, nextSibling);
                  break;
                case "[":
                  updateFragment(parent, old, vnode, hooks, nextSibling, ns);
                  break;
                default:
                  updateElement(old, vnode, hooks, ns);
              }
            } else updateComponent(parent, old, vnode, hooks, nextSibling, ns);
          } else {
            removeNode(parent, old);
            createNode(parent, vnode, hooks, ns, nextSibling);
          }
        }
        function updateText(old, vnode) {
          if (old.children.toString() !== vnode.children.toString()) {
            old.dom.nodeValue = vnode.children;
          }
          vnode.dom = old.dom;
        }
        function updateHTML(parent, old, vnode, ns, nextSibling) {
          if (old.children !== vnode.children) {
            removeDOM(parent, old);
            createHTML(parent, vnode, ns, nextSibling);
          } else {
            vnode.dom = old.dom;
            vnode.domSize = old.domSize;
          }
        }
        function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
          updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns);
          var domSize = 0, children = vnode.children;
          vnode.dom = null;
          if (children != null) {
            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              if (child != null && child.dom != null) {
                if (vnode.dom == null) vnode.dom = child.dom;
                domSize += child.domSize || 1;
              }
            }
            if (domSize !== 1) vnode.domSize = domSize;
          }
        }
        function updateElement(old, vnode, hooks, ns) {
          var element = vnode.dom = old.dom;
          ns = getNameSpace(vnode) || ns;
          updateAttrs(vnode, old.attrs, vnode.attrs, ns);
          if (!maybeSetContentEditable(vnode)) {
            updateNodes(element, old.children, vnode.children, hooks, null, ns);
          }
        }
        function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
          vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
          if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
          updateLifecycle(vnode.state, vnode, hooks);
          if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
          if (vnode.instance != null) {
            if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling);
            else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns);
            vnode.dom = vnode.instance.dom;
            vnode.domSize = vnode.instance.domSize;
          } else if (old.instance != null) {
            removeNode(parent, old.instance);
            vnode.dom = void 0;
            vnode.domSize = 0;
          } else {
            vnode.dom = old.dom;
            vnode.domSize = old.domSize;
          }
        }
        function getKeyMap(vnodes, start, end) {
          var map = /* @__PURE__ */ Object.create(null);
          for (; start < end; start++) {
            var vnode = vnodes[start];
            if (vnode != null) {
              var key = vnode.key;
              if (key != null) map[key] = start;
            }
          }
          return map;
        }
        var lisTemp = [];
        function makeLisIndices(a) {
          var result = [0];
          var u = 0, v = 0, i = 0;
          var il = lisTemp.length = a.length;
          for (var i = 0; i < il; i++) lisTemp[i] = a[i];
          for (var i = 0; i < il; ++i) {
            if (a[i] === -1) continue;
            var j = result[result.length - 1];
            if (a[j] < a[i]) {
              lisTemp[i] = j;
              result.push(i);
              continue;
            }
            u = 0;
            v = result.length - 1;
            while (u < v) {
              var c = (u >>> 1) + (v >>> 1) + (u & v & 1);
              if (a[result[c]] < a[i]) {
                u = c + 1;
              } else {
                v = c;
              }
            }
            if (a[i] < a[result[u]]) {
              if (u > 0) lisTemp[i] = result[u - 1];
              result[u] = i;
            }
          }
          u = result.length;
          v = result[u - 1];
          while (u-- > 0) {
            result[u] = v;
            v = lisTemp[v];
          }
          lisTemp.length = 0;
          return result;
        }
        function getNextSibling(vnodes, i, nextSibling) {
          for (; i < vnodes.length; i++) {
            if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom;
          }
          return nextSibling;
        }
        function moveDOM(parent, vnode, nextSibling) {
          if (vnode.dom != null) {
            var target;
            if (vnode.domSize == null) {
              target = vnode.dom;
            } else {
              target = getDocument(parent).createDocumentFragment();
              for (var dom of domFor(vnode)) target.appendChild(dom);
            }
            insertDOM(parent, target, nextSibling);
          }
        }
        function insertDOM(parent, dom, nextSibling) {
          if (nextSibling != null) parent.insertBefore(dom, nextSibling);
          else parent.appendChild(dom);
        }
        function maybeSetContentEditable(vnode) {
          if (vnode.attrs == null || vnode.attrs.contenteditable == null && // attribute
          vnode.attrs.contentEditable == null) return false;
          var children = vnode.children;
          if (children != null && children.length === 1 && children[0].tag === "<") {
            var content = children[0].children;
            if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content;
          } else if (children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted.");
          return true;
        }
        function removeNodes(parent, vnodes, start, end) {
          for (var i = start; i < end; i++) {
            var vnode = vnodes[i];
            if (vnode != null) removeNode(parent, vnode);
          }
        }
        function tryBlockRemove(parent, vnode, source, counter) {
          var original = vnode.state;
          var result = callHook.call(source.onbeforeremove, vnode);
          if (result == null) return;
          var generation = currentRender;
          for (var dom of domFor(vnode)) delayedRemoval.set(dom, generation);
          counter.v++;
          Promise.resolve(result).finally(function() {
            checkState(vnode, original);
            tryResumeRemove(parent, vnode, counter);
          });
        }
        function tryResumeRemove(parent, vnode, counter) {
          if (--counter.v === 0) {
            onremove(vnode);
            removeDOM(parent, vnode);
          }
        }
        function removeNode(parent, vnode) {
          var counter = { v: 1 };
          if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") tryBlockRemove(parent, vnode, vnode.state, counter);
          if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") tryBlockRemove(parent, vnode, vnode.attrs, counter);
          tryResumeRemove(parent, vnode, counter);
        }
        function removeDOM(parent, vnode) {
          if (vnode.dom == null) return;
          if (vnode.domSize == null) {
            parent.removeChild(vnode.dom);
          } else {
            for (var dom of domFor(vnode)) parent.removeChild(dom);
          }
        }
        function onremove(vnode) {
          if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode);
          if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode);
          if (typeof vnode.tag !== "string") {
            if (vnode.instance != null) onremove(vnode.instance);
          } else {
            if (vnode.events != null) vnode.events._ = null;
            var children = vnode.children;
            if (Array.isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child != null) onremove(child);
              }
            }
          }
        }
        function setAttrs(vnode, attrs, ns) {
          for (var key in attrs) {
            setAttr(vnode, key, null, attrs[key], ns);
          }
        }
        function setAttr(vnode, key, old, value, ns) {
          if (key === "key" || value == null || isLifecycleMethod(key) || old === value && !isFormAttribute(vnode, key) && typeof value !== "object") return;
          if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value);
          if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value);
          else if (key === "style") updateStyle(vnode.dom, old, value);
          else if (hasPropertyKey(vnode, key, ns)) {
            if (key === "value") {
              if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value) return;
              if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return;
              if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return;
              if (vnode.tag === "input" && vnode.attrs.type === "file" && "" + value !== "") {
                console.error("`value` is read-only on file inputs!");
                return;
              }
            }
            if (vnode.tag === "input" && key === "type") vnode.dom.setAttribute(key, value);
            else vnode.dom[key] = value;
          } else {
            if (typeof value === "boolean") {
              if (value) vnode.dom.setAttribute(key, "");
              else vnode.dom.removeAttribute(key);
            } else vnode.dom.setAttribute(key === "className" ? "class" : key, value);
          }
        }
        function removeAttr(vnode, key, old, ns) {
          if (key === "key" || old == null || isLifecycleMethod(key)) return;
          if (key[0] === "o" && key[1] === "n") updateEvent(vnode, key, void 0);
          else if (key === "style") updateStyle(vnode.dom, old, null);
          else if (hasPropertyKey(vnode, key, ns) && key !== "className" && key !== "title" && !(key === "value" && (vnode.tag === "option" || vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement(vnode.dom))) && !(vnode.tag === "input" && key === "type")) {
            vnode.dom[key] = null;
          } else {
            var nsLastIndex = key.indexOf(":");
            if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1);
            if (old !== false) vnode.dom.removeAttribute(key === "className" ? "class" : key);
          }
        }
        function setLateSelectAttrs(vnode, attrs) {
          if ("value" in attrs) {
            if (attrs.value === null) {
              if (vnode.dom.selectedIndex !== -1) vnode.dom.value = null;
            } else {
              var normalized = "" + attrs.value;
              if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) {
                vnode.dom.value = normalized;
              }
            }
          }
          if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, void 0);
        }
        function updateAttrs(vnode, old, attrs, ns) {
          var val;
          if (old != null) {
            if (old === attrs) {
              console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major");
            }
            for (var key in old) {
              if ((val = old[key]) != null && (attrs == null || attrs[key] == null)) {
                removeAttr(vnode, key, val, ns);
              }
            }
          }
          if (attrs != null) {
            for (var key in attrs) {
              setAttr(vnode, key, old && old[key], attrs[key], ns);
            }
          }
        }
        function isFormAttribute(vnode, attr) {
          return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && (vnode.dom === activeElement(vnode.dom) || vnode.tag === "option" && vnode.dom.parentNode === activeElement(vnode.dom));
        }
        function isLifecycleMethod(attr) {
          return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
        }
        function hasPropertyKey(vnode, key, ns) {
          return ns === void 0 && // If it's a custom element, just keep it.
          (vnode.tag.indexOf("-") > -1 || vnode.is || // If it's a normal element, let's try to avoid a few browser bugs.
          key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height") && key in vnode.dom;
        }
        function updateStyle(element, old, style) {
          if (old === style) {
          } else if (style == null) {
            element.style = "";
          } else if (typeof style !== "object") {
            element.style = style;
          } else if (old == null || typeof old !== "object") {
            element.style = "";
            for (var key in style) {
              var value = style[key];
              if (value != null) {
                if (key.includes("-")) element.style.setProperty(key, String(value));
                else element.style[key] = String(value);
              }
            }
          } else {
            for (var key in old) {
              if (old[key] != null && style[key] == null) {
                if (key.includes("-")) element.style.removeProperty(key);
                else element.style[key] = "";
              }
            }
            for (var key in style) {
              var value = style[key];
              if (value != null && (value = String(value)) !== String(old[key])) {
                if (key.includes("-")) element.style.setProperty(key, value);
                else element.style[key] = value;
              }
            }
          }
        }
        function EventDict() {
          this._ = currentRedraw;
        }
        EventDict.prototype = /* @__PURE__ */ Object.create(null);
        EventDict.prototype.handleEvent = function(ev) {
          var handler = this["on" + ev.type];
          var result;
          if (typeof handler === "function") result = handler.call(ev.currentTarget, ev);
          else if (typeof handler.handleEvent === "function") handler.handleEvent(ev);
          var self = this;
          if (self._ != null) {
            if (ev.redraw !== false) (0, self._)();
            if (result != null && typeof result.then === "function") {
              Promise.resolve(result).then(function() {
                if (self._ != null && ev.redraw !== false) (0, self._)();
              });
            }
          }
          if (result === false) {
            ev.preventDefault();
            ev.stopPropagation();
          }
        };
        function updateEvent(vnode, key, value) {
          if (vnode.events != null) {
            vnode.events._ = currentRedraw;
            if (vnode.events[key] === value) return;
            if (value != null && (typeof value === "function" || typeof value === "object")) {
              if (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false);
              vnode.events[key] = value;
            } else {
              if (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false);
              vnode.events[key] = void 0;
            }
          } else if (value != null && (typeof value === "function" || typeof value === "object")) {
            vnode.events = new EventDict();
            vnode.dom.addEventListener(key.slice(2), vnode.events, false);
            vnode.events[key] = value;
          }
        }
        function initLifecycle(source, vnode, hooks) {
          if (typeof source.oninit === "function") callHook.call(source.oninit, vnode);
          if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode));
        }
        function updateLifecycle(source, vnode, hooks) {
          if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode));
        }
        function shouldNotUpdate(vnode, old) {
          do {
            if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
              var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old);
              if (force !== void 0 && !force) break;
            }
            if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
              var force = callHook.call(vnode.state.onbeforeupdate, vnode, old);
              if (force !== void 0 && !force) break;
            }
            return false;
          } while (false);
          vnode.dom = old.dom;
          vnode.domSize = old.domSize;
          vnode.instance = old.instance;
          vnode.attrs = old.attrs;
          vnode.children = old.children;
          vnode.text = old.text;
          return true;
        }
        var currentDOM;
        return function(dom, vnodes, redraw) {
          if (!dom) throw new TypeError("DOM element being rendered to does not exist.");
          if (currentDOM != null && dom.contains(currentDOM)) {
            throw new TypeError("Node is currently being rendered to and thus is locked.");
          }
          var prevRedraw = currentRedraw;
          var prevDOM = currentDOM;
          var hooks = [];
          var active = activeElement(dom);
          var namespace = dom.namespaceURI;
          currentDOM = dom;
          currentRedraw = typeof redraw === "function" ? redraw : void 0;
          currentRender = {};
          try {
            if (dom.vnodes == null) dom.textContent = "";
            vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes]);
            updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? void 0 : namespace);
            dom.vnodes = vnodes;
            if (active != null && activeElement(dom) !== active && typeof active.focus === "function") active.focus();
            for (var i = 0; i < hooks.length; i++) hooks[i]();
          } finally {
            currentRedraw = prevRedraw;
            currentDOM = prevDOM;
          }
        };
      };
    }
  });

  // node_modules/mithril/render.js
  var require_render2 = __commonJS({
    "node_modules/mithril/render.js"(exports, module) {
      "use strict";
      module.exports = require_render()(typeof window !== "undefined" ? window : null);
    }
  });

  // node_modules/mithril/api/mount-redraw.js
  var require_mount_redraw = __commonJS({
    "node_modules/mithril/api/mount-redraw.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      module.exports = function(render, schedule, console2) {
        var subscriptions = [];
        var pending = false;
        var offset = -1;
        function sync() {
          for (offset = 0; offset < subscriptions.length; offset += 2) {
            try {
              render(subscriptions[offset], Vnode(subscriptions[offset + 1]), redraw);
            } catch (e) {
              console2.error(e);
            }
          }
          offset = -1;
        }
        function redraw() {
          if (!pending) {
            pending = true;
            schedule(function() {
              pending = false;
              sync();
            });
          }
        }
        redraw.sync = sync;
        function mount(root, component) {
          if (component != null && component.view == null && typeof component !== "function") {
            throw new TypeError("m.mount expects a component, not a vnode.");
          }
          var index = subscriptions.indexOf(root);
          if (index >= 0) {
            subscriptions.splice(index, 2);
            if (index <= offset) offset -= 2;
            render(root, []);
          }
          if (component != null) {
            subscriptions.push(root, component);
            render(root, Vnode(component), redraw);
          }
        }
        return { mount, redraw };
      };
    }
  });

  // node_modules/mithril/mount-redraw.js
  var require_mount_redraw2 = __commonJS({
    "node_modules/mithril/mount-redraw.js"(exports, module) {
      "use strict";
      var render = require_render2();
      module.exports = require_mount_redraw()(render, typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null, typeof console !== "undefined" ? console : null);
    }
  });

  // node_modules/mithril/querystring/build.js
  var require_build = __commonJS({
    "node_modules/mithril/querystring/build.js"(exports, module) {
      "use strict";
      module.exports = function(object) {
        if (Object.prototype.toString.call(object) !== "[object Object]") return "";
        var args = [];
        for (var key in object) {
          destructure(key, object[key]);
        }
        return args.join("&");
        function destructure(key2, value) {
          if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
              destructure(key2 + "[" + i + "]", value[i]);
            }
          } else if (Object.prototype.toString.call(value) === "[object Object]") {
            for (var i in value) {
              destructure(key2 + "[" + i + "]", value[i]);
            }
          } else args.push(encodeURIComponent(key2) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
        }
      };
    }
  });

  // node_modules/mithril/pathname/build.js
  var require_build2 = __commonJS({
    "node_modules/mithril/pathname/build.js"(exports, module) {
      "use strict";
      var buildQueryString = require_build();
      module.exports = function(template, params) {
        if (/:([^\/\.-]+)(\.{3})?:/.test(template)) {
          throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");
        }
        if (params == null) return template;
        var queryIndex = template.indexOf("?");
        var hashIndex = template.indexOf("#");
        var queryEnd = hashIndex < 0 ? template.length : hashIndex;
        var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
        var path = template.slice(0, pathEnd);
        var query = {};
        Object.assign(query, params);
        var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m5, key, variadic) {
          delete query[key];
          if (params[key] == null) return m5;
          return variadic ? params[key] : encodeURIComponent(String(params[key]));
        });
        var newQueryIndex = resolved.indexOf("?");
        var newHashIndex = resolved.indexOf("#");
        var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
        var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
        var result = resolved.slice(0, newPathEnd);
        if (queryIndex >= 0) result += template.slice(queryIndex, queryEnd);
        if (newQueryIndex >= 0) result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd);
        var querystring = buildQueryString(query);
        if (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring;
        if (hashIndex >= 0) result += template.slice(hashIndex);
        if (newHashIndex >= 0) result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex);
        return result;
      };
    }
  });

  // node_modules/mithril/request/request.js
  var require_request = __commonJS({
    "node_modules/mithril/request/request.js"(exports, module) {
      "use strict";
      var buildPathname = require_build2();
      var hasOwn = require_hasOwn();
      module.exports = function($window, oncompletion) {
        function PromiseProxy(executor) {
          return new Promise(executor);
        }
        function makeRequest(url, args) {
          return new Promise(function(resolve, reject) {
            url = buildPathname(url, args.params);
            var method = args.method != null ? args.method.toUpperCase() : "GET";
            var body = args.body;
            var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData || body instanceof $window.URLSearchParams);
            var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");
            var xhr = new $window.XMLHttpRequest(), aborted = false, isTimeout = false;
            var original = xhr, replacedAbort;
            var abort = xhr.abort;
            xhr.abort = function() {
              aborted = true;
              abort.call(this);
            };
            xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : void 0, typeof args.password === "string" ? args.password : void 0);
            if (assumeJSON && body != null && !hasHeader(args, "content-type")) {
              xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            }
            if (typeof args.deserialize !== "function" && !hasHeader(args, "accept")) {
              xhr.setRequestHeader("Accept", "application/json, text/*");
            }
            if (args.withCredentials) xhr.withCredentials = args.withCredentials;
            if (args.timeout) xhr.timeout = args.timeout;
            xhr.responseType = responseType;
            for (var key in args.headers) {
              if (hasOwn.call(args.headers, key)) {
                xhr.setRequestHeader(key, args.headers[key]);
              }
            }
            xhr.onreadystatechange = function(ev) {
              if (aborted) return;
              if (ev.target.readyState === 4) {
                try {
                  var success = ev.target.status >= 200 && ev.target.status < 300 || ev.target.status === 304 || /^file:\/\//i.test(url);
                  var response = ev.target.response, message;
                  if (responseType === "json") {
                    if (!ev.target.responseType && typeof args.extract !== "function") {
                      try {
                        response = JSON.parse(ev.target.responseText);
                      } catch (e) {
                        response = null;
                      }
                    }
                  } else if (!responseType || responseType === "text") {
                    if (response == null) response = ev.target.responseText;
                  }
                  if (typeof args.extract === "function") {
                    response = args.extract(ev.target, args);
                    success = true;
                  } else if (typeof args.deserialize === "function") {
                    response = args.deserialize(response);
                  }
                  if (success) {
                    if (typeof args.type === "function") {
                      if (Array.isArray(response)) {
                        for (var i = 0; i < response.length; i++) {
                          response[i] = new args.type(response[i]);
                        }
                      } else response = new args.type(response);
                    }
                    resolve(response);
                  } else {
                    var completeErrorResponse = function() {
                      try {
                        message = ev.target.responseText;
                      } catch (e) {
                        message = response;
                      }
                      var error = new Error(message);
                      error.code = ev.target.status;
                      error.response = response;
                      reject(error);
                    };
                    if (xhr.status === 0) {
                      setTimeout(function() {
                        if (isTimeout) return;
                        completeErrorResponse();
                      });
                    } else completeErrorResponse();
                  }
                } catch (e) {
                  reject(e);
                }
              }
            };
            xhr.ontimeout = function(ev) {
              isTimeout = true;
              var error = new Error("Request timed out");
              error.code = ev.target.status;
              reject(error);
            };
            if (typeof args.config === "function") {
              xhr = args.config(xhr, args, url) || xhr;
              if (xhr !== original) {
                replacedAbort = xhr.abort;
                xhr.abort = function() {
                  aborted = true;
                  replacedAbort.call(this);
                };
              }
            }
            if (body == null) xhr.send();
            else if (typeof args.serialize === "function") xhr.send(args.serialize(body));
            else if (body instanceof $window.FormData || body instanceof $window.URLSearchParams) xhr.send(body);
            else xhr.send(JSON.stringify(body));
          });
        }
        PromiseProxy.prototype = Promise.prototype;
        PromiseProxy.__proto__ = Promise;
        function hasHeader(args, name) {
          for (var key in args.headers) {
            if (hasOwn.call(args.headers, key) && key.toLowerCase() === name) return true;
          }
          return false;
        }
        return {
          request: function(url, args) {
            if (typeof url !== "string") {
              args = url;
              url = url.url;
            } else if (args == null) args = {};
            var promise = makeRequest(url, args);
            if (args.background === true) return promise;
            var count = 0;
            function complete() {
              if (--count === 0 && typeof oncompletion === "function") oncompletion();
            }
            return wrap(promise);
            function wrap(promise2) {
              var then = promise2.then;
              promise2.constructor = PromiseProxy;
              promise2.then = function() {
                count++;
                var next = then.apply(promise2, arguments);
                next.then(complete, function(e) {
                  complete();
                  if (count === 0) throw e;
                });
                return wrap(next);
              };
              return promise2;
            }
          }
        };
      };
    }
  });

  // node_modules/mithril/request.js
  var require_request2 = __commonJS({
    "node_modules/mithril/request.js"(exports, module) {
      "use strict";
      var mountRedraw = require_mount_redraw2();
      module.exports = require_request()(typeof window !== "undefined" ? window : null, mountRedraw.redraw);
    }
  });

  // node_modules/mithril/querystring/parse.js
  var require_parse = __commonJS({
    "node_modules/mithril/querystring/parse.js"(exports, module) {
      "use strict";
      function decodeURIComponentSave(str) {
        try {
          return decodeURIComponent(str);
        } catch (err) {
          return str;
        }
      }
      module.exports = function(string) {
        if (string === "" || string == null) return {};
        if (string.charAt(0) === "?") string = string.slice(1);
        var entries = string.split("&"), counters = {}, data = {};
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i].split("=");
          var key = decodeURIComponentSave(entry[0]);
          var value = entry.length === 2 ? decodeURIComponentSave(entry[1]) : "";
          if (value === "true") value = true;
          else if (value === "false") value = false;
          var levels = key.split(/\]\[?|\[/);
          var cursor = data;
          if (key.indexOf("[") > -1) levels.pop();
          for (var j = 0; j < levels.length; j++) {
            var level = levels[j], nextLevel = levels[j + 1];
            var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
            if (level === "") {
              var key = levels.slice(0, j).join();
              if (counters[key] == null) {
                counters[key] = Array.isArray(cursor) ? cursor.length : 0;
              }
              level = counters[key]++;
            } else if (level === "__proto__") break;
            if (j === levels.length - 1) cursor[level] = value;
            else {
              var desc = Object.getOwnPropertyDescriptor(cursor, level);
              if (desc != null) desc = desc.value;
              if (desc == null) cursor[level] = desc = isNumber ? [] : {};
              cursor = desc;
            }
          }
        }
        return data;
      };
    }
  });

  // node_modules/mithril/pathname/parse.js
  var require_parse2 = __commonJS({
    "node_modules/mithril/pathname/parse.js"(exports, module) {
      "use strict";
      var parseQueryString = require_parse();
      module.exports = function(url) {
        var queryIndex = url.indexOf("?");
        var hashIndex = url.indexOf("#");
        var queryEnd = hashIndex < 0 ? url.length : hashIndex;
        var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
        var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/");
        if (!path) path = "/";
        else {
          if (path[0] !== "/") path = "/" + path;
        }
        return {
          path,
          params: queryIndex < 0 ? {} : parseQueryString(url.slice(queryIndex + 1, queryEnd))
        };
      };
    }
  });

  // node_modules/mithril/pathname/compileTemplate.js
  var require_compileTemplate = __commonJS({
    "node_modules/mithril/pathname/compileTemplate.js"(exports, module) {
      "use strict";
      var parsePathname = require_parse2();
      module.exports = function(template) {
        var templateData = parsePathname(template);
        var templateKeys = Object.keys(templateData.params);
        var keys = [];
        var regexp = new RegExp("^" + templateData.path.replace(
          // I escape literal text so people can use things like `:file.:ext` or
          // `:lang-:locale` in routes. This is all merged into one pass so I
          // don't also accidentally escape `-` and make it harder to detect it to
          // ban it from template parameters.
          /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
          function(m5, key, extra) {
            if (key == null) return "\\" + m5;
            keys.push({ k: key, r: extra === "..." });
            if (extra === "...") return "(.*)";
            if (extra === ".") return "([^/]+)\\.";
            return "([^/]+)" + (extra || "");
          }
        ) + "\\/?$");
        return function(data) {
          for (var i = 0; i < templateKeys.length; i++) {
            if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]]) return false;
          }
          if (!keys.length) return regexp.test(data.path);
          var values = regexp.exec(data.path);
          if (values == null) return false;
          for (var i = 0; i < keys.length; i++) {
            data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1]);
          }
          return true;
        };
      };
    }
  });

  // node_modules/mithril/util/censor.js
  var require_censor = __commonJS({
    "node_modules/mithril/util/censor.js"(exports, module) {
      "use strict";
      var hasOwn = require_hasOwn();
      var magic = new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$");
      module.exports = function(attrs, extras) {
        var result = {};
        if (extras != null) {
          for (var key in attrs) {
            if (hasOwn.call(attrs, key) && !magic.test(key) && extras.indexOf(key) < 0) {
              result[key] = attrs[key];
            }
          }
        } else {
          for (var key in attrs) {
            if (hasOwn.call(attrs, key) && !magic.test(key)) {
              result[key] = attrs[key];
            }
          }
        }
        return result;
      };
    }
  });

  // node_modules/mithril/api/router.js
  var require_router = __commonJS({
    "node_modules/mithril/api/router.js"(exports, module) {
      "use strict";
      var Vnode = require_vnode();
      var m5 = require_hyperscript();
      var buildPathname = require_build2();
      var parsePathname = require_parse2();
      var compileTemplate = require_compileTemplate();
      var censor = require_censor();
      function decodeURIComponentSave(component) {
        try {
          return decodeURIComponent(component);
        } catch (e) {
          return component;
        }
      }
      module.exports = function($window, mountRedraw) {
        var callAsync = $window == null ? null : typeof $window.setImmediate === "function" ? $window.setImmediate : $window.setTimeout;
        var p = Promise.resolve();
        var scheduled = false;
        var ready = false;
        var hasBeenResolved = false;
        var dom, compiled, fallbackRoute;
        var currentResolver, component, attrs, currentPath, lastUpdate;
        var RouterRoot = {
          onremove: function() {
            ready = hasBeenResolved = false;
            $window.removeEventListener("popstate", fireAsync, false);
          },
          view: function() {
            var vnode = Vnode(component, attrs.key, attrs);
            if (currentResolver) return currentResolver.render(vnode);
            return [vnode];
          }
        };
        var SKIP = route.SKIP = {};
        function resolveRoute() {
          scheduled = false;
          var prefix = $window.location.hash;
          if (route.prefix[0] !== "#") {
            prefix = $window.location.search + prefix;
            if (route.prefix[0] !== "?") {
              prefix = $window.location.pathname + prefix;
              if (prefix[0] !== "/") prefix = "/" + prefix;
            }
          }
          var path = prefix.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponentSave).slice(route.prefix.length);
          var data = parsePathname(path);
          Object.assign(data.params, $window.history.state);
          function reject(e) {
            console.error(e);
            route.set(fallbackRoute, null, { replace: true });
          }
          loop(0);
          function loop(i) {
            for (; i < compiled.length; i++) {
              if (compiled[i].check(data)) {
                var payload = compiled[i].component;
                var matchedRoute = compiled[i].route;
                var localComp = payload;
                var update = lastUpdate = function(comp) {
                  if (update !== lastUpdate) return;
                  if (comp === SKIP) return loop(i + 1);
                  component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
                  attrs = data.params, currentPath = path, lastUpdate = null;
                  currentResolver = payload.render ? payload : null;
                  if (hasBeenResolved) mountRedraw.redraw();
                  else {
                    hasBeenResolved = true;
                    mountRedraw.mount(dom, RouterRoot);
                  }
                };
                if (payload.view || typeof payload === "function") {
                  payload = {};
                  update(localComp);
                } else if (payload.onmatch) {
                  p.then(function() {
                    return payload.onmatch(data.params, path, matchedRoute);
                  }).then(update, path === fallbackRoute ? null : reject);
                } else update(
                  /* "div" */
                );
                return;
              }
            }
            if (path === fallbackRoute) {
              throw new Error("Could not resolve default route " + fallbackRoute + ".");
            }
            route.set(fallbackRoute, null, { replace: true });
          }
        }
        function fireAsync() {
          if (!scheduled) {
            scheduled = true;
            callAsync(resolveRoute);
          }
        }
        function route(root, defaultRoute, routes) {
          if (!root) throw new TypeError("DOM element being rendered to does not exist.");
          compiled = Object.keys(routes).map(function(route2) {
            if (route2[0] !== "/") throw new SyntaxError("Routes must start with a '/'.");
            if (/:([^\/\.-]+)(\.{3})?:/.test(route2)) {
              throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");
            }
            return {
              route: route2,
              component: routes[route2],
              check: compileTemplate(route2)
            };
          });
          fallbackRoute = defaultRoute;
          if (defaultRoute != null) {
            var defaultData = parsePathname(defaultRoute);
            if (!compiled.some(function(i) {
              return i.check(defaultData);
            })) {
              throw new ReferenceError("Default route doesn't match any known routes.");
            }
          }
          dom = root;
          $window.addEventListener("popstate", fireAsync, false);
          ready = true;
          resolveRoute();
        }
        route.set = function(path, data, options) {
          if (lastUpdate != null) {
            options = options || {};
            options.replace = true;
          }
          lastUpdate = null;
          path = buildPathname(path, data);
          if (ready) {
            fireAsync();
            var state2 = options ? options.state : null;
            var title = options ? options.title : null;
            if (options && options.replace) $window.history.replaceState(state2, title, route.prefix + path);
            else $window.history.pushState(state2, title, route.prefix + path);
          } else {
            $window.location.href = route.prefix + path;
          }
        };
        route.get = function() {
          return currentPath;
        };
        route.prefix = "#!";
        route.Link = {
          view: function(vnode) {
            var child = m5(
              vnode.attrs.selector || "a",
              censor(vnode.attrs, ["options", "params", "selector", "onclick"]),
              vnode.children
            );
            var options, onclick, href;
            if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
              child.attrs.href = null;
              child.attrs["aria-disabled"] = "true";
            } else {
              options = vnode.attrs.options;
              onclick = vnode.attrs.onclick;
              href = buildPathname(child.attrs.href, vnode.attrs.params);
              child.attrs.href = route.prefix + href;
              child.attrs.onclick = function(e) {
                var result;
                if (typeof onclick === "function") {
                  result = onclick.call(e.currentTarget, e);
                } else if (onclick == null || typeof onclick !== "object") {
                } else if (typeof onclick.handleEvent === "function") {
                  onclick.handleEvent(e);
                }
                if (
                  // Skip if `onclick` prevented default
                  result !== false && !e.defaultPrevented && // Ignore everything but left clicks
                  (e.button === 0 || e.which === 0 || e.which === 1) && // Let the browser handle `target=_blank`, etc.
                  (!e.currentTarget.target || e.currentTarget.target === "_self") && // No modifier keys
                  !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey
                ) {
                  e.preventDefault();
                  e.redraw = false;
                  route.set(href, null, options);
                }
              };
            }
            return child;
          }
        };
        route.param = function(key) {
          return attrs && key != null ? attrs[key] : attrs;
        };
        return route;
      };
    }
  });

  // node_modules/mithril/route.js
  var require_route = __commonJS({
    "node_modules/mithril/route.js"(exports, module) {
      "use strict";
      var mountRedraw = require_mount_redraw2();
      module.exports = require_router()(typeof window !== "undefined" ? window : null, mountRedraw);
    }
  });

  // node_modules/mithril/index.js
  var require_mithril = __commonJS({
    "node_modules/mithril/index.js"(exports, module) {
      "use strict";
      var hyperscript = require_hyperscript2();
      var request = require_request2();
      var mountRedraw = require_mount_redraw2();
      var domFor = require_domFor();
      var m5 = function m6() {
        return hyperscript.apply(this, arguments);
      };
      m5.m = hyperscript;
      m5.trust = hyperscript.trust;
      m5.fragment = hyperscript.fragment;
      m5.Fragment = "[";
      m5.mount = mountRedraw.mount;
      m5.route = require_route();
      m5.render = require_render2();
      m5.redraw = mountRedraw.redraw;
      m5.request = request.request;
      m5.parseQueryString = require_parse();
      m5.buildQueryString = require_build();
      m5.parsePathname = require_parse2();
      m5.buildPathname = require_build2();
      m5.vnode = require_vnode();
      m5.censor = require_censor();
      m5.domFor = domFor.domFor;
      module.exports = m5;
    }
  });

  // client/app.js
  var import_mithril4 = __toESM(require_mithril());

  // client/components/Layout.jsx
  var import_mithril2 = __toESM(require_mithril());

  // client/components/Board.jsx
  var import_mithril = __toESM(require_mithril());
  var Tile = class {
    view({ attrs: { state: state2, tile } }) {
      return /* @__PURE__ */ (0, import_mithril.default)(
        "div",
        {
          class: [
            "flex-1 flex flex-col bg-orange-500 overflow-hidden relative border-2 rounded-lg",
            tile.OnFire || "cursor-pointer",
            tile.Position == state2.Dragon.Position ? state2.Dragon.OnFire || !state2.Dragon.Hidden && (state2.Knights.find((k) => k.Position == tile.Position) || tile.Arrows.length) ? "border-red-500" : "border-green-500" : !tile.Arrows.length && state2.Archers.find((a) => a.Position == tile.Position && a.AP) ? "border-yellow-300" : "border-lime-950"
            // Dragon
          ].join(" "),
          onclick: (e) => {
            state2.TileClick(tile.Position);
          }
        },
        /* @__PURE__ */ (0, import_mithril.default)("div", { class: [
          "absolute h-full w-full bg-stretch tile bg-center bg-contain z-0",
          tile.Terrain,
          tile.OnFire && "onfire"
        ].join(" ") }),
        state2.Dragon.Position == tile.Position && tile.Terrain == "mountain" && state2.Dragon.Hidden && /* @__PURE__ */ (0, import_mithril.default)("div", { class: "absolute h-full w-full" }, /* @__PURE__ */ (0, import_mithril.default)(
          "div",
          {
            class: "absolute h-2/4 w-full p-2 right-3"
          },
          /* @__PURE__ */ (0, import_mithril.default)("div", { class: "dragon h-full w-full bg-contain bg-center bg-no-repeat" })
        ), /* @__PURE__ */ (0, import_mithril.default)("div", { class: [tile.OnFire && "onfire", "bg-stretch absolute h-full w-full bg-contain z-20 hide box-border"].join(" ") })),
        tile.Arrows.map(
          (vertical) => /* @__PURE__ */ (0, import_mithril.default)("div", { class: [
            "bg-yellow-300 absolute z-40",
            vertical ? "w-[4px] h-full left-1/2" : "h-[4px] top-1/2 w-full"
          ].join(" ") })
        ),
        /* @__PURE__ */ (0, import_mithril.default)("div", { class: "z-20 h-full flex flex-col" }, /* @__PURE__ */ (0, import_mithril.default)("div", { class: "flex-1 flex" }, /* @__PURE__ */ (0, import_mithril.default)("div", { class: "flex-1 flex flex-col relative" }, state2.Peasants.filter((p) => p.Position == tile.Position).map((p) => /* @__PURE__ */ (0, import_mithril.default)("div", { class: "flex-1", onclick: (e) => {
          if (p.Position == state2.Dragon.Position) {
            state2.Dragon.Hidden = false;
            p.Chomp();
            return false;
          }
        } }, /* @__PURE__ */ (0, import_mithril.default)("div", { class: ["h-full z-10 peasant bg-contain bg-center bg-no-repeat bg-top", p.OnFire ? "onfire" : ""].join(" ") })))), /* @__PURE__ */ (0, import_mithril.default)("div", { class: "flex-1 flex flex-col" }, /* @__PURE__ */ (0, import_mithril.default)("div", { class: ["flex-1 w-full flex flex-col", tile.Dragon && state2.Dragon.OnFire ? "onfire" : ""].join(" ") }, state2.Dragon.Position == tile.Position && /* @__PURE__ */ (0, import_mithril.default)(
          "div",
          {
            class: [
              "flex-1 dragon bg-contain bg-center bg-no-repeat",
              state2.Dragon.Hidden ? "hidden" : "",
              state2.Dragon.OnFire ? state2.Dragon.AP ? "onfire" : "onfire rotate-90" : ""
            ].join(" "),
            onclick: () => {
              return state2.Use();
            }
          }
        )), /* @__PURE__ */ (0, import_mithril.default)("div", { class: "flex-1" }, state2.Cottages.filter((x) => x.Position == tile.Position).map(
          (c) => /* @__PURE__ */ (0, import_mithril.default)("div", { class: ["h-full thecottage bg-contain bg-center bg-no-repeat", c.OnFire ? "onfire" : ""].join(" ") })
        ))), /* @__PURE__ */ (0, import_mithril.default)("div", { class: "flex-1 flex flex-col justify-center" }, state2.Knights.filter((k) => k.Position == tile.Position).map((k) => /* @__PURE__ */ (0, import_mithril.default)("div", { class: "flex-1" }, /* @__PURE__ */ (0, import_mithril.default)("div", { class: ["h-full w-full bg-center bg-contain bg-no-repeat knight", k.Hammer ? "hammer" : ""].join(" ") }))), state2.Archers.filter((a) => a.Position == tile.Position).map((a) => /* @__PURE__ */ (0, import_mithril.default)("div", { class: "flex-1" }, /* @__PURE__ */ (0, import_mithril.default)("div", { class: ["h-full w-full bg-center bg-contain bg-no-repeat archer", a.Vertical ? "vertical" : ""].join(" ") }))))))
      );
    }
  };
  var Board = class {
    view({ attrs: { state: state2 } }) {
      let columns = 5;
      let rows = Math.ceil(state2.Tiles.length / columns);
      return /* @__PURE__ */ (0, import_mithril.default)("div", { class: "h-full relative flex flex-col bg-lime-950" }, [...Array(rows).keys()].map((row) => state2.Tiles.map((t, i) => ({ ...t, Position: i })).slice(row * columns, (row + 1) * columns)).map((row) => /* @__PURE__ */ (0, import_mithril.default)("div", { class: "flex flex-1" }, row.map((tile) => /* @__PURE__ */ (0, import_mithril.default)(Tile, { state: state2, tile })))));
    }
  };

  // client/components/Layout.jsx
  var Status = class {
    view({ attrs: { state: state2 } }) {
      const peasantCount = state2.Peasants.filter((p) => p.Position >= 0).length;
      const cottageCount = state2.Cottages.filter((c) => !c.OnFire).length;
      const tileCount = state2.Tiles.filter((t) => !t.OnFire).length;
      return /* @__PURE__ */ (0, import_mithril2.default)("div", null, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "md:flex" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "flex-1 flex font-mono text-xl flex items-center justify-center text-white" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "flex items-center" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "tree h-8 w-8 border-2 rounded border-gray-600 bg-[length:200%_200%]" }), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "ml-2" }, /* @__PURE__ */ (0, import_mithril2.default)("span", { class: "text-2xl mx-1 font-bold " + (tileCount || "invisible") }, tileCount), /* @__PURE__ */ (0, import_mithril2.default)("span", { class: "text-xs hidden" }, "/", state2.Tiles.length))), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "mx-2" }), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "flex items-center" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "thecottage bg-lime-700 h-8 w-8 border-2 rounded border-gray-600 bg-center bg-contain bg-no-repeat" }), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "ml-2" }, /* @__PURE__ */ (0, import_mithril2.default)("span", { class: "text-2xl mx-1 font-bold " + (cottageCount || "invisible") }, cottageCount), /* @__PURE__ */ (0, import_mithril2.default)("span", { class: "text-xs hidden" }, "/", state2.Cottages.length))), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "mx-2" }), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "flex items-center" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "peasant bg-lime-600 h-8 w-8 border-2 rounded border-gray-600 bg-center bg-contain bg-no-repeat" }), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "ml-2" }, /* @__PURE__ */ (0, import_mithril2.default)("span", { class: "text-2xl mx-1 font-bold " + (peasantCount || "invisible") }, peasantCount), /* @__PURE__ */ (0, import_mithril2.default)("span", { class: "text-xs hidden" }, "/", state2.Peasants.length)))), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "flex flex-1 h-8 justify-center my-1" }, state2.Peasants.map((x) => x.Position == -2 ? 99 : x.Position).sort((a, b) => a - b).map((p) => /* @__PURE__ */ (0, import_mithril2.default)("div", { class: [
        "w-8 h-full mx-0.5 border-2 rounded border-gray-700",
        p == -1 ? "bg-red-500" : "",
        p == 99 ? "border-0 bg-contain bg-gray-700 rounded-full bg-center bg-no-repeat skull" : ""
      ].join(" ") }))), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "flex-1 flex justify-around" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "text-lg mx-2 flex items-center text-red-500 font-mono justify-center font-semibold text-center" }, "LEVEL ", state2.Level), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "text-lg mx-2 flex items-center text-red-500 font-mono justify-center font-semibold text-center" }, "MOVES ", state2.Moves), /* @__PURE__ */ (0, import_mithril2.default)("div", { onclick: () => state2.Reset(), class: "flex items-center justify-center" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "bg-orange-700 border-gray-600 hover:border-gray-300 cursor-pointer border-2 px-2 py-1 rounded text-xl font-bold" }, "Reset")))));
    }
  };
  var Nice = class {
    view({ attrs: { state: state2 } }) {
      const end = state2.End();
      return /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "z-50 absolute h-full w-full flex justify-center items-center " + (end || " hidden") }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: (end == 1 ? "nice" : "dead") + " relative h-72 w-96 bg-black border-4 border-slate-300 rounded-lg bg-no-repeat bg-contain flex justify-end items-center relative bottom-5" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "absolute z-20 top-0 right-32 p-l-4 smoke w-16 h-28 bg-no-repeat bg-contain " + (end == 2 && "invisible") }), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "absolute z-20 top-8 right-10 p-l-4 over w-72 h-28 bg-no-repeat bg-contain bg-center " + (end == 1 && "invisible") }), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "flex h-full flex-col text-center mr-4" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "flex flex-col grow " + (end == 2 && "invisible") }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "grow" }), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "mb-6" }, "nice work!"), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "text-2xl font-bold text-red-500 text-shadow" }, /* @__PURE__ */ (0, import_mithril2.default)("div", null, "LEVEL"), /* @__PURE__ */ (0, import_mithril2.default)("div", null, "BEATEN!"))), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "grow flex flex-col justify-end" }, /* @__PURE__ */ (0, import_mithril2.default)(
        "div",
        {
          class: "bg-[#C2C291] rounded-lg mb-2 hover:text-red-500 leading-tight text-shadow hover:font-bold cursor-pointer py-2",
          onclick: (e) => {
            e.target.innerHTML = "COPIED";
            let tiles = [0, 1, 2, 3, 4].map((r) => state2.Tiles.map((x, i) => ({ ...x, Position: i })).slice(r * 5, r * 5 + 5).map((x) => {
              if (state2.Dragon.Position == x.Position) {
                return "\u{1F7E5}";
              }
              let c = state2.Cottages.find((c2) => c2.Position == x.Position);
              if (c) {
                return c.OnFire ? "\u{1F7E7}" : "\u{1F7E8}";
              }
              return x.OnFire ? "\u2B1B\uFE0F" : "\u{1F7E9}";
            }).join("")).join("\n");
            let text = `I made it to level ${state2.Level} in ${state2.Moves} moves!
${tiles}
${window.location.href}`;
            if (navigator?.share) {
              navigator.share({ text });
            } else if (navigator?.clipboard) {
              navigator.clipboard.writeText(text);
            }
            setTimeout(() => e.target.innerHTML = "SHARE", 1e3);
          }
        },
        "SHARE"
      ), end == 1 ? /* @__PURE__ */ (0, import_mithril2.default)(
        "div",
        {
          class: "bg-[#C2C291] rounded-lg mb-2 py-2 hover:text-red-500 leading-tight text-shadow hover:font-bold cursor-pointer",
          onclick: () => end == 1 ? state2.Next() : state2.Reset()
        },
        "NEXT"
      ) : /* @__PURE__ */ (0, import_mithril2.default)(
        "div",
        {
          class: "bg-[#C2C291] rounded-lg mb-2 hover:text-red-500 leading-tight text-shadow hover:font-bold cursor-pointer",
          onclick: () => end == 1 ? state2.Next() : state2.Reset()
        },
        /* @__PURE__ */ (0, import_mithril2.default)("div", null, "CHALLENGE", /* @__PURE__ */ (0, import_mithril2.default)("br", null), "AGAIN")
      )))));
    }
  };
  var Layout = class {
    oncreate() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    view({ attrs: { state: state2 } }) {
      return /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "h-screen h-screen-inner" }, /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "h-full flex flex-col max-w-5xl mx-auto relative" }, /* @__PURE__ */ (0, import_mithril2.default)(Status, { state: state2 }), /* @__PURE__ */ (0, import_mithril2.default)("div", { class: "h-full" }, /* @__PURE__ */ (0, import_mithril2.default)(Nice, { state: state2 }), /* @__PURE__ */ (0, import_mithril2.default)(Board, { state: state2 }))));
    }
  };

  // client/state/index.js
  var import_mithril3 = __toESM(require_mithril());

  // client/state/constants.js
  var HEART = -1;
  var VOID = -2;

  // client/state/burnable.js
  var Burnable = class {
    constructor(init = {}) {
      Object.assign(this, init, {
        OnFire: false
      });
    }
    Burn() {
      this.OnFire = true;
    }
    Repair() {
      this.OnFire = false;
    }
  };

  // client/state/entity.js
  var Entity = class extends Burnable {
    constructor(init = {}) {
      super(init);
      Object.assign(this, init, {
        Position: 0,
        AP: 0
      });
    }
    Move(dest, AP = 0) {
      let options;
      if (dest == void 0) {
        options = Object.entries(this.GetNeighbors()).filter((x) => !isNaN(x[1])).map((x) => x[0]);
        let r = Math.random();
        dest = options.filter((x) => x != this.LastMove).find((x, i, s) => Math.floor(s.length * r) == i);
      }
      if (dest == void 0) {
        return;
      }
      let v = ["North", "South"];
      let h = ["East", "West"];
      this.LastMove = v.includes(dest) ? v[1 - v.indexOf(dest)] : h[1 - h.indexOf(dest)];
      this.Position = isNaN(dest) ? this.Position > -1 ? this.GetNeighbors()[dest] : this.Position : dest;
      this.AP -= this.AP ? 1 : 0;
      this.AP += AP;
      return this.Position;
    }
    Burn(AP = 4) {
      this.OnFire = true;
      this.AP = AP;
      this.CanDiagonal = false;
      return this.AP;
    }
    Chomp() {
      this.Position = HEART;
      this.OnFire = false;
      this.AP = 0;
      return true;
    }
    Void() {
      this.OnFire = false;
      this.Position = VOID;
      this.AP = 0;
      return false;
    }
    GetNeighbors() {
      let wrap = this.CanWrap;
      let i = this.Position;
      let n = {
        North: (i + 20) % 25,
        East: Math.floor(i / 5) * 5 + (i + 1) % 5,
        West: Math.floor(i / 5) * 5 + (i + 4) % 5,
        South: (i + 5) % 25
      };
      if (this.CanDiagonal) {
        Object.assign(n, {
          NE: Math.floor(n.North / 5) * 5 + (n.North + 1) % 5,
          NW: Math.floor(n.North / 5) * 5 + (n.North + 4) % 5,
          SE: Math.floor(n.South / 5) * 5 + (i + 1) % 5,
          SW: Math.floor(n.South / 5) * 5 + (i + 4) % 5
        });
      }
      return {
        North: wrap || n.North < i ? n.North : void 0,
        East: wrap || n.East > i ? n.East : void 0,
        South: wrap || n.South > i ? n.South : void 0,
        West: wrap || n.West < i ? n.West : void 0,
        NE: wrap || n.NE < i && n.NE % 5 > i % 5 ? n.NE : void 0,
        NW: wrap || n.NW < i && n.NW % 5 < i % 5 ? n.NW : void 0,
        SE: wrap || n.SE > i && n.SE % 5 > i % 5 ? n.SE : void 0,
        SW: wrap || n.SW > i && n.SW % 5 < i % 5 ? n.SW : void 0
      };
    }
  };
  var Peasant = class extends Entity {
    constructor(init) {
      super(init);
      Object.assign(this, {
        CanDiagonal: true
      }, init);
    }
    Move(dest, AP) {
      if (this.AP == 0 && !AP && this.OnFire) return this.Void();
      return super.Move(dest, AP);
    }
  };
  var Knight = class extends Entity {
    constructor(init) {
      super(init);
      Object.assign(this, init, {
        Hammer: false
      });
    }
  };
  var Archer = class extends Entity {
    constructor(init) {
      super(init);
      Object.assign(this, init, {
        Vertical: false
      });
    }
    Move(dest, AP) {
      let options = Object.entries(this.GetNeighbors()).filter((x) => !isNaN(x[1])).map((x) => x[0]);
      let r = Math.random();
      dest = options.filter((x) => x != this.LastMove).find((x, i, s) => Math.floor(s.length * r) == i);
      this.Vertical = ["North", "South"].includes(dest);
      return super.Move(dest, AP);
    }
  };
  var Dragon = class extends Entity {
    constructor(init) {
      super(init);
      Object.assign(this, {
        Hidden: false
      }, init);
    }
    Hide() {
      this.Hidden = true;
    }
  };
  var Cottage = class extends Entity {
    constructor(init) {
      super(init);
      Object.assign(this, init, {
        CanDiagonal: true
      });
    }
  };
  var Tile2 = class extends Entity {
    constructor(init) {
      super(init);
      Object.assign(this, {
        Arrows: []
      }, init);
    }
  };

  // client/state/index.js
  function weighted_random(options) {
    var i;
    var weights = [options[0].weight];
    for (i = 1; i < options.length; i++)
      weights[i] = options[i].weight + weights[i - 1];
    var random = Math.random() * weights[weights.length - 1];
    for (i = 0; i < weights.length; i++)
      if (weights[i] > random)
        break;
    return options[i].item;
  }
  var Game = class {
    constructor(state2 = {}, ...init) {
      this.Init(state2, ...init);
    }
    Init(state2 = {}, ...init) {
      this.Moves = this.Moves || 0;
      this.Level = state2.Level || this.Level || 1;
      let tiles, dragonPosition, peasants, cottages, knights, archers;
      [tiles = [], dragonPosition, peasants = [], cottages = [], knights = [], archers = []] = init;
      Object.assign(this, {
        init: state2.init || init,
        Tiles: [...tiles.map((Terrain) => ({ Terrain })), ...state2.Tiles ?? []].map((t) => new Tile2(t)),
        Dragon: new Dragon({ Position: dragonPosition, ...state2?.Dragon ?? {} }),
        Peasants: [...peasants.map((Position) => ({ Position })), ...state2.Peasants ?? []].map((p) => new Peasant(p)),
        Cottages: [...cottages.map((Position) => ({ Position })), ...state2.Cottages ?? []].map((c) => new Cottage(c)),
        Knights: [...knights.map((Position) => ({ Position })), ...state2.Knights ?? []].map((k) => new Knight(k)),
        Archers: [...archers.map((Position) => ({ Position })), ...state2.Archers ?? []].map((a) => new Archer(a))
      });
    }
    Reset(state2 = { Level: 1 }, ...init) {
      this.Init({ ...state2 }, ...init.length ? init : this.init);
      this.Moves = 0;
    }
    Next() {
      let terrain = [...Array(25).keys()].map((x) => weighted_random([
        ["stump", 60],
        ["tree", 60],
        ["plain", 60],
        ["forest", 60],
        ["rock", 40],
        ["flowers", 60],
        ["mountain", 30],
        ["tunnel", 5],
        ["lake", 1]
      ].map(([item, weight]) => ({ item, weight: weight || 1 }))));
      var rn = [12];
      while (rn.length < 10) {
        var r = Math.floor(Math.random() * 25);
        if (rn.indexOf(r) === -1) rn.push(r);
      }
      this.Level += 1;
      this.Tiles = terrain.map((t) => new Tile2({ Terrain: t }));
      this.Dragon = new Dragon({ Position: rn[0] });
      this.Peasants = [...rn.slice(1, 4), -1, -1, -1, -1].map((p) => new Peasant({ Position: p }));
      this.Cottages = rn.slice(4, 7).map((x) => new Cottage({ Position: x }));
      this.Knights = rn.slice(7, 9).map((k) => new Knight({ Position: k }));
      this.Archers = [new Archer({ Position: rn[9] })];
    }
    MoveEnemies() {
      this.Knights.forEach((k) => Math.round(Math.random()) && k.Move());
      this.Archers.forEach((a) => {
        a.AP = 0;
        Math.round(Math.random()) && a.Move(void 0, !Math.round(Math.random() * 2) * 1);
      });
      this.Cottages.filter((c) => c.OnFire && this.Knights.find((k) => k.Position == c.Position)).forEach((c) => c.Repair());
      this.Tiles.forEach((t, i) => {
        t.Arrows = this.Archers.filter((a) => a.AP && a.Position != i && (a.Vertical && a.Position % 5 == i % 5 || !a.Vertical && Math.floor(a.Position / 5) == Math.floor(i / 5))).map((a) => a.Vertical);
      });
    }
    SpawnPeasants() {
      let spawn = this.Cottages.filter((x) => !x.OnFire).map((x) => x.Position).filter((i) => !this.Peasants.find((p) => p.Position == i));
      if (Math.floor(Math.random() * 10) != 5) {
        spawn = [];
      }
      this.Peasants.forEach((p) => {
        if (p.Position == HEART && spawn.length && this.Peasants.filter((p2) => p2.Position > -1).length < 4) {
          p.Move(spawn.pop());
        }
      });
    }
    MovePeasant(p) {
      if (p.Position < 0) return;
      if (p.OnFire) {
        p.Move();
        if (p.Position < 0) return;
        if (this.Tiles[p.Position].Terrain == "lake") {
          p.OnFire = false;
          p.AP = 0;
          return;
        }
        this.Tiles[p.Position].Burn();
      } else if (Math.random() * 5 > 4) {
        p.CanDiagonal = true;
        p.Move();
        if (Math.round(Math.random())) this.Tiles[p.Position].Repair();
      }
      if (p.Ap < 0) return;
      this.Tiles.filter((t, i) => p.Position == i).forEach((t) => t.OnFire == p.OnFire);
    }
    CheckDamage() {
      let dmg = this.Knights.filter((k) => k.Position == this.Dragon.Position).length;
      dmg += this.Tiles[this.Dragon.Position].Arrows.length;
      this.Peasants.forEach((p) => {
        this.MovePeasant(p);
        if (p.Position == HEART && dmg) {
          dmg--;
          p.Void();
        }
      });
      this.Peasants.filter((p) => !p.OnFire && this.Peasants.find((x) => x.OnFire && x.Position == p.Position)).forEach((p) => {
        p.Burn();
      });
      if (dmg && this.Peasants.every((x) => x.Position != HEART)) {
        this.Dragon.Burn(20);
        this.Rage();
      }
    }
    Move(dest) {
      this.Dragon.Hidden = false;
      this.Moves += 1;
      if (this.Dragon.OnFire) return;
      if (Object.entries(this.Dragon.GetNeighbors()).find((d) => d[0] == dest && d[1] == void 0)) return;
      this.Dragon.Move(dest);
      this.MoveEnemies();
      this.SpawnPeasants();
      this.CheckDamage();
      this.Burn();
      localStorage.setItem("state", JSON.stringify(this));
    }
    Rage(AP) {
      this.Dragon.Move();
      this.Burn();
      import_mithril3.default.redraw();
      localStorage.setItem("state", JSON.stringify(this));
      if (this.Dragon.AP > 0)
        setTimeout(() => this.Rage(), 300);
    }
    Use() {
      if (!this.Dragon.Hidden && this.Peasants.find((p) => p.Position == this.Dragon.Position)?.Chomp()) {
        return false;
      }
      if (this.Tiles[this.Dragon.Position].Terrain == "mountain") {
        this.Dragon.Hidden = true;
        this.MoveEnemies();
        this.SpawnPeasants();
        this.Peasants.forEach((p) => this.MovePeasant(p));
        return false;
      }
      return this.Burrow();
    }
    TileClick(Position) {
      if (this.Dragon.Position == Position) {
        if (!this.Dragon.Hidden) {
          this.Burn();
          return;
        }
        this.Use();
      }
      if (Object.values(this.Dragon.GetNeighbors(false)).includes(Position) || [this.Dragon.Position, Position].map((x) => this.Tiles[x].Terrain).every((x) => x == "tunnel")) this.Move(Position);
      if (Position != this.Dragon.Position && Position % 5 == this.Dragon.Position % 5) {
        if (Position > this.Dragon.Position) {
          this.Move("South");
        } else {
          this.Move("North");
        }
      }
      localStorage.setItem("state", JSON.stringify(this));
      this.CheckDamage();
    }
    End() {
      if ([...this.Cottages, ...this.Tiles].every((x) => x.OnFire) && this.Peasants.every((x) => x.Position < 0)) {
        return 1;
      } else if (this.Dragon.OnFire && this.Dragon?.AP == 0 && this.Peasants.every((p) => p.Position != HEART)) {
        return 2;
      }
    }
    Burrow() {
      const entrance = this.Tiles.findIndex((t, i) => this.Dragon.Position == i && t.Terrain == "tunnel");
      if (entrance < 0) {
        return true;
      }
      const exit = this.Tiles.findIndex((t, i) => t.Terrain == "tunnel" && i != entrance);
      if (exit < 0) {
        return true;
      }
      this.Move(exit);
      return false;
    }
    Burn() {
      if (this.Dragon.Hidden) {
        this.Dragon.Hidden = false;
        return this.CheckDamage();
      }
      this.Peasants.filter((p) => p.Position == this.Dragon.Position).forEach((p) => this.Dragon.OnFire ? p.Move(VOID) : p.Burn());
      this.Knights.filter((k) => k.Position == this.Dragon.Position && this.Dragon.OnFire).forEach((k) => k.Void());
      let t = this.Tiles[this.Dragon.Position];
      if (t.Terrain != "lake" || Object.values(this.Dragon.GetNeighbors(false)).every((x) => isNaN(x) || this.Tiles[x].OnFire)) {
        t.Burn();
      }
      this.Cottages.find((c) => {
        if (c.Position == this.Dragon.Position) {
        }
        return c.Position == this.Dragon.Position && (this.Dragon.OnFire || this.Tiles[c.Position].OnFire && Object.values(c.GetNeighbors(false)).every((x) => isNaN(x) || this.Tiles[x].OnFire));
      })?.Burn();
    }
  };

  // client/ws.js
  var WSConnection = class {
    constructor(config) {
      if (window.location.hash != "#dev") return;
      this.t = 800;
      this.port = config?.port || window.location.port;
      this.onmessage = config?.onmessage;
      this.start();
    }
    start() {
      var prot = location.protocol == "https:" ? "wss://" : "ws://";
      this.ws = new WebSocket([
        prot,
        document.location.hostname,
        ":",
        this.port
        //document.location.pathname,
        //document.location.search,
      ].join(""));
      this.ws.onopen = function() {
        this.t = 800;
      };
      this.ws.onmessage = this.onmessage;
      this.ws.onclose = () => setTimeout(() => {
        this.start();
        if (this.t < 10 * 1e3) this.t += 200;
      }, this.t);
    }
  };

  // client/app.js
  var localState = window.location.hash == "#dev" && JSON.parse(localStorage.getItem("state"));
  var state = localState ? new Game(localState) : new Game(
    {},
    [
      "stump",
      "tree",
      "stump",
      "tunnel",
      "forest",
      "rock",
      "tree",
      "tree",
      "flowers",
      "mountain",
      "tree",
      "forest",
      "rock",
      "tree",
      "flowers",
      "mountain",
      "rock",
      "tree",
      "stump",
      "tree",
      "flowers",
      "tunnel",
      "tree",
      "forest",
      "lake"
    ],
    12,
    // Dragon
    [0, 8, 22, -1, -1, -1, -1],
    // Peasants
    [0, 8, 22],
    // Cottages
    [1, 19],
    // Knights
    [10]
    // Archers
  );
  new WSConnection({
    port: 8083,
    onmessage: (msg) => window.location.reload()
  });
  import_mithril4.default.mount(document.getElementById("app"), {
    view: () => (0, import_mithril4.default)(Layout, { state })
  });
  var press = (e) => {
    switch (e.keyCode) {
      case 8:
        break;
      case 40:
        e.preventDefault();
        return state.Move("South");
        break;
      case 38:
        e.preventDefault();
        return state.Move("North");
        break;
      case 37:
        e.preventDefault();
        return state.Move("West");
        break;
      case 39:
        e.preventDefault();
        return state.Move("East");
        break;
      case 90:
        state.Burn();
        break;
      case 88:
        return state.Use();
        break;
      default:
    }
  };
  document.onkeydown = function(e) {
    if (state.Dragon.OnFire || state.End()) return;
    e = e || window.event;
    press(e);
    import_mithril4.default.redraw();
  };
})();
//# sourceMappingURL=app.js.map
