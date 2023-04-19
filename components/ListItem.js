export default function ListItem({ item, removeItem }) {
  return (
    <li className="block">
      <span className="relative inline-block pl-5 mb-1 text-xl before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:block before:w-2 before:h-2 before:mt-px before:rounded-full before:bg-blue">
        {item.text}
        
        <button className="ml-3 text-base" onClick={() => { removeItem(item) }}>❌</button>
      </span>
    </li>
  )
}