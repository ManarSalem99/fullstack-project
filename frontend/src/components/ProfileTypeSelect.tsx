

interface Props {
    value: number
    onChange: (id: number) => void
    profileTypes?: { id: number; name: string }[] // optional
}

export default function ProfileTypeSelect({ value, onChange, profileTypes = [] }: Props) {
    return (
        <select value={value} onChange={e => onChange(Number(e.target.value))}>
            <option value={0}>Select profile type</option>
            {profileTypes.map(pt => (
                <option key={pt.id} value={pt.id}>
                    {pt.name}
                </option>
            ))}
        </select>
    )
}
