import { client } from '@/lib/contentful'

export default async function getTopics(req, res) {

    try{
        const topics = await client.getEntries({
            content_type: 'categoryTopics',
        })

        const subjects = await client.getEntries({
            content_type: 'categorySubject',
        })

        const roles = await client.getEntries({
            content_type: 'categoryRoles',
        })

        const grades = await client.getEntries({
            content_type: 'categoryGrades',
        })

        const result = {
            topics: topics.items,
            subjects: subjects.items,
            roles: roles.items,
            grades: grades.items,
        }
        
        res.json(result)
        
    } catch(err) {
        res.status(500).json({ message: err.message})
       
    }
}