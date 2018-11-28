import React from 'react'
import styled from 'styled-components'
import Context from './Context'

let Navigation = styled.header`
  background-color: #131212;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10%;
`


class Header extends React.Component {

    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <Context.Consumer>
                {
                    (ctx) => {
                        return (
                            <Navigation>

                                <img width="120px;" src={require('./assets/logo.png')} />

    

                            </Navigation>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}

export default Header;