import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  profilePicture: f({ image: { maxFileSize: "4MB" } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),

  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
      console.log(file.key);
      console.log(metadata);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  // New CSV uploader route using generic file type
  csvUploader: f(["text/csv"]) // Specify the MIME type for CSV files
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("CSV Upload complete for userId:", metadata.userId);
      console.log("CSV file url", `https://utfs.io/f/${file.url}`);
      console.log(file);
      console.log(metadata);
      // You can save this URL to your database or perform other actions
      // Return this URL to be used on the client-side if necessary
      return {
        uploadedBy: metadata.userId,
        fileUrl: `https://utfs.io/f/${file.key}`,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
