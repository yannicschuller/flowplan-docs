import DocsLayout from "./(docs)/layout";
import { NotFoundBody } from "@/components/docs/not-found-body";

// Addresses no route takes: the documentation's frame around the 404. A
// page that does not exist under a route of the frame ([slug]: notFound())
// has its own not-found inside the frame (app/(docs)/[slug]/not-found.tsx) –
// this one there would draw header and sidebar twice. No client component of
// its own here: this file is part of every page, and its client components
// form a chunk group of their own – with exactly the layout's, it is the
// layout's chunk and loads once.
export default function NotFound() {
  return (
    <DocsLayout>
      <NotFoundBody />
    </DocsLayout>
  );
}
