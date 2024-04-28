import { auth, signOut } from "@/auth"

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="max-w-screen">
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <button type="submit" className="m-5 bg-black hover:opacity-80 transition px-2 py-1 text-white">Sign Out</button>
      </form>
      <pre>{JSON.stringify(session, null, 3)}</pre>
    </div>
  );
};

export default SettingsPage;
