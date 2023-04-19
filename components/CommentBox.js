import { useRef } from 'react'

export default function CommentBox({ addItem }) {
  const commentInput = useRef()

  const postComment = () => {
    const inputValue = commentInput.current.value

    if (inputValue === '') {
      return
    }

    try {
      addItem(inputValue)

      commentInput.current.value = ''
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div className="relative mt-12 z-10">
      <textarea ref={commentInput} className="block w-full max-w-sm px-4 py-3 bg-cream text-xl" placeholder="insert exciting stuff"></textarea>
      <button onClick={postComment} className="mt-2 px-4 py-2 text-xl bg-blue text-creamLight">post</button>
    </div>
  )
}