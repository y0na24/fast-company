import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from '../components/Pagination'
import api from '../api'
import GroupList from '../components/GroupList'
import SearchStatus from '../components/SearchStatus'
import UsersTable from '../components/UsersTable'
import _ from 'lodash'
import SearchBar from './SearchBar'

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchTerm, setSearchTerm] = useState('')

  const pageSize = 8

  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const onUpdateSearch = (term) => {
    setSearchTerm(term)
  }

  const searchUsers = (items, term) => {
    if (term.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  const handleSearchChange = (event) => {
    const { value } = event.target
    setSearchTerm(value)
  }

  const searchedUsers = searchUsers(users, searchTerm)

  if (searchedUsers) {
    const filteredUsers = selectedProf
      ? searchedUsers.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : searchedUsers
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <>
        <div className="d-flex">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
                selectedItem={selectedProf}
              />
              <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                Очистить
              </button>
            </div>
          )}
          <div className="d-flex flex-column">
            <SearchStatus length={count} />
            <SearchBar
              onUpdateSearch={onUpdateSearch}
              selectedProf={selectedProf}
              clearFilter={clearFilter}
              searchTerm={searchTerm}
              clearSearch={clearSearch}
              handleSearchChange={handleSearchChange}
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
            <div className="d-flex justify-content-center">
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

export default UsersList
