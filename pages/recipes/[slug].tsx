import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";


interface Recipe {
  slug: string;
  title: string;
  image: string;
  ingredients: string[];
  steps: string[];
  sizes?: {
    name: string;
    price: string;
  }[];
}

interface Props {
  recipe: Recipe;
}

export default function RecipePage({ recipe }: Props) {

  
  return (

    
    <div className="recipe-container">
      <Link href="/" className="back-link">
        ← Back to Recipes
      </Link>
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

      <h1 className="recipe-title">{recipe.title}</h1>

      <div className="recipe-image-wrapper">
        <Image
          src={`/images/${recipe.image}`}
          alt={recipe.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="recipe-section">
        <h2 className="section-title">🧂 Ingredients</h2>
        <ul className="recipe-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        {recipe.sizes && recipe.sizes.length > 0 ? (
          <ul className="sizes-list">
            {recipe.sizes.map((size, index) => (
              <li key={index}>
                <span>{size.name}</span>
                <span>{size.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#777", fontStyle: "italic" }}></p>
        )}
      </div>

      <div className="recipe-section">
        <h2 className="section-title">👨‍🍳 Preparation Steps</h2>
        <ol className="recipe-steps">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);

  const recipe = recipes.find((r) => r.slug === params.slug);

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
  };
}
