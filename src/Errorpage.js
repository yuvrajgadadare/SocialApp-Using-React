import React from 'react'
import { useNavigate } from 'react-router-dom';

const Errorpage = () => {
  const navigate = useNavigate();
  return (
    <div>

        <h4>😰404 Error Occured😰</h4>
        <div className="link_containers">
                        <a href="/login" className="smalll">
                           Login Here
                        </a>
                        </div>
    </div>
  )
}

export default Errorpage