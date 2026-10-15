import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/como-ajudar")({
  beforeLoad: () => {
    throw redirect({ to: "/contato" });
  },
  component: () => null,
});
