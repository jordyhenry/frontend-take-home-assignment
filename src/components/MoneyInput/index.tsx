import * as React from 'react'
import { MoneyInputContainer, MoneyInputIcon, MoneyInputElement } from './style'

const MoneyInput : React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <MoneyInputContainer>
      <MoneyInputIcon>$</MoneyInputIcon>
      <MoneyInputElement {...props} placeholder='0.00'/>
    </MoneyInputContainer>
  )
}

export default MoneyInput