import React from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({
  onUpdateSearch,
  selectedProf,
  clearFilter,
  searchTerm,
  clearSearch,
  handleSearchChange
}) => {
  React.useEffect(() => {
    onUpdateSearch(searchTerm)
    if (searchTerm.length > 0) {
      clearFilter()
    }
  }, [searchTerm])

  React.useEffect(() => {
    if (selectedProf) {
      clearSearch()
    }
  }, [selectedProf])

  return (
    <input
      type="text"
      className="form-control"
      id="searchInput"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
    ></input>
  )
}

SearchBar.propTypes = {
  onUpdateSearch: PropTypes.func,
  selectedProf: PropTypes.object,
  clearFilter: PropTypes.func,
  searchTerm: PropTypes.string,
  clearSearch: PropTypes.func,
  handleSearchChange: PropTypes.func
}

export default SearchBar
