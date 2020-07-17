import React from "react"

class Child extends React.Component{
    render(){
        return (
            <div>
                {
                    React.Children.map(this.props.children, (item)=>{
                        return item
                    })
                }
            </div>
        )
    }
}

export default Child