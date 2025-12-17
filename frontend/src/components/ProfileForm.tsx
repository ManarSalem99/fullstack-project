import { useState } from 'react';
import ProfileTypeSelect from './ProfileTypeSelect';
import { createProfile } from '../api/profileApi';

interface Props {
    profileTypes: { id: number; name: string }[];
    onProfileCreated: () => void;
}

export default function ProfileForm({ profileTypes, onProfileCreated }: Props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileTypeId, setProfileTypeId] = useState<number>(0);
    const [photo, setPhoto] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!photo) {
            alert('Photo is required');
            return;
        }

        if (profileTypeId === 0) {
            alert('Please select a profile type');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('profileTypeId', String(profileTypeId));
        formData.append('photo', photo);

        // Debug: check what is in FormData
        console.log('FormData contents:');
        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            await createProfile(formData);
            onProfileCreated();

            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setProfileTypeId(0);
            setPhoto(null);
        } catch (error) {
            console.error('Error creating profile:', error);
            alert('Error creating profile');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />

            <ProfileTypeSelect
                profileTypes={profileTypes}
                value={profileTypeId}
                onChange={setProfileTypeId}
            />

            <input type="file" onChange={e => e.target.files && setPhoto(e.target.files[0])} />

            <button type="submit">Create Profile</button>
        </form>
    );
}
