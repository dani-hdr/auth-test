import Protected from "@/components/Protected";
import Welcome from "./_components/Welcome";

export default function Home() {
  return (
    <Protected>
      <Welcome />
    </Protected>
  );
}
