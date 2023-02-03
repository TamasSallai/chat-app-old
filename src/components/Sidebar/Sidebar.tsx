import { useState } from 'react'
import { useAuthContext } from '../../context/auth'
import { useChatContext } from '../../context/chat'
import { UserDocument } from '../../types'
import { createChat, getUsers } from '../../firebase'
import UserEntry from './UserEntry/UserEntry'
import ChatEntry from './ChatEntry/ChatEntry'
import './Sidebar.css'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [users, setUsers] = useState<UserDocument[]>([])
  const [currentUser] = useAuthContext()
  const [data] = useChatContext()

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (e.code === 'Enter' && currentUser) {
        const firebaseUsers = await getUsers(currentUser.uid, searchInput)
        setUsers(firebaseUsers)
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }

  const handleCreateChat = async (userDoc: UserDocument) => {
    await createChat(currentUser!, userDoc)
    setSearchInput('')
    setUsers([])
  }

  return (
    <div className="sidebar-outer" data-expanded={isExpanded}>
      {/* Expand button */}
      <button
        className="expand-button"
        data-expanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
        </svg>
      </button>

      {/* Scrollable section */}
      <div className="sidebar-inner">
        {/* Search */}
        <div className="search-section">
          <h3 className="sidebar-header">
            {isExpanded ? 'Search users' : 'Search'}
          </h3>
          {isExpanded ? (
            <div className="search-input-container">
              <input
                className="search-input"
                type="text"
                placeholder="Find users..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
          ) : (
            <button
              className="search-button"
              onClick={() => setIsExpanded(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
              </svg>
            </button>
          )}

          <div>
            {users.map((user) => (
              <UserEntry
                key={user.id}
                {...user}
                onClick={() => handleCreateChat(user)}
                isExpanded={isExpanded}
              />
            ))}
          </div>
        </div>

        {/* Chats */}
        <div className="chats-section">
          <h3 className="sidebar-header">Chats</h3>
          <div>
            {Object.values(data.chatList).map((chat) => (
              <ChatEntry key={chat.id} chat={chat} isExpanded={isExpanded} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
