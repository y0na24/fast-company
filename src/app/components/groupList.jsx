import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          className={
            'list-group-item' + (items[item][contentProperty] === selectedItem ? ' active' : '')
          }
          onClick={() => onItemSelect(items[item][contentProperty])}
          role="button"
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  )
}
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.string
}

export default GroupList
