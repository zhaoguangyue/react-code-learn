
function render( vNode, container){
    // console.log(nextElement)
    // console.log(parentComponent)
    // vNode.props.children.forEach(item=>{
    //     mount(item, container)
    // })
    
    _renderSubtreeIntoContainer(null, vNode, container)
}


function _renderSubtreeIntoContainer(parentComponent, nextElement, container){
    console.log(nextElement)
    console.log(parentComponent)
    // vNode.props.children.forEach(item=>{
    //     mount(item, container)
    // })
    const prevComponent = container._topLeaveWrapper;
    const prevElement = prevComponent._currentElement.props.child;
    if(shouldUpdateReactComponent(prevElement, nextElement)){
        // 可复用
        const publicInst = prevElement._renderComponent.getPublicInstance();
        // todo
        // ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement, nextContext);
        // _updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);
        return publicInst;
    }else{
        // 需要更新
        _renderNewRootComponent(unmountComponentFromNode, prevComponent, container, false)
        // todo 
        // ReactUpdates.batchedUpdates(unmountComponentFromNode, prevComponent, container, false);
    }
    // ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);
    var component = _renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();
    //
    return component;
}

function _updateRootComponent(){
    ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement, nextContext);
}

function _renderNewRootComponent(){
    ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);
}
/**
 * 是否应该更新
 * 1.如果都为空，返回false
 * 2.如果prevElement的类型是string或number且nextElement的类型为string或number，返回true
 * 3.否则，nextElement的类型是object 判断prevElement, nextElement的type和key是否相同
 */
function shouldUpdateReactComponent(prevElement, nextElement){
    const isPrevEmpty = prevElement===null||prevElement===false
    const isNextEmpty = nextElement===null||nextElement===false
    if(isPrevEmpty||isNextEmpty){
        return isPrevEmpty===isNextEmpty
    }
    const prevType = typeof prevElement 
    const nextType = typeof nextElement 
    if(prevType === 'string'|| prevType === 'number'){
        return nextType === 'string'|| nextType === 'number'
    }else{
        return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key
    }
}

function mount(vNode, container){
    const {vType} = vNode
    if(!vType){
        mountTextNode(vNode, container)
    }else if(vType === 1){
        mountElementNode(vNode, container)
    }else if(vType === 2){
        mountClassComponent(vNode, container)
    }else{
        mountFuncComponent(vNode, container)
    }
}

function mountTextNode(vNode, container){
    var textNode = document.createTextNode(vNode)
    container.appendChild(textNode)
}

const RESERVED_PROPS = ['key','ref','__self','__source','children']


function mountElementNode(vNode, container){
    const {type, props} = vNode
    var dom = document.createElement(type);
    propsSetting(dom, props)
   
    props.children.forEach(item=>{
        mount(item, dom)
    })
    container.appendChild(dom)
}

function mountFuncComponent(vNode, container){
    const {type, props} = vNode
    var funcComponent = type(props);
    mount(funcComponent, container)
    // container.appendChild(funcComponent)
}

function mountClassComponent(vNode, container){
    const {type, props} = vNode
    var classComponent = new type(props)
    var dom = classComponent.render()
    mount(dom, container);
}

// todo 不完善
function propsSetting(dom, props){
    Object.keys(props).forEach(item=>{
        if(!RESERVED_PROPS.includes(item)){
            if(item==='className'){
                dom.setAttribute('class', props[item])
            } else if(item.slice(0,2) === 'on'){
                // dom.setAttribute(item, props[item])
                document.body.addEventListener('click', function(e){
                    console.log(e)
                    console.log(e.target)
                })

            }
            // dom.setAttribute(item, props[item])
        }
    })
}



export default {
    render
}