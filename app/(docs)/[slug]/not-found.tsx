import { NotFoundBody } from "@/components/docs/not-found-body";

// A slug without a page: inside the documentation's frame, which the
// layout of (docs) already draws (app/not-found.tsx brings its own frame).
export default function NotFound() {
  return <NotFoundBody />;
}
