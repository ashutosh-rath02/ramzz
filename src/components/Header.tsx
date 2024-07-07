import { cookies } from 'next/headers'
import AuthButton from './AuthButton'
import { createServerClient } from '../utils/supabase'
import { StarIcon } from './Icons'

export default function Header() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    try {
      createServerClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()
  return (
    <header className="relative z-10 flex items-center justify-between bg-card px-4 py-3">
      <div className="text-lg font-semibold">Ramzz</div>
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://github.com/ashutosh-rath02/ramzz"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <StarIcon className="h-4 w-4" />
          GitHub
        </a>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </header>
  )
}
