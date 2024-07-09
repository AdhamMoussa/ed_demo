import React from 'react'
import { NumberFormatter } from '@mantine/core'

interface IFormattedCurrencyProps {
  value: number
  currencySymbol?: string
}

const FormattedCurrency: React.FC<IFormattedCurrencyProps> = props => {
  const { value, currencySymbol } = props

  return (
    <NumberFormatter
      value={value}
      prefix={currencySymbol}
      decimalScale={2}
      thousandSeparator=","
    />
  )
}

export default React.memo(FormattedCurrency)
