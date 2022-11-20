import React from "react";

class ModeMenu extends React.Component {
    state = {
        isMenuOpen: false
    };

    toggleMenu = () =>
        this.setState(({isMenuOpen}) => ({isMenuOpen: !isMenuOpen}));

    render() {
        const { isMenuOpen } = this.state;
        return (
        <React.Fragment>
            <div>
                <nav>
                    <a href="#">Cool thing to click</a>
                    <a href="#">An even cooler thing to click</a>
                    <a href="#">Some more stuff to click</a>
                </nav>
            </div>
        </React.Fragment>
        );
    }
}

export default ModeMenu;