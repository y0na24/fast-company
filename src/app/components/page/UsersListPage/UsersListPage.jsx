import React from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/Pagination'
import api from '../../../api'
import GroupList from '../../common/GroupList'
import SearchStatus from '../../ui/SearchStatus'
import UsersTable from '../../ui/UsersTable'
import _ from 'lodash'
import { useUser } from '../../../hooks/useUsers'

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [professions, setProfessions] = React.useState()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedProf, setSelectedProf] = React.useState()
  const [sortBy, setSortBy] = React.useState({ path: 'name', order: 'asc' })

  const { users } = useUser()

  const pageSize = 8

  const handleDelete = (userId) => {
    // setUsers(users.filter((user) => user._id !== userId))
    console.log(userId)
  }
  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark }
      }
      return user
    })

    console.log(newArray)
  }

  React.useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handleProfessionSelect = (item) => {
    if (searchQuery !== '') setSearchQuery('')
    setSelectedProf(item)
  }

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined)
    setSearchQuery(target.value)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <>
        <div className='d-flex'>
          {professions && (
            <div className='d-flex flex-column flex-shrink-0 p-3'>
              <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
                selectedItem={selectedProf}
              />
              <button className='btn btn-secondary mt-2' onClick={clearFilter}>
                Очистить
              </button>
            </div>
          )}
          <div className='d-flex flex-column'>
            <SearchStatus length={count} />
            <input
              value={searchQuery}
              onChange={handleSearchQuery}
              type='text'
              name='searchQuery'
              placeholder='Search...'
            />
            {count > 0 && (
              <UsersTable
                users={userCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
              />
            )}
            <div className='d-flex justify-content-center'>
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
  return 'loading'
}

export default UsersListPage
