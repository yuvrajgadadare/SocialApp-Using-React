import React from "react";
import './Sidebar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
function Sidebar()
{
    return(
        <>
        <div className="sidebar">
        <div className="sidebarwrapper">
            <ul className="sidebarlist">
                <li className="sidebarlistitem">
                    <RssFeedIcon className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Feed</span>
                </li>
                <li className="sidebarlistitem">
                    <ChatIcon className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Chat</span>
                </li>
                <li className="sidebarlistitem">
                    <BookmarksIcon className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Bookmark</span>
                </li>
                <li className="sidebarlistitem">
                    <FavoriteIcon className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Favorite</span>
                </li>
                <li className="sidebarlistitem">
                    <HelpOutlineIcon className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Question</span>
                </li>
                <li className="sidebarlistitem">
                    <WorkIcon className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Jobs</span>
                </li>
                <li className="sidebarlistitem">
                    <EventIcon className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Events</span>
                    </li>

                
            </ul>
        </div>
        </div>
        </>
    )
}
export default Sidebar;