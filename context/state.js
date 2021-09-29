import { createContext, useState } from 'react'
import useUserAccess from '@/lib/useUserAccess'
import userMasterCustomerId from '@/lib/userMasterCustomerId'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, name: null })
  const userAccessData = useUserAccess(user.id)
  const userMasterId = userMasterCustomerId(user.id)
  const [roles, setRoles] = useState([])
  const [grades, setGrades] = useState([])
  const [topics, setTopics] = useState([])
  const [subjects, setSubjects] = useState([])

  return (
    <AppContext.Provider
      value={{
        user,
        userAccessData,
        userMasterId,
        roles,
        grades,
        topics,
        subjects,
        setUser,
        setRoles,
        setGrades,
        setTopics,
        setSubjects,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
