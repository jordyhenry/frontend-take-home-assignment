import * as React from 'react'

import insuranceIcon from '../../assets/icons/insurance.svg'
import {
  Title, 
  Container, ContainerHeader, ContainerHeaderTitle, HouseIcon, ContainerHeaderSubtitle,
  InputsContainer, InputGroup, InputLabel,
  SavingCard, CardHeaderContainer, CardFooter, CardHeaderLabel, CardHeaderText,
  ConfirmButton
} from './styles'

import OriginHeader from '../../components/OriginHeader'
import MoneyInput from '../../components/MoneyInput'
import MonthlyDateInput from '../../components/MonthlyDateInput'

import MonthlyDateInputContainer from '../../components/MonthlyDateInputContainer'

import { toCurrency, toNumber } from '../../utils/currencyMask'

type MonthChangeData = {
  elapsedMonths : number,
  currentDate : string
}

const PlaningSavingGoal = () => {
  const [currentAmount, setCurrentAmount] = React.useState(0.00)
  const [monthlyAmount, setMonthlyAmount] = React.useState(0.00)
  const [currentDate, setCurrentDate] = React.useState('')
  const [elapsedMonths, setElapsedMonths] = React.useState(1)
  
  const handleMonthChange = (data: MonthChangeData) => 
  {
    setElapsedMonths(data.elapsedMonths)
    setCurrentDate(data.currentDate)
  }

  const handleCurrencyChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    let value = toNumber(event.target.value)
    setCurrentAmount(value)
  }

  const handleCurrencyKeyUp = (event : React.KeyboardEvent<HTMLInputElement>) => {
    let formattedValue = event.currentTarget.value
    formattedValue = toCurrency(formattedValue)
    event.currentTarget.value = formattedValue
  }

  React.useEffect(() => 
  {
    if(currentAmount <= 0 || elapsedMonths <= 0){
      setMonthlyAmount(0)
      return
    }

    const _monthlyAmount = currentAmount / elapsedMonths
    setMonthlyAmount(_monthlyAmount)
  },[currentAmount, currentDate])


  return (
    <>
      <OriginHeader />

      <Title>Let's plan your <strong>saving goal.</strong></Title>
      
      <Container>

        <ContainerHeader>
          <HouseIcon src={ insuranceIcon } alt="House Icon" />

          <ContainerHeaderTitle>Buy a house</ContainerHeaderTitle>
          <ContainerHeaderSubtitle>Saving goal</ContainerHeaderSubtitle>
        </ContainerHeader>

        <InputsContainer>
          <InputGroup>
            <InputLabel>Total amount</InputLabel>
            <MoneyInput onChange={handleCurrencyChange} onKeyUp={handleCurrencyKeyUp}/>
          </InputGroup>

          <InputGroup>
            <InputLabel>Reach goal by</InputLabel>
            <MonthlyDateInputContainer onChangeMonth={handleMonthChange} />
          </InputGroup>
        </InputsContainer>

        <SavingCard>
          <CardHeaderContainer>
            <CardHeaderLabel>Monthly</CardHeaderLabel>
            <CardHeaderText>${ toCurrency(monthlyAmount.toFixed(2)) }</CardHeaderText>
          </CardHeaderContainer>

          <CardFooter>
            You’re planning <strong>{elapsedMonths} monthly deposits</strong> to reach your <strong>${currentAmount}</strong> goal by <strong>{currentDate}.</strong>
          </CardFooter>
        </SavingCard>

        <ConfirmButton>Confirm</ConfirmButton>

      </Container> 
    </>
  )
}

export default PlaningSavingGoal