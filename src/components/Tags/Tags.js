import {MdClose} from "react-icons/md";
import './Tags.css'

const Tags = ({tags, removeFromTagList}) => {

  return (
    <>
      {
        tags.map((tag, index) =>
          <div className={'tag'}>
            <span>{tag}</span>
            <span className={'tag-icon'} onClick={() => removeFromTagList(index)}><MdClose/></span>
          </div>
        )
      }
    </>
  )
}

export default Tags
