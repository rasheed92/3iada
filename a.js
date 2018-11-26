import React from 'react'
import ReactDOM from 'react-dom'
import { Autocomplete,TextInput  } from 'evergreen-ui'
ReactDOM.render(





    
    <Autocomplete
    title="Fruits"
    onChange={(changedItem) => console.log(changedItem)}
    items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}
  >
    {(props) => {
      const { getInputProps, getRef, inputValue } = props
      return (
        <TextInput
          placeholder="Fruits"
          value={inputValue}
          innerRef={getRef}
          {...getInputProps()}
        />
      )
    }}
  </Autocomplete>,
 
 
 
 
 
 
 
 
 
 
 
  document.getElementById('root')
)