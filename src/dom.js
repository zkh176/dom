window.dom = {
    create(string) {
      const container = document.createElement('template')
      container.innerHTML = string.trim();//trim的功能就是把文本两边的空格去掉，让他不会变成文本格式。
      return container.content.firstChild;
    },
    after(node, node2){
      node.parentNode.insertBefore(node2,node.nextSibling);
    },
    before(node,node2){
      node.parentNode.insertBefore(node2,node);  
    },
    append(parent,node){
      parent.appendChild(node);
    },
    wrap(node,parent){
      dom.before(node,parent);
      dom.append(parent,node);
    },
    remove(node){
      node.parentNode.removeChild(node);
      return node;
    },
    empty(node){
      const{childNodes} = node;
      const array = [];
      let x = node.firstChild;
      while(x){
        array.push(dom.remove(node.firstChild))
        x = node.firstChild
        }
        return array
      },
    attr(node,name,value){ //重载
      if(arguments.length ===3){
       return node.setAttribute(name,value)
    }else if(arguments.length ===2){
      return node.getAttribute(name)
      }
    },
    text(node,string){//适配写法
      if(arguments.length ===2){
        if('innerText' in node){
          node.innerHTML = string
        }else{
          node.textContent = string
        }
      }else if (arguments.length === 1){
        if('innerText' in node){
          return node.innerText
        }else{
          return node.textContent
        }
      }
    //   node.innerText = string//有一些非常旧的IE只支持这个写法。
    //   node.textContent = string//firefox/chrome的写法
    },
    html(node,string){
      if(arguments.length ===2){
        node.innerHTML = string
      }else if(arguments.length === 1){
        node.innerHTML = string
      }
    },
      style(node,name, value){
        if(arguments.length === 3){
          //dom.style(div,'color','red')
          node.style[name] = value
        }else if(arguments.length === 2){
          if(typeof name === 'string'){
            //dom.style(div,'color')
            return node.style[name]
          }else if(name instanceof Object){
            //dom.style(div,{color:'red'})
            const object = name
            for(let key in object){
              node.style[key] = object[key] 
          }
        }
      }
    },
    class:{
      add(node,className){
        node.classList.add(className)
      },
      remove(node,className){
        node.classList.remove(className)
      },
      has(node,className){
        return node.classList.contains(className)
      }
    },
    on(node,eventName,fn){
      node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
      node.removeEventListener(eventName,fn)
    },
    find(selector, scope){
      return (scope ||document).querySelectorAll(selector)
    },
    parent(node){
      return node.parentNode
    },
    children(node){
      return node.children
    },
    siblings(node){
      return Array.from(node.parentNode.children)
      .filter(n => n !==node)
    },
    next(node){
      let x = node.nextSibling
      while( x  && x.nodeType ===3){
        x =x.nextSibling
      }
      return x
    },
    previous(node){
      let x = node.previousSibling
      while( x  && x.nodeType ===3){
        x =x.previousSibling
      }
      return x
    },
    each(nodeList,fn){
      for(let i = 0; i <nodeList.length; i++){
        fn.call(null,nodeList[i])
      }
    },
    index(node){
       const list = dom.children(node.parentNode)
       let i
       for(i = 0;i<list.length;i++){
         if(list[i] === node){
           break
         }
       }
       return i
    },
};