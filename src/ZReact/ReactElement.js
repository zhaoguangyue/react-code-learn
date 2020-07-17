function createElement(type, props, ...children){
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (let propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }

    let vType;
    if(typeof type === 'string'){
        vType = 1;
    }
    if(typeof type === 'function'){
        vType = type.isReactComponent ? 2: 3
    }
    props.children = children
    return {
        vType,
        type,
        props
    }
}

class Component {
    static isReactComponent = {}
    constructor(props){
        console.log(props)
        console.log(props)
        console.log(props)
        this.props= props;
    }
}

export {
    Component,
    createElement
}