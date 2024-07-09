import { memo, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notifications } from '@mantine/notifications'

import { Modal, Title } from '@mantine/core'

import EmployeeForm from '@fe/employees/components/EmployeeForm'

import { useCreateEmployeeMutation } from '@fe/employees/hooks/mutations/useCreateEmployeeMutation'

import {
  CreateEmployeeInput,
  createEmployeeInputSchema,
  ErrorOutput,
} from '@ed-demo/dto'

type AddEmployeeModalProps = {
  onClose: () => void
}

const AddEmployeeModal = (props: AddEmployeeModalProps) => {
  const { onClose } = props

  const { mutate: createEmployee, isPending } = useCreateEmployeeMutation()

  const formMethods = useForm<CreateEmployeeInput>({
    mode: 'onTouched',
    resolver: zodResolver(createEmployeeInputSchema),
  })

  const { setError } = formMethods

  const submitHandler = useCallback(
    (values: CreateEmployeeInput) => {
      createEmployee(values, {
        onSuccess: () => {
          onClose()

          notifications.show({
            message: 'Employee added successfully',
            color: 'green',
          })
        },
        onError: err => {
          const data = err.json as ErrorOutput

          if (data.fields)
            Object.entries(data.fields).forEach(([key, value]) => {
              if (value)
                setError(key as keyof CreateEmployeeInput, {
                  type: 'manual',
                  message: value[0],
                })
            })
        },
      })
    },
    [createEmployee, onClose, setError],
  )

  return (
    <Modal
      opened
      onClose={onClose}
      title={<Title order={3}>Add Employee</Title>}
      size="lg"
    >
      <FormProvider {...formMethods}>
        <EmployeeForm isLoading={isPending} onSubmit={submitHandler} />
      </FormProvider>
    </Modal>
  )
}

export default memo(AddEmployeeModal)
