"use client";
import { PollCreateForm } from "./form";
import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider, SignInButton ,useProfile , useSignIn } from "@farcaster/auth-kit";
import { providers } from "ethers";

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: "https://qf-fund-farcaster.vercel.app",
  siweUri: "https://qf-fund-farcaster.vercel.app",
};


function Profile() {
  const profile = useProfile();
  const {
    isAuthenticated,
    profile: { fid, displayName, custody },
  } = profile;

  return (
    <>
      {isAuthenticated ? (
        <div>
          <p>
            Hello, {displayName}! Your FID is {fid}.
          </p>
          <p>
            Your custody address is: <pre>{custody}</pre>
          </p>
          <h1 className="text-lg sm:text-2xl font-bold mb-2">
            Farcaster Polls
          </h1>
          <h2 className="text-md sm:text-xl mx-4">
            Create a new poll with upto 4 options
          </h2>
          <div className="flex flex-wrap items-center justify-around max-w-4xl my-8 sm:w-full bg-white rounded-md shadow-xl h-full border border-gray-100">
            <PollCreateForm />
          </div>
        </div>
      ) : (
        <p>
          Click the "Sign in with Farcaster" button above, then scan the QR code
          to sign in.
        </p>
      )}
    </>
  );
}

export default async function Page() {
  
  return (
    <AuthKitProvider config={config}>

      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
          <SignInButton
            onSuccess={({ fid, username }) =>
              console.log(
                `Hello, ${username}! Your fid is ${fid}.`
              )
            }
          />
           <Profile />
        </main>
      </div >
    </AuthKitProvider>
  );
}
