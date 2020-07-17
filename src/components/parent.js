import React from "react"

var ParentContext = React.createContext('light')
class Parent extends React.Component{
    render(){
        return (
            <ParentContext.Provider value="dark">
                {
                    this.props.children
                }
            </ParentContext.Provider>
        )
    }
}

export default Parent