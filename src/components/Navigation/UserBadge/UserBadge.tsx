import Avatar from '../../Avatar/Avatar'
import './UserBadge.css'

interface UserBadgeProps {
  displayName: string
  photoURL: string
  onClick: () => void
}

const UserBadge = ({ photoURL, displayName, onClick }: UserBadgeProps) => {
  return (
    <div className="user-badge">
      <span>{displayName}</span>
      <Avatar imagePath={photoURL} />
    </div>
  )
}

export default UserBadge
