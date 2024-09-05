"use client"
 

import { useAuthContext } from "@/app/hooks/AuthContext"

//Shadn

type Props = {}

const UserSignInForm = (props: Props) => {
    
    const { user } = useAuthContext();

    
  return (
    <div className="flex w-full">
        hhel
        {user?.firstName}
    </div>
  )
}

export default UserSignInForm