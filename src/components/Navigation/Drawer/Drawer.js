import React from "react";
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
    {path:'/', lable: 'Список', exact:true},
    {path:'/auth', lable:'Aвторизация', exact: false},
    {path:'/quiz-creator', lable:'Создать тест', exact: false}
]

class Drawer extends React.Component {
    renderlinks () {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a 
                    href={link.path}
                    exact={link.exact}
                    activeClassName = {classes.active}
                    > {link.lable}</a>
                </li>
            )
        })
    }
    render(){

        const cls = [classes.Drawer]
        if(!this.props.isOpen) {
            cls.push(classes.close)
        }
        return(
            <React.Fragment>
            <nav className={cls.join(' ')}>
                <ul>
                    {this.renderlinks()}
                </ul>
            </nav>
            {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer