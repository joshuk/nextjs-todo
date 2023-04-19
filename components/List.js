import { useRef, useEffect, useState } from 'react'
import { Work_Sans } from 'next/font/google'

import anime from 'animejs'

import ListItem from './ListItem'
import CommentBox from './CommentBox'
import useList from '../hooks/useList'

const font = Work_Sans({ subsets: ['latin'] })

export default function List() {
  const { listItems, lastAction, addToList, removeFromList } = useList()
  const [ isPlaceholderVisible, setIsPlaceholderVisible ] = useState(true)

  const listRef = useRef()
  const placeholderRef = useRef()

  // When the list is changed, run this function
  useEffect(() => {
    // Remove all leftover styles from the animations
    Array.from(listRef.current.children).forEach((item) => {
      item.removeAttribute('style')
    })

    // Then unless we've added something we don't need to go any further
    if (lastAction !== 'add') {
      return
    }

    // Remove the opacity from the placeholder just in case
    placeholderRef.current.style.opacity = null

    // Then find the last item
    const lastItem = listRef.current.querySelector('li:last-child')

    // And make it appear
    anime({
      targets: lastItem,
      opacity: [0, 1],
      translateY: [24, 0],
      height: [listItems.length === 1 ? placeholderRef.current.clientHeight : 0, lastItem.clientHeight],
      duration: 500,
      easing: 'easeInOutQuad'
    })
  }, [listItems])

  // Add to the list
  const addItem = (itemText) => {
    setIsPlaceholderVisible(false)
    addToList(itemText)
  }

  // Remove from list
  const removeItem = (item) => {
    // Find the item
    const itemIndex = listItems.indexOf(item)
    const listItem = listRef.current.children[itemIndex]

    // If it's the only item in the list, show the placeholder
    if (listItems.length === 1) {
      placeholderRef.current.style.opacity = '1'
    }

    // Animate it out
    const animation = anime({
      targets: listItem,
      opacity: [1, 0],
      height: [listItem.clientHeight, listItems.length === 1 ? placeholderRef.current.clientHeight : 0],
      duration: 500,
      easing: 'easeInOutQuad'
    })

    animation.finished.then(() => {
      removeFromList(item)

      if (listItems.length === 1) {
        setIsPlaceholderVisible(true)
      }
    })
  }

  return (
    <div className={`${font.className} max-w-4xl mx-auto`}>
      <h1 className="mb-4 text-4xl text-red font-semibold italic">my really cool todo list ✨</h1>

      <div className="relative">
        <ul ref={listRef}>
          {listItems.map((item, index) => {
            return <ListItem key={index} item={item} removeItem={removeItem} />
          })}
        </ul>

        <p ref={placeholderRef} className={`${isPlaceholderVisible ? '' : 'absolute top-0 pointer-events-none opacity-0'} pb-1 text-xl transition-opacity duration-500`}>no plans 😔</p>
      </div>

      <CommentBox addItem={addItem} />
    </div>
  )
}