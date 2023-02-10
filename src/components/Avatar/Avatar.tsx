import './Avatar.css'

interface AvatarProps {
  imagePath: string
  onLoad?: () => void
}

const Avatar = ({ imagePath, onLoad }: AvatarProps) => {
  return (
    <div className="avatar-image-container">
      <img
        className="avatar-image"
        src={imagePath}
        alt="avatar"
        onLoad={onLoad}
      />
    </div>
  )
}

export default Avatar
