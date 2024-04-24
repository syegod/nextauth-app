import { auth, signOut } from "@/auth"  

const SettingsPage = async () => {
  const session = await auth();


  return (
    <div>
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <button type="submit" className="m-5 bg-black hover:opacity-80 transition px-2 py-1 text-white">Sign Out</button>
      </form>
        {JSON.stringify(session)}
    </div>
  )
}

export default SettingsPage