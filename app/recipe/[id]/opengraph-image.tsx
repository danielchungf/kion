import { ImageResponse } from "next/og";
import { getRecipeById } from "@/lib/recipes";
import { readFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(params.id);

  if (!recipe) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 48,
          color: "#262626",
        }}
      >
        Recipe not found
      </div>,
      size
    );
  }

  const fontData = await readFile(
    path.join(process.cwd(), "fonts/YoungSerif-Medium.otf")
  );

  const images = recipe.frontmatter.ingredientImages || [];
  const imageDataUrls = await Promise.all(
    images.map(async (src) => {
      const filePath = path.join(process.cwd(), "public", src);
      const buffer = await readFile(filePath);
      const pngBuffer = await sharp(buffer).png().toBuffer();
      return `data:image/png;base64,${pngBuffer.toString("base64")}`;
    })
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontFamily: "YoungSerif",
            color: "#262626",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          {recipe.frontmatter.title}
        </div>
        {imageDataUrls.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageDataUrls.map((src, i) => (
              <img
                key={i}
                src={src}
                width={120}
                height={120}
                style={{
                  objectFit: "contain",
                  marginLeft: i === 0 ? 0 : -30,
                }}
              />
            ))}
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "YoungSerif",
          data: fontData,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
