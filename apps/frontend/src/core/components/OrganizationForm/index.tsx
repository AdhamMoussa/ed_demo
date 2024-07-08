import { memo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Group, Select, Stack, TextInput } from '@mantine/core'

import { CreateOrgInput, createOrgInputSchema } from '@ed-demo/dto'

type OrganizationFormProps = {
  isLoading?: boolean
  onSubmit: (data: CreateOrgInput) => void
}

const OrganizationForm = (props: OrganizationFormProps) => {
  const { isLoading, onSubmit } = props

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateOrgInput>({
    mode: 'onTouched',
    resolver: zodResolver(createOrgInputSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack>
        <Group align="flex-start">
          <TextInput
            {...register('name', {
              onChange: e => {
                setValue(
                  'slug',
                  e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                )
              },
            })}
            placeholder="Name..."
            label="Name"
            error={errors.name?.message}
            flex={1}
            disabled={isLoading}
            required
          />

          <TextInput
            {...register('slug')}
            placeholder="Slug..."
            label="Slug"
            flex={1}
            disabled={isLoading}
            readOnly
            required
          />
        </Group>

        <Controller
          control={control}
          name="currencyCode"
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <Select
              {...field}
              label="Currency"
              error={error?.message}
              placeholder="Currency..."
              data={[
                {
                  label: 'USD',
                  value: 'usd',
                },
                {
                  label: 'EUR',
                  value: 'eur',
                },
              ]}
              onChange={newValue => {
                if (newValue)
                  setValue('currencyCode', newValue, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  })
              }}
            />
          )}
        />

        <Button type="submit">Create Organization</Button>
      </Stack>
    </form>
  )
}

export default memo(OrganizationForm)
