import Avatar from '../../Avatar/Avatar'
import './UserEntry.css'

interface UserEntryProps {
  onClick: () => void
  isExpanded: boolean
  username: string
  photoURL: string
}

const UserEntry = ({
  onClick,
  isExpanded,
  username,
  photoURL,
}: UserEntryProps) => {
  return (
    <div className="user-entry">
      <Avatar imagePath={photoURL} />
      {isExpanded && (
        <div className="user-entry-expanded">
          <div>{username}</div>
          <button className="start-chat-button" onClick={onClick}>
            Start chat
          </button>
        </div>
      )}
    </div>
  )
}

export default UserEntry
