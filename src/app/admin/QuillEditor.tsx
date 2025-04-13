'use client'

import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import { useEffect, useMemo, useState } from 'react'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface QuillEditorProps {
  value: string
  onChange: (content: string) => void
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="mt-4">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
          ],
        }}
        theme="snow"
        className="bg-white text-black"
      />
    </div>
  )
}