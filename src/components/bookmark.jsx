
const BookMark = ({status, ...rest}) => {
  const createClasses = () => {
    let classes = 'bi '
    return classes += status ? 'bi-bookmark-heart-fill' : 'bi-bookmark'
  }
  return (
    <i className={createClasses()} onClick={() => rest.onToggle(rest._id)}></i>
  )
}

export default BookMark
