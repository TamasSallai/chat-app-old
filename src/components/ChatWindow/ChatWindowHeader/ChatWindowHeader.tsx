import { useMemo } from 'react'
import { useUserContext } from '../../../context/auth'
import { useChatContext } from '../../../context/chat'
import Avatar from '../../Avatar/Avatar'
import './ChatWindowHeader.css'

const ChatWindowHeader = () => {
  const [currentUser] = useUserContext()
  const [{ currentChat }] = useChatContext()

  const chatUserMemo = useMemo(() => {
    const { members } = currentChat!
    return Object.values(members).find((member) => {
      return member.id !== currentUser.uid && member
    })
  }, [currentChat, currentUser.uid])

  return (
    <div className="chat-window-header">
      <Avatar imagePath={chatUserMemo!.photoURL} />
      <h3>{chatUserMemo!.username}</h3>
    </div>
  )
}

export default ChatWindowHeader
