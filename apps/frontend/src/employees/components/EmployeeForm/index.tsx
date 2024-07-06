import { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import {
  Button,
  Divider,
  Group,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { TbChevronRight } from 'react-icons/tb'

import AllowancesInput from './AllowancesInput'

import { useCurrentOrg } from '@fe/organizations/hooks/useCurrentOrg'

import { CreateEmployeeInput } from '@ed-demo/dto'

interface IEmployeeFormProps {
  isLoading?: boolean
  isEdit?: boolean
  onSubmit: (data: CreateEmployeeInput) => void
}

const EmployeeForm: React.FC<IEmployeeFormProps> = props => {
  const { isLoading, isEdit, onSubmit } = props

  const org = useCurrentOrg()

  const formMethods = useFormContext<CreateEmployeeInput>()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = formMethods

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack>
        <TextInput
          {...register('staffId')}
          placeholder="Staff ID..."
          label="Staff ID"
          error={errors.staffId?.message}
          disabled={isLoading}
          required
        />

        <Group>
          <TextInput
            {...register('firstName')}
            placeholder="First name..."
            label="First name"
            error={errors.firstName?.message}
            flex={1}
            disabled={isLoading}
            required
          />

          <TextInput
            {...register('lastName')}
            placeholder="Last name..."
            label="Last name"
            error={errors.lastName?.message}
            flex={1}
            disabled={isLoading}
            required
          />
        </Group>

        <Controller
          control={control}
          name="joinedAt"
          render={({ field: { value }, fieldState: { error } }) => (
            <DateInput
              label="Joining date"
              placeholder="Set date..."
              error={error?.message}
              maxDate={new Date()}
              value={value ? new Date(value) : null}
              required
              disabled={isLoading}
              onChange={newValue => {
                if (newValue)
                  setValue('joinedAt', newValue.toISOString(), {
                    shouldValidate: true,
                    shouldTouch: true,
                    shouldDirty: true,
                  })
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="basicSalary"
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <NumberInput
              {...field}
              placeholder="Basic salary..."
              label="Basic salary"
              error={error?.message}
              flex={1}
              decimalScale={2}
              prefix={org?.currency.symbol}
              thousandSeparator=","
              required
              disabled={isLoading}
              onChange={value =>
                setValue('basicSalary', value as number, {
                  shouldValidate: true,
                  shouldTouch: true,
                  shouldDirty: true,
                })
              }
            />
          )}
        />

        <AllowancesInput currencySymbol={org?.currency.symbol} />

        <Divider />

        <Button
          disabled={isLoading}
          type="submit"
          rightSection={<TbChevronRight />}
          loading={isLoading}
        >
          {isEdit ? 'Edit' : 'Add'} Employee
        </Button>
      </Stack>
    </form>
  )
}

export default memo(EmployeeForm)
