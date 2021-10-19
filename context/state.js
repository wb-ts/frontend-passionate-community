import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [roles, setRoles] = useState([])
  const [grades, setGrades] = useState([])
  const [topics, setTopics] = useState([])
  const [subjects, setSubjects] = useState([])

  return (
    <AppContext.Provider
      value={{
        roles,
        grades,
        topics,
        subjects,
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
