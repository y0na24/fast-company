import React from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({ onUpdateSearch, selectedProf, clearFilter }) => {
  const [searchTerm, setSearchTerm] = React.useState('')

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

  const handleSearchChange = (event) => {
    const { value } = event.target
    setSearchTerm(value)
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

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
  clearFilter: PropTypes.func
}

export default SearchBar
