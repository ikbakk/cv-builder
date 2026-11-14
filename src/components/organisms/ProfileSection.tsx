import { Input } from '../atoms/Input';
import { useResumeStore } from '../../application/store';

export function ProfileSection() {
  const profile = useResumeStore((s) => s.data.profile);
  const updateProfile = useResumeStore((s) => s.updateProfile);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-text-primary">Profile</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input label="Full Name" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} />
        <Input label="Headline" value={profile.headline} onChange={(e) => updateProfile({ headline: e.target.value })} />
        <Input label="Location" value={profile.location} onChange={(e) => updateProfile({ location: e.target.value })} />
        <Input label="Email" type="email" value={profile.email} onChange={(e) => updateProfile({ email: e.target.value })} />
        <Input label="Phone" value={profile.phone} onChange={(e) => updateProfile({ phone: e.target.value })} />
        <Input label="Portfolio URL" value={profile.portfolio} onChange={(e) => updateProfile({ portfolio: e.target.value })} />
        <Input label="GitHub URL" value={profile.github} onChange={(e) => updateProfile({ github: e.target.value })} />
        <Input label="LinkedIn URL" value={profile.linkedin} onChange={(e) => updateProfile({ linkedin: e.target.value })} />
      </div>
    </section>
  );
}
