interface AvatarProps {
  imagePath: string
}

const Avatar = ({ imagePath }: AvatarProps) => {
  return (
    <div className="avatar-image-container">
      <img className="avatar-image" src={imagePath} alt="avatar" />
    </div>
  )
}

export default Avatar
