interface Props {
    profiles: any[]
}

export default function ProfileList({ profiles }: Props) {
    return (
        <div>
            <h2>Profiles</h2>
            <ul>
                {profiles.map(p => (
                    <li key={p.id}>
                        <div>{p.username}</div>
                        <div>{p.email}</div>
                        <div>{p.profileType.name}</div>

                        {p.photo && (
                            <img
                                src={`http://localhost:3000/uploads/${p.photo}`}
                                alt="profile"
                                width={120}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
