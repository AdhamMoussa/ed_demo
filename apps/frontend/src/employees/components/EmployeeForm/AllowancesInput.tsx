import { memo } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import {
  ActionIcon,
  Button,
  Group,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { TbPlus, TbX } from 'react-icons/tb'

import { CreateEmployeeInput } from '@ed-demo/dto'

type AllowancesInputProps = {
  currencySymbol?: string
}

const AllowancesInput = (props: AllowancesInputProps) => {
  const { currencySymbol } = props

  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateEmployeeInput>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'allowances',
  })

  return (
    <Stack>
      {fields.map((field, index) => (
        <Group align="flex-start" key={field.id}>
          <TextInput
            {...register(`allowances.${index}.name`)}
            placeholder="Allowance name..."
            label={index === 0 ? 'Allowance name' : ''}
            error={errors.allowances?.[index]?.name?.message}
            flex={1}
            required
          />

          <Controller
            control={control}
            name={`allowances.${index}.amount`}
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <NumberInput
                {...field}
                placeholder="Amount..."
                label={index === 0 ? 'Amount' : ''}
                error={error?.message}
                flex={1}
                decimalScale={2}
                prefix={currencySymbol}
                thousandSeparator=","
                inputContainer={children => (
                  <Group wrap="nowrap">
                    {children}

                    <ActionIcon
                      variant="light"
                      onClick={() => {
                        remove(index)
                      }}
                      style={{
                        alignSelf: 'center',
                      }}
                    >
                      <TbX />
                    </ActionIcon>
                  </Group>
                )}
                required
                onChange={value =>
                  setValue(`allowances.${index}.amount`, value as number, {
                    shouldValidate: true,
                    shouldTouch: true,
                    shouldDirty: true,
                  })
                }
              />
            )}
          />
        </Group>
      ))}

      <Button
        size="xs"
        variant="light"
        leftSection={<TbPlus />}
        onClick={() =>
          append({
            name: '',
            amount: 0,
          })
        }
      >
        Add Allowance
      </Button>
    </Stack>
  )
}

export default memo(AllowancesInput)
