import { useState } from 'react'
import UserEntry from './UserEntry/UserEntry'
import ChatEntry from './ChatEntry/ChatEntry'
import './Sidebar.css'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)

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
          <h3 className="search-header">
            {isExpanded ? 'Search users' : 'Search'}
          </h3>
          {isExpanded ? (
            <div className="search-input-container">
              <input
                className="search-input"
                type="text"
                placeholder="Find users..."
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
            <UserEntry
              isExpanded={isExpanded}
              username="TamasSallai"
              photoURL="https://firebasestorage.googleapis.com/v0/b/chat-app-e1a49.appspot.com/o/tamas.sallai.hu%40gmail.com?alt=media&token=1f3eac62-d626-4e26-825b-16a63a346ea1"
            />
            <UserEntry
              isExpanded={isExpanded}
              username="TamasSallai"
              photoURL="https://firebasestorage.googleapis.com/v0/b/chat-app-e1a49.appspot.com/o/tamas.sallai.hu%40gmail.com?alt=media&token=1f3eac62-d626-4e26-825b-16a63a346ea1"
            />
            <UserEntry
              isExpanded={isExpanded}
              username="TamasSallai"
              photoURL="https://firebasestorage.googleapis.com/v0/b/chat-app-e1a49.appspot.com/o/tamas.sallai.hu%40gmail.com?alt=media&token=1f3eac62-d626-4e26-825b-16a63a346ea1"
            />
          </div>
        </div>

        {/* Chats */}
        <div>
          <h3>Chats</h3>
          <div>
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
            <ChatEntry />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
