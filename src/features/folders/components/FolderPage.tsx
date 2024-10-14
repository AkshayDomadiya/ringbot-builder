import { Seo } from '@/components/Seo'
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader'
import { useToast } from '@/hooks/useToast'
import { useTranslate } from '@tolgee/react'
import { Stack, Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { TypebotDndProvider } from '../TypebotDndProvider'
import { FolderContent } from './FolderContent'
import { trpc } from '@/lib/trpc'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'

export const FolderPage = () => {
  const { t } = useTranslate()
  const router = useRouter()
  const { workspace } = useWorkspace()

  const { showToast } = useToast()

  const { data: { folder } = {} } = trpc.folders.getFolder.useQuery(
    {
      folderId: router.query.id as string,
      workspaceId: workspace?.id as string,
    },
    {
      enabled: !!workspace && !!router.query.id,
      retry: 0,
      onError: (error) => {
<<<<<<< HEAD
        if (error.data?.httpStatus === 404) router.replace('/ringbots')
=======
        if (error.data?.httpStatus === 404) router.replace('/typebots')
>>>>>>> 6fed9a126110455c69ac6362b0db87f231f1f22b
        showToast({
          title: 'Folder not found',
        })
      },
    }
  )

  return (
    <Stack minH="100vh">
      <Seo title={t('dashboard.title')} />
      <DashboardHeader />
      <TypebotDndProvider>
        {!folder ? (
          <Flex flex="1">
            <Spinner mx="auto" />
          </Flex>
        ) : (
          <FolderContent folder={folder} />
        )}
      </TypebotDndProvider>
    </Stack>
  )
}
