import { useState } from 'react'

export default function useList() {
  const [listItems, setListItems] = useState([])
  const [lastAction, setLastAction] = useState('')

  const addToList = (itemText) => {
    if (isItemInList(itemText)) {
      throw new Error('Item already in list')
    }

    const newListItem = {
      text: itemText,
      isCrossed: false
    }

    setListItems([...listItems, newListItem])

    setLastAction('add')
  }

  const removeFromList = (item) => {
    const itemIndex = listItems.indexOf(item)

    const newListItems = JSON.parse(JSON.stringify(listItems))

    newListItems.splice(itemIndex, 1)

    setListItems(newListItems)
    setLastAction('remove')
  }

  const isItemInList = (itemText) => {
    const foundItem = listItems.find((item) => item.text === itemText)

    return !!foundItem
  }

  return { listItems, lastAction, addToList, removeFromList }
}