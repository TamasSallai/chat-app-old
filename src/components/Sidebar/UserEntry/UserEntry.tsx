import Avatar from '../../Avatar/Avatar'
import './UserEntry.css'

interface UserEntryProps {
  isExpanded: boolean
  username: string
  photoURL: string
}

const UserEntry = ({ isExpanded, username, photoURL }: UserEntryProps) => {
  return (
    <div className="user-entry">
      <Avatar imagePath={photoURL} />
      {isExpanded && (
        <div className="user-entry-expanded">
          <div>{username}</div>
          <button className="start-chat-button">Start chat</button>
        </div>
      )}
    </div>
  )
}

export default UserEntry
