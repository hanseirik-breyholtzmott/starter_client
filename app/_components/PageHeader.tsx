import { Button } from "@/components/ui/button";

export default function PageHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Investeringsmuligheter</h1>
      <Button variant="outline">Se alle emisjoner</Button>
    </div>
  );
}
