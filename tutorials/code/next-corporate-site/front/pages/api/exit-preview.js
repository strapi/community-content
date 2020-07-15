import { redirect } from "next/dist/next-server/server/api-utils";

export default async function exit(req, res) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();

  // Redirect the user back to a provided redirect path or the index page
  res.writeHead(307, { Location: req.query.redirect || "/" });
  res.end();
}
