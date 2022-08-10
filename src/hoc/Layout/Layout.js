import React from "react";
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

// const Layout = () => {
//     return(
//         <div>

//         </div>
//     )
// }

// export default Layout

class Layout extends React.Component{
    state = {
        menu: false
    }
    
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }


    
    render(){
        return(
            <div className={classes.Layout}>
                     <Drawer isOpen = {this.state.menu}/>
                    <MenuToggle
                      onToggle = {this.toggleMenuHandler}
                      isOpen = {this.state.menu}
                      onClose= {this.menuCloseHandler}
                    />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout