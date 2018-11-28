import React from 'react'
import ReactDOM from 'react-dom'

import firebase from 'firebase';

import Context from './Context'

import Header from './Header'
import RecipeList from './RecipeList'
import DrugsList from'./DrugsList';

var config = {
  apiKey: "AIzaSyBM0ZeCdpJ-FMNlmYFV52O-SNd0zPdJzPM",
  authDomain: "iadte2-2b52b.firebaseapp.com",
  databaseURL: "https://iadte2-2b52b.firebaseio.com",
  projectId: "iadte2-2b52b",
  storageBucket: "iadte2-2b52b.appspot.com",
  messagingSenderId: "276041271823"
};
firebase.initializeApp(config);

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      modalState: false,
      Patient_name: '',
      drugs: DrugsList,
      Patient_Age: '',
      Medication_Dose: '',
      Medication_Name: '',
      Gender: '',
      Patient_nots:'',
      recipe: []

    }
    
//here bring data from firebase orderBy date
    firebase.firestore().collection('recipe').orderBy('date','desc').onSnapshot((snapshot) => {
      let recipe = []

      snapshot.forEach((doc) => {
        recipe.push(doc.data())

        this.setState({
          recipe: recipe
        })
      })
    })

  }

  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        actions: {
          //this function use to set  Gender value 
          onChangeGender: (value) => {
            this.setState({
              Gender: value
            })
          },
          //this function use to set  Age value 
          onChangePatientAge: (value) => {
            this.setState({
              Patient_Age: value
            })
          },
           //this function use to set  Medication Name value 
          onChangeMedicationName: (selected) => {
            this.setState({
              Medication_Name: selected
            })
          },
          //this function use to set  Patient name value 
          onChangePatientName: (value) => {
            this.setState({
              Patient_name: value
            })
          },
        }
      }}>
        <Header />
        <RecipeList />
      </Context.Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))