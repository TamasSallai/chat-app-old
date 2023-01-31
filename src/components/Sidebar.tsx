import SidebarChatEntry from './SidebarChatEntry'
import SidebarUserEntry from './SidebarUserEntry'

const Sidebar = () => {
  return (
    <div>
      {/* Expand button */}
      <button>Expand</button>

      {/* Search */}
      <div>
        <h3>Search</h3>
        <input type="text" placeholder="Find users..." />
        <div>
          <SidebarUserEntry />
          <SidebarUserEntry />
          <SidebarUserEntry />
        </div>
      </div>

      {/* Chats */}
      <div>
        <h3>Chats</h3>
        <div>
          <SidebarChatEntry />
          <SidebarChatEntry />
          <SidebarChatEntry />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
