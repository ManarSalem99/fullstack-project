import { useEffect, useState } from 'react'
import ProfileForm from './components/ProfileForm'
import ProfileList from './components/ProfileList'
import { getProfiles, getProfileTypes } from './api/profileApi'

function App() {
    const [profiles, setProfiles] = useState<any[]>([])
    const [profileTypes, setProfileTypes] = useState<any[]>([])

    const loadProfiles = async () => {
        const res = await getProfiles()
        setProfiles(res.data)
    }

    const loadProfileTypes = async () => {
        const res = await getProfileTypes()
        setProfileTypes(res.data)
    }

    useEffect(() => {
        loadProfiles()
        loadProfileTypes()
    }, [])

    return (
        <div>
            <h1>Profile App</h1>
            <ProfileForm
                profileTypes={profileTypes}
                onProfileCreated={loadProfiles}
            />
            <ProfileList profiles={profiles} />
        </div>
    )
}

export default App
