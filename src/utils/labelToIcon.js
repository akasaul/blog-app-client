import { FaUserEdit } from 'react-icons/fa';

function labelToIcon({label}) {
  switch(label) {
    case 'name': 
      return <FaUserEdit />
  }
  return (
    <div>labelToIcon</div>
  )
}

export default labelToIcon