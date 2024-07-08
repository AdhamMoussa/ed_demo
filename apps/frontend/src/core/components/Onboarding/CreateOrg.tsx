import { memo } from 'react'
import { notifications } from '@mantine/notifications'

import { Card, Center, Title } from '@mantine/core'

import OrganizationForm from '../OrganizationForm'

import { useCreateOrganizationMutation } from '@fe/core/hooks/mutations/useCreateOrganizationMutation'

import { CreateOrgInput } from '@ed-demo/dto'

const CreateOrg = () => {
  const { mutate: createOrg, isPending } = useCreateOrganizationMutation()

  const submitHandler = (dto: CreateOrgInput) => {
    createOrg(dto, {
      onSuccess: () => {
        notifications.show({
          message: 'Organization created successfully',
          color: 'green',
        })
      },
    })
  }

  return (
    <Center mih="100vh">
      <Card withBorder>
        <Title order={3} mb="lg">
          Create Your Organization
        </Title>

        <OrganizationForm onSubmit={submitHandler} isLoading={isPending} />
      </Card>
    </Center>
  )
}

export default memo(CreateOrg)
