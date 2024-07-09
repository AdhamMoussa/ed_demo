import { memo } from 'react'
import { Skeleton, Table } from '@mantine/core'

const LoadingSkeleton = () => {
  return Array(3)
    .fill(0)
    .map((_i, index) => (
      <Table.Tr key={index}>
        <Table.Td pl="lg">
          <Skeleton w={50} h={16} />
        </Table.Td>

        <Table.Td>
          <Skeleton w={120} h={16} />
        </Table.Td>

        <Table.Td>
          <Skeleton w={100} h={16} />
        </Table.Td>

        <Table.Td>
          <Skeleton w={100} h={16} />
        </Table.Td>

        <Table.Td>
          <Skeleton w={100} h={16} />
        </Table.Td>

        <Table.Td>
          <Skeleton w={100} h={16} />
        </Table.Td>

        <Table.Td>
          <Skeleton w={100} h={16} />
        </Table.Td>

        <Table.Td>
          <Skeleton w={100} h={16} />
        </Table.Td>

        <Table.Td>
          <Skeleton w={100} h={16} />
        </Table.Td>
      </Table.Tr>
    ))
}

export default memo(LoadingSkeleton)
