import './Suggestions.css';

const Suggestions = ({suggestionRef, isVisible, cursor, setCursor, filteredList, addTag}) => {

  const addTagToItemList = (tag, index) =>{
    addTag(tag)
    setCursor(index)
  }

  return (
    <div data-testid={'suggestions'}>
      {
        isVisible &&
        <div className={`${filteredList.length <= 10 && 'limit'} suggested-list`}>
          <ul ref={suggestionRef}>
            {filteredList.map((tag, index) => {
              return <li key={index} className={`${cursor === index && 'active'} name`} onClick={()=> addTagToItemList(tag, index)}>{tag}</li>
            })}
            {
              filteredList.length === 0 && <li>no result</li>
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Suggestions;
