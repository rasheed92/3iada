import React from 'react'
import styled from 'styled-components'
import { Autocomplete, TextInput, Pane, Dialog, Combobox,Label,Textarea,SelectMenu } from 'evergreen-ui'
import Component from "@reactions/component";
import Context from './Context'
import firebase from 'firebase';

let ButtonModal = styled.button`
background-color: #466AB3;
  padding: 10px;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: bold;
  min-width: 150px;
  height: 50px;
  margin-top: 16px
`
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