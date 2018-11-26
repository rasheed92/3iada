<ReactModal isOpen={ctx.state.modalState}>
                  <h1>
                    FikraCamps
                  </h1>

                  <TextInput width="80%" height={48}
                    onChange={(event) => { ctx.actions.onChangePatientName(event.target.value) }}
                    value={ctx.state.Patient_name}
                    placeholder="Patient Name"
                    type="text" />
                  <TextInput width="80%" height={48} value={ctx.state.Patient_Age}
                    onChange={(event) => { ctx.actions.onChangePatientAge(event.target.value) }}
                    placeholder="Patient Age" type="number" />

                  <Autocomplete
                    title="Medication Name"
                    onChange={(changedItem) => ctx.actions.onChangeMedicationName(changedItem)}
                    items={ctx.state.drugs}
                  >
                    {(props) => {
                      const { getInputProps, getRef, inputValue } = props
                      return (

                        <TextInput

                          placeholder="Medication Name"
                          value={inputValue}
                          innerRef={getRef}
                          {...getInputProps()}
                        />
                      )



                    }
                    }
                  </Autocomplete>
                  <TextInput width="80%" height={48}
                    onChange={(event) => { ctx.actions.onChangeMedicationDose(event.target.value) }}
                    value={ctx.state.Medication_Dose}
                    placeholder="Medication Dose "
                    type="text" />

                  <Button onClick={() => {

                    firebase.firestore().collection('recipe').add({
                      Patient_name: ctx.state.Patient_name,
                      Medication_Name: ctx.state.Medication_Name,
                      Medication_Dose: ctx.state.Medication_Dose,
                      Patient_Age: ctx.state.Patient_Age,
                      date: Date.toString()
                    })

                    ctx.actions.toggle()
                  }


                  }>Save</Button>
                  <Button onClick={() => {

                    ctx.actions.toggle()
                  }}>Close</Button>

                </ReactModal>