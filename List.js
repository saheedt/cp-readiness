/**
Assuming here, the react module has been installed via NPM/YARN
*/
import react from 'react'

const List = ({ items }) => {
  return items
     ?
      <ul>
        items.map((item) => <li key={item}>{item}</li>)
      </ul>
     :
      null
}

export default List
