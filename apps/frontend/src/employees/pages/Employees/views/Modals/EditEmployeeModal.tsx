import { memo, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notifications } from '@mantine/notifications'

import { Modal, Title } from '@mantine/core'

import EmployeeForm from '@fe/employees/components/EmployeeForm'

import { useEditEmployeeMutation } from '@fe/employees/hooks/mutations/useEditEmployeeMutation'

import {
  CreateEmployeeInput,
  createEmployeeInputSchema,
  EmployeeOutput,
  ErrorOutput,
} from '@ed-demo/dto'

type EditEmployeeModalProps = {
  employee: EmployeeOutput
  onClose: () => void
}

const EditEmployeeModal = (props: EditEmployeeModalProps) => {
  const { employee, onClose } = props

  const { mutate: editEmployee, isPending } = useEditEmployeeMutation()

  const formMethods = useForm<CreateEmployeeInput>({
    mode: 'onTouched',
    resolver: zodResolver(createEmployeeInputSchema),
    defaultValues: {
      staffId: employee.staffId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      basicSalary: employee.basicSalary,
      joinedAt: employee.joinedAt,
      allowances: employee.allowances,
    },
  })

  const { setError } = formMethods

  const submitHandler = useCallback(
    (values: CreateEmployeeInput) => {
      editEmployee(
        {
          id: employee.id,
          dto: values,
        },
        {
          onSuccess: () => {
            onClose()

            notifications.show({
              message: 'Employee updated successfully',
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
        },
      )
    },
    [editEmployee, employee.id, onClose, setError],
  )

  return (
    <Modal
      opened
      onClose={onClose}
      title={<Title order={3}>Edit Employee</Title>}
      size="lg"
    >
      <FormProvider {...formMethods}>
        <EmployeeForm isLoading={isPending} onSubmit={submitHandler} isEdit />
      </FormProvider>
    </Modal>
  )
}

export default memo(EditEmployeeModal)
