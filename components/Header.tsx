import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <Link href="/">Home</Link>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
