import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import API from '@/lib/api'

export const useUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const [loading, setLoading] = useState(false)

  const uploadFile = useCallback(
    async (file: File) => {
      setLoading(true)
      try {
        const url = await API.uploadImage(file)

        onUpload(url)
      } catch (errPayload: any) {
        const error = errPayload?.response?.data?.error || 'Something went wrong'
        toast.error(error)
      }
      setLoading(false)
    },
    [onUpload],
  )

  return { loading, uploadFile }
}
