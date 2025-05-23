import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

interface Recipe {
  slug: string;
  title: string;
  image: string;
}

interface Props {
  recipes: Recipe[];
}

export default function HomePage({ recipes }: Props) {
  return (
    <main className="homepage">
      <div className="homepage__content">
        
        <SignedOut>
          <h1 className="homepage__title">Welcome to Fresh Recipes</h1>
          <p className="homepage__subtitle">Please sign in or sign up to view our delicious recipes!</p>
          <div className="auth-grid">
            <div className="auth-card">
              <div className="auth-card__icon-wrapper">
                <Image
                  src="/images/signin-icon.png"
                  alt="Sign In"
                  width={48}
                  height={48}
                  className="auth-card__icon"
                />
              </div>
              <div className="auth-card__info">
                <h2 className="auth-card__title">Sign In</h2>
                <SignInButton mode="modal">
                  <button className="auth-card__button">Sign In</button>
                </SignInButton>
              </div>
            </div>
            <div className="auth-card">
              <div className="auth-card__icon-wrapper">
                <Image
                  src="/images/signup-icon.png"
                  alt="Sign Up"
                  width={48}
                  height={48}
                  className="auth-card__icon"
                />
              </div>
              <div className="auth-card__info">
                <h2 className="auth-card__title">Sign Up</h2>
                <SignUpButton mode="modal">
                  <button className="auth-card__button">Sign Up</button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </SignedOut>

        
        <SignedIn>
          <div className="header">
            <h1 className="homepage__title">Fresh Recipes</h1>
            <div className="user-profile">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "auth-card__user-button",
                  },
                }}
              />
              
            </div>
          </div>
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className="recipe-card">
                <div className="recipe-card__image-wrapper">
                  <Image
                    src={`/images/${recipe.image}`}
                    alt={recipe.title}
                    fill
                    className="recipe-card__image"
                  />
                </div>
                <div className="recipe-card__info">
                  <h2 className="recipe-card__title">{recipe.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </SignedIn>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes = JSON.parse(jsonData);
  return {
    props: {
      recipes,
    },
  };
}