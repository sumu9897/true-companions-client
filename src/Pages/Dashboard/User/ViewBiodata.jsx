import React, { useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider';

const ViewBiodata = () => {
  const { user} = useContext(AuthContext);
  return (
    <div>
      User name : {user.displayName}
      <br />
      Email : {user.email}
      <br />
      image
      <img src={user.displayURL} alt="" />
    </div>
  )
}

export default ViewBiodata
