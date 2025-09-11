"use client"

interface RoleSelectorProps {
  selectedRole: string
  onRoleChange: (role: string) => void
  error?: string
}

export function RoleSelector({ selectedRole, onRoleChange, error }: RoleSelectorProps) {
  const roles = [
    {
      value: "mahasiswa",
      label: "Mahasiswa",
      description: "Saya adalah seorang mahasiswa",
      icon: "🎓",
    },
    {
      value: "dosen",
      label: "Dosen",
      description: "Saya adalah seorang dosen/pengajar",
      icon: "👨‍🏫",
    },
  ]

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">Pilih Role Anda</label>
      <div className="grid grid-cols-1 gap-3">
        {roles.map((role) => (
          <label
            key={role.value}
            className={`
              relative flex items-center p-4 border rounded-lg cursor-pointer transition-all
              ${
                selectedRole === role.value
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
              }
              ${error ? "border-destructive" : ""}
            `}
          >
            <input
              type="radio"
              name="role"
              value={role.value}
              checked={selectedRole === role.value}
              onChange={(e) => onRoleChange(e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center space-x-3 w-full">
              <div className="text-2xl">{role.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{role.label}</div>
                <div className="text-sm text-muted-foreground">{role.description}</div>
              </div>
              <div
                className={`
                w-4 h-4 rounded-full border-2 flex items-center justify-center
                ${selectedRole === role.value ? "border-primary bg-primary" : "border-border"}
              `}
              >
                {selectedRole === role.value && <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>}
              </div>
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
