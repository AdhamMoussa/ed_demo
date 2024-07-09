import { memo, useCallback } from 'react'
import { notifications } from '@mantine/notifications'

import { Button, Flex, Group, Modal, Text, Title } from '@mantine/core'
import { TbChevronRight } from 'react-icons/tb'

import { useArchiveEmployeeMutation } from '@fe/employees/hooks/mutations/useArchiveEmployeeMutation'

import { EmployeeOutput } from '@ed-demo/dto'

type ArchiveEmployeeModalProps = {
  employee: EmployeeOutput
  onClose: () => void
}

const ArchiveEmployeeModal = (props: ArchiveEmployeeModalProps) => {
  const { employee, onClose } = props

  const { mutate: archiveEmployee, isPending } = useArchiveEmployeeMutation()

  const submitHandler = useCallback(() => {
    archiveEmployee(
      {
        id: employee.id,
      },
      {
        onSuccess: () => {
          onClose()

          notifications.show({
            message: 'Employee archived successfully',
            color: 'green',
          })
        },
      },
    )
  }, [archiveEmployee, employee.id, onClose])

  return (
    <Modal
      opened
      onClose={onClose}
      title={<Title order={3}>Archive Employee</Title>}
      size="lg"
    >
      <Text>
        You're about to archive the employee:{' '}
        <strong>{employee.firstName}</strong>. Are you sure you want to proceed?
      </Text>
      <Flex justify="flex-end">
        <Group>
          <Button
            size="sm"
            variant="outline"
            color="dark"
            loading={isPending}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            size="sm"
            rightSection={<TbChevronRight />}
            loading={isPending}
            onClick={submitHandler}
            color="yellow"
          >
            Archive
          </Button>
        </Group>
      </Flex>
    </Modal>
  )
}

export default memo(ArchiveEmployeeModal)
