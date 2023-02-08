const BookMark = ({ status, ...rest }) => {
  const createClasses = () => {
    let classes = 'bi '
    return (classes += status ? 'bi-bookmark-heart-fill' : 'bi-bookmark')
  }
  return (
    <button type='button' class='btn btn-outline-secondary btn-sm' onClick={() => rest.onToggle(rest._id)}>
      <i className={createClasses()}></i>
    </button>
  )
}

export default BookMark
