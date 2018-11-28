import React from 'react'
import styled from 'styled-components'
import jsPDF from 'jspdf';
import { Heading, Table, Button, TextInput, Pane, Dialog, Combobox, SelectMenu } from 'evergreen-ui'
import Component from "@reactions/component";
import Context from './Context'
import Base64img from './Base64img'
import firebase from 'firebase';
let Container = styled.main`
background-color: #ffff;
min-height: 500px;
padding: 10px 10%;

`
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
let AddBox = styled.div`
padding: 0px 32%;
margin-top: 18px;
margin-bottom: 30px;
display: flex;
justify-content: center;
align-items: center;
background-color: #fff;

`
class RecipeList extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <Context.Consumer>
                {(ctx) => {
                    return <div>

                        <AddBox>

                            <Component
                                initialState={{ isShown: false, isLoading: false }}
                                didUpdate={({ state, setState }) => {
                                    if (state.isLoading === true) {
                                        window.setTimeout(() => {
                                            setState({
                                                isShown: false
                                            })
                                        }, 1000)
                                    }
                                }}
                            >
                                {({ state, setState }) => (
                                    <Pane>

                                        <Dialog
                                            isShown={state.isShown}
                                            title="Patient Information"

                                            onCloseComplete={() => setState({ isShown: false, isLoading: false })}
                                            isConfirmLoading={state.isLoading}
                                            onConfirm={() => {


                                                //here convert the date to human readable
                                                var today = new Date();
                                                var dd = today.getDate();
                                                var mm = today.getMonth() + 1; //January is 0!

                                                var yyyy = today.getFullYear();
                                                if (dd < 10) {
                                                    dd = '0' + dd;
                                                }
                                                if (mm < 10) {
                                                    mm = '0' + mm;
                                                }
                                                var today = dd + '/' + mm + '/' + yyyy;

                                                //here add a new recipe
                                                firebase.firestore().collection('recipe').add({
                                                    Patient_name: ctx.state.Patient_name,
                                                    Medication_Name: ctx.state.Medication_Name,

                                                    Patient_Age: ctx.state.Patient_Age,
                                                    Gender: ctx.state.Gender,

                                                    date: today

                                                })

                                                setState({ isLoading: true })
                                            }}

                                            confirmLabel={state.isLoading ? 'Loading...' : 'Confirm'}>

                                            <TextInput width="90%" height={48} margin={10}
                                                onChange={(event) => { ctx.actions.onChangePatientName(event.target.value) }}
                                                value={ctx.state.Patient_name}
                                                placeholder="Patient Name"
                                                type="text" />
                                            <TextInput width="90%" height={48} margin={10} value={ctx.state.Patient_Age}
                                                onChange={(event) => { ctx.actions.onChangePatientAge(event.target.value) }}
                                                placeholder="Patient Age" type="number" />

                                            <Component
                                                initialState={{
                                                    options: ctx.state.drugs
                                                        .map(label => ({ label, value: label })),
                                                    selected: []
                                                }}
                                            >

                                                {({ state, setState }) => (
                                                    <SelectMenu
                                                        isMultiSelect

                                                        title="Select Drugs"
                                                        options={state.options}
                                                        selected={state.selected}

                                                        onSelect={item => {
                                                            const selected = [...state.selected, item.value]
                                                            const selectedItems = selected
                                                            const selectedItemsLength = selectedItems.length
                                                            let selectedNames = ''
                                                            if (selectedItemsLength === 0) {
                                                                selectedNames = ''
                                                            } else if (selectedItemsLength === 1) {
                                                                selectedNames = selectedItems.toString()
                                                            } else if (selectedItemsLength > 1) {
                                                                selectedNames = selectedItemsLength.toString() + ' selected...'
                                                            }


                                                            setState({
                                                                selected,
                                                                selectedNames
                                                            })

                                                            ctx.actions.onChangeMedicationName(selectedItems)
                                                        }
                                                        }

                                                        onDeselect={item => {

                                                            const deselectedItemIndex = state.selected.indexOf(item.value)
                                                            const selectedItems = state.selected.filter(
                                                                (_item, i) => i !== deselectedItemIndex
                                                            )
                                                            const selectedItemsLength = selectedItems.length
                                                            let selectedNames = ''
                                                            if (selectedItemsLength === 0) {
                                                                selectedNames = ''
                                                            } else if (selectedItemsLength === 1) {
                                                                selectedNames = selectedItems.toString()
                                                            } else if (selectedItemsLength > 1) {
                                                                selectedNames = selectedItemsLength.toString() + ' selected...'
                                                            }

                                                            ctx.actions.onChangeMedicationName(selectedItems)

                                                            setState({ selected: selectedItems, selectedNames })


                                                        }

                                                        }

                                                        onChange={(changedItem) => ctx.actions.onChangeMedicationName(changedItem)}

                                                    >
                                                        <Button width="90%" onChange={(changedItem) => ctx.actions.onChangeMedicationName(changedItem)} margin={10} height={48} >{state.selectedNames || 'Select Drugs'}</Button>
                                                    </SelectMenu>
                                                )}
                                            </Component>
                                            <Combobox
                                                openOnFocus
                                                width="90%" height={48} margin={10}
                                                items={['Male', 'Female']}
                                                onChange={selected =>
                                                    ctx.actions.onChangeGender(selected)}
                                                placeholder="Gender"
                                            />


                                        </Dialog>

                                        <ButtonModal onClick={() => setState({ isShown: true })}>Add Patient<img width="35px" height="30px" src={require('./assets/add.svg')} /></ButtonModal>
                                    </Pane>
                                )}
                            </Component>

                        </AddBox>

                        <Container>

                            <Table>
                                <Table.Head>

                                    <Table.TextHeaderCell>
                                        <Heading size={600}> Patient name
  </Heading>

                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                        <Heading size={600}>     Patient Gender
  </Heading>

                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                        <Heading size={600}>
                                            Visit Date
  </Heading>

                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                        <Heading size={600}>
                                            Export Recipe
  </Heading>

                                    </Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body height={500}>
                                    {
                                        ctx.state.recipe.map(profile => (
                                            <Table.Row key={profile.id}  >
                                                <Table.TextCell ><Heading size={500}>{profile.Patient_name}</Heading></Table.TextCell>
                                                <Table.TextCell ><Heading size={500}>{profile.Gender}</Heading></Table.TextCell>
                                                <Table.TextCell isNumber >
                                                    <Heading size={500}>{profile.date}</Heading>
                                                </Table.TextCell>
                                                <Table.TextCell ><Button size={500} appearance="primary" iconAfter="download"
                                                    onClick={() => {

                                                        //this function to export recipe to pdf
                                                        var doc = new jsPDF();
                                                        var imgData = Base64img;
                                                        doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                                                        var name = profile.Patient_name;
                                                        var Medication_Name = profile.Medication_Name;
                                                        var Gender = profile.Gender;
                                                        var Patient_Age = profile.Patient_Age;
                                                        var time = profile.date.toString();
                                                        doc.setFontSize(14);
                                                        doc.setTextColor(0, 0, 0);
                                                        doc.setLineWidth(3.0);
                                                        doc.text(29, 70, name);
                                                        doc.text(105, 70, Patient_Age);
                                                        doc.text(138, 70, Gender);
                                                        doc.text(167, 70, time);
                                                        doc.setFontSize(25);
                                                        doc.setTextColor(4, 73, 148);
                                                        doc.text(15, 100, Medication_Name);
                                                        doc.setFontSize(8);
                                                        doc.setTextColor(0, 0, 0);
                                                        console.log(time)
                                                        doc.save(name + 'recipe.pdf');
                                                    }}
                                                > Download As PDF</Button></Table.TextCell>
                                            </Table.Row>
                                        ))}
                                </Table.Body>
                            </Table>
                        </Container></div>
                }}
            </Context.Consumer>
        )
    }
}

export default RecipeList;