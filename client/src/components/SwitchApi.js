import React from "react";
import Switch from "react-switch";
import Container from "react-bootstrap/Container";
class SwitchApi extends React.Component {
    state = {checked: (this.props.apiMode==='NYTimes' ? false : true)};

    handleChange = () => {
        console.log('switch-changed');
        this.setState({checked: !this.state.checked});
        this.props.onSwitch();
    }

    render() {
        console.log(this.state.checked);
        return(
            <Container className={'switch-container right-margin'} fluid={'false'}>
                <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    onColor="#3DACFF"
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                />
            </Container>


        );
    }
}

export default SwitchApi;